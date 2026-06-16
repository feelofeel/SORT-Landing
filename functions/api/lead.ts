// Cloudflare Pages Function — POST /api/lead  (spec §8.4, SCRUM-67)
//
// Flow: honeypot → validate → insert Supabase `leads` → Resend email to Dee
//        → optional Telegram ping → JSON { ok }.
//
// Dependency-free on purpose (plain fetch, no SDK) so it stays tiny on Pages.
// Until SCRUM-63 provisions the env vars, the endpoint still returns ok so the
// page's thank-you state works — but reports `persisted:false` so we don't think
// a lead was stored when it wasn't.

interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  LEAD_NOTIFY_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

// TG handles: @[letter][4-31 word chars] = 5-32 chars username.
// Email: standard loose check — the reply will bounce if wrong.
export function validateContact(
  contact: string,
): { valid: true; type: "telegram" | "email" } | { valid: false } {
  if (/^@[A-Za-z]\w{4,31}$/.test(contact)) return { valid: true, type: "telegram" };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return { valid: true, type: "email" };
  return { valid: false };
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const get = (k: string) => (form.get(k) ?? "").toString().trim();

  // Honeypot: real users never fill this hidden field. Pretend success, drop silently.
  if (get("company_url")) return json({ ok: true, persisted: false });

  const name = get("name");
  const cafe = get("cafe");
  const poster = get("poster");
  const contact = get("contact");
  const message = get("message");

  // Only contact is required; name/cafe/poster are helpful but not gated.
  if (!contact) {
    return json({ ok: false, error: "missing_fields" }, 422);
  }

  const contactResult = validateContact(contact);
  if (!contactResult.valid) {
    return json({ ok: false, error: "invalid_contact" }, 422);
  }

  if (
    name.length > 200 ||
    cafe.length > 200 ||
    poster.length > 200 ||
    contact.length > 200 ||
    message.length > 2000
  ) {
    return json({ ok: false, error: "too_long" }, 422);
  }

  const lead = {
    name: name || null,
    cafe: cafe || null,
    poster_subdomain: poster || null,
    contact,
    contact_type: contactResult.type,
    message: message || null,
    utm_source: get("utm_source") || null,
    utm_medium: get("utm_medium") || null,
    utm_campaign: get("utm_campaign") || null,
    referer: request.headers.get("referer"),
    user_agent: request.headers.get("user-agent"),
  };

  // Backend not provisioned yet (SCRUM-63) → accept so the UI flows, flag not-stored.
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ ok: true, persisted: false });
  }

  // 1) Persist (service-role key bypasses RLS).
  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error("supabase insert failed", res.status, await res.text());
      return json({ ok: false, error: "store_failed" }, 502);
    }
  } catch (e) {
    console.error("supabase insert error", e);
    return json({ ok: false, error: "store_failed" }, 502);
  }

  // 2) Email Dee — best-effort: a failed notification must not fail the lead.
  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL || "SORT Leads <onboarding@resend.dev>",
          to: [env.LEAD_NOTIFY_EMAIL],
          subject: `Новий лід: ${cafe || contact}`,
          reply_to: contactResult.type === "email" ? contact : undefined,
          text:
            `Ім'я: ${name || "—"}\n` +
            `Заклад: ${cafe || "—"}\n` +
            `Poster: ${poster || "—"}\n` +
            `Контакт: ${contact} (${contactResult.type})\n` +
            `Повідомлення: ${message || "—"}\n\n` +
            `Звідки: ${lead.utm_source || "—"} / ${lead.referer || "—"}`,
        }),
      });
    } catch (e) {
      console.error("resend error", e);
    }
  }

  // 3) Optional Telegram ping — best-effort.
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    try {
      await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text:
            `🟢 Новий лід SORT\n` +
            `Заклад: ${cafe || "—"}\n` +
            `Ім'я: ${name || "—"}\n` +
            `Poster: ${poster || "—"}\n` +
            `Контакт: ${contact} (${contactResult.type})`,
        }),
      });
    } catch (e) {
      console.error("telegram error", e);
    }
  }

  return json({ ok: true, persisted: true });
};
