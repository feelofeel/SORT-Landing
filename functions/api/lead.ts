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

  if (!name || !cafe || !poster || !contact) {
    return json({ ok: false, error: "missing_fields" }, 422);
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
    name,
    cafe,
    poster_subdomain: poster,
    contact,
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
          subject: `Новий лід: ${cafe}`,
          reply_to: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : undefined,
          text:
            `Ім'я: ${name}\n` +
            `Заклад: ${cafe}\n` +
            `Poster: ${poster}\n` +
            `Контакт: ${contact}\n` +
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
          text: `🟢 Новий лід SORT\nЗаклад: ${cafe}\nІм'я: ${name}\nPoster: ${poster}\nКонтакт: ${contact}`,
        }),
      });
    } catch (e) {
      console.error("telegram error", e);
    }
  }

  return json({ ok: true, persisted: true });
};
