import { describe, it, expect, vi, afterEach } from "vitest";
import {
  validateContact,
  onRequestPost,
  resetRateLimitsForTest,
} from "../functions/api/lead.js";

// ── validateContact ────────────────────────────────────────────────────────────

describe("validateContact", () => {
  it("accepts a Telegram handle", () => {
    expect(validateContact("@ivanka123")).toEqual({ valid: true, type: "telegram" });
  });

  it("accepts a minimal-length TG handle (5 chars)", () => {
    expect(validateContact("@abcde")).toEqual({ valid: true, type: "telegram" });
  });

  it("rejects a too-short TG handle (4 chars)", () => {
    expect(validateContact("@abcd")).toEqual({ valid: false });
  });

  it("accepts an email address", () => {
    expect(validateContact("test@example.com")).toEqual({ valid: true, type: "email" });
  });

  it("rejects plain text with no @ or domain", () => {
    expect(validateContact("plaintext")).toEqual({ valid: false });
  });

  it("rejects empty string", () => {
    expect(validateContact("")).toEqual({ valid: false });
  });
});

// ── onRequestPost ──────────────────────────────────────────────────────────────

function makeRequest(fields: Record<string, string>, headers?: HeadersInit) {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  return new Request("http://localhost/api/lead", { method: "POST", body: form, headers });
}

const emptyEnv = {};
const withEnv = {
  SUPABASE_URL: "https://test.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test-service-key",
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  resetRateLimitsForTest();
});

describe("onRequestPost — validation", () => {
  it("honeypot filled → 200 ok, persisted:false (silent drop)", async () => {
    const res = await onRequestPost({
      request: makeRequest({ company_url: "spam", contact: "@valid_user1" }),
      env: emptyEnv,
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, persisted: false });
  });

  it("missing contact → 422 missing_fields", async () => {
    const res = await onRequestPost({ request: makeRequest({}), env: emptyEnv });
    expect(res.status).toBe(422);
    expect((await res.json()).error).toBe("missing_fields");
  });

  it("invalid contact format → 422 invalid_contact", async () => {
    const res = await onRequestPost({
      request: makeRequest({ contact: "not-valid-at-all" }),
      env: emptyEnv,
    });
    expect(res.status).toBe(422);
    expect((await res.json()).error).toBe("invalid_contact");
  });

  it("valid TG handle, no env → 200 ok, persisted:false", async () => {
    const res = await onRequestPost({
      request: makeRequest({ contact: "@testuser123" }),
      env: emptyEnv,
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, persisted: false });
  });

  it("valid email, no env → 200 ok, persisted:false", async () => {
    const res = await onRequestPost({
      request: makeRequest({ contact: "owner@cafe.ua" }),
      env: emptyEnv,
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, persisted: false });
  });
});

describe("onRequestPost — persistence", () => {
  it("inserts to Supabase and returns persisted:true", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 201 })),
    );
    const res = await onRequestPost({
      request: makeRequest({ contact: "@testuser123", name: "Іванка", cafe: "Кав'ярня" }),
      env: withEnv,
    });
    const body = await res.json();
    expect(body).toMatchObject({ ok: true, persisted: true });
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining("/rest/v1/leads"),
      expect.any(Object),
    );
  });

  it("stores contact_type=telegram for TG handle", async () => {
    let capturedBody: Record<string, unknown> = {};
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(async (url: string, opts: RequestInit) => {
        if (String(url).includes("/rest/v1/leads")) {
          capturedBody = JSON.parse(opts.body as string);
        }
        return new Response(null, { status: 201 });
      }),
    );
    await onRequestPost({
      request: makeRequest({ contact: "@barista_kyiv" }),
      env: withEnv,
    });
    expect(capturedBody.contact_type).toBe("telegram");
  });

  it("stores contact_type=email for email address", async () => {
    let capturedBody: Record<string, unknown> = {};
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(async (url: string, opts: RequestInit) => {
        if (String(url).includes("/rest/v1/leads")) {
          capturedBody = JSON.parse(opts.body as string);
        }
        return new Response(null, { status: 201 });
      }),
    );
    await onRequestPost({
      request: makeRequest({ contact: "owner@cafe.ua" }),
      env: withEnv,
    });
    expect(capturedBody.contact_type).toBe("email");
  });

  it("returns 502 store_failed when Supabase returns error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("db error", { status: 500 })),
    );
    const res = await onRequestPost({
      request: makeRequest({ contact: "@testuser123" }),
      env: withEnv,
    });
    expect(res.status).toBe(502);
    expect((await res.json()).error).toBe("store_failed");
  });
});

describe("onRequestPost - abuse controls and logging", () => {
  it("rate-limits repeated valid submissions before Supabase insert", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 201 })),
    );

    for (let i = 0; i < 5; i += 1) {
      const res = await onRequestPost({
        request: makeRequest(
          { contact: `owner${i}@cafe.ua` },
          { "cf-connecting-ip": "203.0.113.10" },
        ),
        env: withEnv,
      });
      expect(res.status).toBe(200);
    }

    const blocked = await onRequestPost({
      request: makeRequest(
        { contact: "owner5@cafe.ua" },
        { "cf-connecting-ip": "203.0.113.10" },
      ),
      env: withEnv,
    });

    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("retry-after")).toBeTruthy();
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(5);
  });

  it("rate-limits repeated valid submissions for the same contact", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 201 })),
    );

    for (let i = 0; i < 3; i += 1) {
      const res = await onRequestPost({
        request: makeRequest(
          { contact: "repeat@cafe.ua" },
          { "cf-connecting-ip": `203.0.113.${i}` },
        ),
        env: withEnv,
      });
      expect(res.status).toBe(200);
    }

    const blocked = await onRequestPost({
      request: makeRequest(
        { contact: "repeat@cafe.ua" },
        { "cf-connecting-ip": "203.0.113.99" },
      ),
      env: withEnv,
    });

    expect(blocked.status).toBe(429);
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(3);
  });

  it("does not log the Supabase response body on insert failure", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("owner@cafe.ua name=Private Cafe", {
          status: 500,
          statusText: "Internal Server Error",
        }),
      ),
    );

    const res = await onRequestPost({
      request: makeRequest(
        { contact: "owner@cafe.ua", name: "Private Cafe" },
        { "cf-connecting-ip": "203.0.113.20" },
      ),
      env: withEnv,
    });

    expect(res.status).toBe(502);
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain("owner@cafe.ua");
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain("Private Cafe");
  });
});
