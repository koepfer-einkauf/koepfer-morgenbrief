const allowedOrigins = new Set([
  "https://koepfer-einkauf.github.io",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);
const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && allowedOrigins.has(origin) ? origin : "https://koepfer-einkauf.github.io",
  "Access-Control-Allow-Headers": "apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const json = (body: unknown, status: number, origin: string | null) => new Response(JSON.stringify(body), {
  status,
  headers: {...corsHeaders(origin), "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"},
});

const secretKey = () => {
  const explicit = Deno.env.get("SUPABASE_SECRET_KEY");
  if (explicit) return explicit;
  const defaults = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
  return defaults.default;
};

const validDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  const min = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 62));
  const max = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));
  return date >= min && date <= max;
};

const validArticleId = (value: string, action: string) => {
  if (value.length < 1 || value.length > 2000) return false;
  if (action === "editorial_request") {
    return /^request:\/\/(extra|more|less)\/(topic|company|supplier|industry)\/.{1,500}$/.test(value);
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const verifyCaptcha = async (token: string, expectedAction: string) => {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) throw new Error("Missing RECAPTCHA_SECRET_KEY");

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({secret, response: token}),
  });
  if (!response.ok) throw new Error(`reCAPTCHA request failed (${response.status})`);

  const result = await response.json();
  const threshold = Number(Deno.env.get("RECAPTCHA_MIN_SCORE") || "0.5");
  const hostnames = new Set(
    (Deno.env.get("RECAPTCHA_ALLOWED_HOSTNAMES") || "koepfer-einkauf.github.io")
      .split(",")
      .map(value => value.trim())
      .filter(Boolean),
  );
  return result?.success === true
    && Number(result?.score) >= threshold
    && result?.action === expectedAction
    && hostnames.has(String(result?.hostname || ""));
};

Deno.serve(async request => {
  const origin = request.headers.get("Origin");
  if (request.method === "OPTIONS") return new Response(null, {status: 204, headers: corsHeaders(origin)});
  if (request.method !== "POST") return json({error: "Method not allowed"}, 405, origin);
  if (!origin || !allowedOrigins.has(origin)) return json({error: "Origin not allowed"}, 403, origin);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({error: "Invalid JSON"}, 400, origin); }

  const action = String(body.captcha_action || "");
  const token = String(body.captcha_token || "");
  const articleId = String(body.article_id || "");
  const editionDate = String(body.edition_date || "");
  const topic = String(body.topic || "").trim().replace(/\s+/g, " ").slice(0, 200);
  const vote = Number(body.vote);
  const sessionHash = String(body.session_hash || "");

  if (!["feedback_vote", "editorial_request"].includes(action)
      || token.length < 20
      || !validArticleId(articleId, action)
      || !validDate(editionDate)
      || topic.length < 1
      || ![-1, 1].includes(vote)
      || !/^[0-9a-f]{64}$/.test(sessionHash)) {
    return json({error: "Ungültige Eingabe"}, 400, origin);
  }

  let captchaAccepted = false;
  try {
    captchaAccepted = await verifyCaptcha(token, action);
  } catch (error) {
    console.error("KOEPFER reCAPTCHA verification:", error);
    return json({error: "Verifizierung vorübergehend nicht verfügbar"}, 503, origin);
  }
  if (!captchaAccepted) return json({error: "Verifizierung fehlgeschlagen"}, 403, origin);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const key = secretKey();
  if (!supabaseUrl || !key) return json({error: "Server configuration missing"}, 500, origin);

  const result = await fetch(`${supabaseUrl}/rest/v1/article_feedback`, {
    method: "POST",
    headers: {apikey: key, "Content-Type": "application/json", Prefer: "return=minimal"},
    body: JSON.stringify({
      article_id: articleId,
      edition_date: editionDate,
      topic,
      vote,
      session_hash: sessionHash,
    }),
  });
  if (result.status === 409) return json({error: "Bereits gespeichert"}, 409, origin);
  if (!result.ok) return json({error: `Database request failed (${result.status})`}, 502, origin);
  return new Response(null, {status: 204, headers: {...corsHeaders(origin), "Cache-Control": "no-store"}});
});
