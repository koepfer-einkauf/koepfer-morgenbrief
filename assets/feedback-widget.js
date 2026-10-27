(() => {
  "use strict";

  const SUPABASE_URL = "https://zwzgbfyjqmmxzsonpdfj.supabase.co";
  const SUPABASE_KEY = "sb_publishable_x2Nv1tiZg2k8A0nwNC7qhA_K2QwWpAM";
  const RECAPTCHA_ENABLED = true;
  const RECAPTCHA_V3_SITE_KEY = "6LejywEuAAAAADJvN8Xg82xZd28rL9ddX7Jw8TyR";
  const RECAPTCHA_V2_SITE_KEY = "6Lff8wIuAAAAAJjsi6xs73zOQoQ5c2jy6Fu8wLr7";
  const FEEDBACK_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/feedback-submit`;
  const editionDate = document.body.dataset.editionDate;
  const storagePrefix = "koepfer_feedback_v1";
  const encoder = new TextEncoder();

  const hash = async (value) => {
    const bytes = await crypto.subtle.digest("SHA-256", encoder.encode(value));
    return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");
  };

  const captchaStyles = document.createElement("style");
  captchaStyles.textContent = `
    .feedback{flex-wrap:wrap}
    .koepfer-captcha-fallback{width:100%;margin-top:10px;padding:12px;border:1px solid var(--line,#d8d0c2);border-radius:6px;background:#fff;overflow:hidden}
    .koepfer-captcha-fallback[hidden]{display:none}
    .koepfer-captcha-fallback-label{display:block;margin-bottom:8px;color:var(--ink,#17212b);font-size:.76rem;font-weight:800}
    .wish-form .koepfer-captcha-fallback{margin-top:18px}
    .koepfer-captcha-v3{position:fixed;right:0;bottom:0;z-index:9999}
    @media(max-width:360px){.koepfer-captcha-widget{width:362px;transform:scale(.84);transform-origin:left top;margin-bottom:-13px}}
  `;
  document.head.append(captchaStyles);

  let recaptchaLoader;
  const loadRecaptcha = async () => {
    if (window.grecaptcha?.render) return window.grecaptcha;
    if (!recaptchaLoader) {
      recaptchaLoader = new Promise((resolve, reject) => {
        const callbackName = "koepferRecaptchaReady";
        window[callbackName] = () => resolve(window.grecaptcha);
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit&hl=de`;
        script.async = true;
        script.defer = true;
        script.addEventListener("error", () => reject(new Error("CAPTCHA konnte nicht geladen werden")), {once: true});
        document.head.append(script);
      });
    }
    try {
      return await recaptchaLoader;
    } catch (error) {
      recaptchaLoader = undefined;
      throw error;
    }
  };

  let v3WidgetId;
  const v3Token = async (action) => {
    const recaptcha = await loadRecaptcha();
    if (v3WidgetId === undefined) {
      const host = document.createElement("div");
      host.className = "koepfer-captcha-v3";
      host.setAttribute("aria-hidden", "true");
      document.body.append(host);
      v3WidgetId = recaptcha.render(host, {
        sitekey: RECAPTCHA_V3_SITE_KEY,
        size: "invisible",
        badge: "bottomright"
      });
    }
    return recaptcha.execute(v3WidgetId, {action});
  };

  const v2States = new WeakMap();
  const v2Token = async (host) => {
    host.hidden = false;
    const recaptcha = await loadRecaptcha();
    let state = v2States.get(host);
    if (!state) {
      state = {widgetId: undefined, pending: null, resolve: null, reject: null};
      v2States.set(host, state);
    }
    if (state.widgetId === undefined) {
      const widget = host.querySelector(".koepfer-captcha-widget");
      state.widgetId = recaptcha.render(widget, {
        sitekey: RECAPTCHA_V2_SITE_KEY,
        theme: "light",
        callback: (token) => {
          const resolve = state.resolve;
          state.pending = null;
          state.resolve = null;
          state.reject = null;
          resolve?.(token);
        },
        "expired-callback": () => {
          state.pending = null;
          state.resolve = null;
          state.reject = null;
        },
        "error-callback": () => {
          const reject = state.reject;
          state.pending = null;
          state.resolve = null;
          state.reject = null;
          reject?.(new Error("Sicherheitsprüfung konnte nicht geladen werden"));
        }
      });
    }
    const existingToken = recaptcha.getResponse(state.widgetId);
    if (existingToken) return existingToken;
    if (!state.pending) {
      state.pending = new Promise((resolve, reject) => {
        state.resolve = resolve;
        state.reject = reject;
      });
    }
    return state.pending;
  };

  const resetV2 = (host, hide = false) => {
    const state = v2States.get(host);
    if (state?.widgetId !== undefined && window.grecaptcha) window.grecaptcha.reset(state.widgetId);
    if (state) {
      state.pending = null;
      state.resolve = null;
      state.reject = null;
    }
    host.hidden = hide;
  };

  const createCaptchaFallback = (label) => {
    const host = document.createElement("div");
    host.className = "koepfer-captcha-fallback";
    host.hidden = true;
    host.innerHTML = `<span class="koepfer-captcha-fallback-label">${label}</span><div class="koepfer-captcha-widget"></div>`;
    return host;
  };

  const postFeedback = (payload, action, version, token) => fetch(FEEDBACK_FUNCTION_URL, {
    method: "POST",
    headers: {"apikey": SUPABASE_KEY, "Content-Type": "application/json"},
    body: JSON.stringify({
      ...payload,
      captcha_token: token,
      captcha_action: action,
      captcha_version: version
    })
  });

  const responseDetails = async (response) => {
    try {
      return await response.clone().json();
    } catch {
      return {};
    }
  };

  const responseError = async (response) => {
    const details = await responseDetails(response);
    const error = new Error(details.error || `Anfrage fehlgeschlagen (${response.status})`);
    error.status = response.status;
    return error;
  };

  const submitWithCaptcha = async (payload, action, fallbackHost, setStatus) => {
    if (!RECAPTCHA_ENABLED) {
      return fetch(`${SUPABASE_URL}/rest/v1/article_feedback`, {
        method: "POST",
        headers: {"apikey": SUPABASE_KEY, "Content-Type": "application/json", "Prefer": "return=minimal"},
        body: JSON.stringify(payload)
      });
    }

    let response;
    try {
      response = await postFeedback(payload, action, "v3", await v3Token(action));
    } catch (error) {
      console.warn("KOEPFER reCAPTCHA v3:", error);
    }

    if (response?.ok) return response;
    if (response) {
      const details = await responseDetails(response);
      if (response.status !== 403 || details.captcha_fallback !== true) throw await responseError(response);
    }

    setStatus("Bitte Sicherheitsprüfung bestätigen.");
    try {
      const token = await v2Token(fallbackHost);
      setStatus("Speichert …");
      const fallbackResponse = await postFeedback(payload, action, "v2", token);
      if (!fallbackResponse.ok) throw await responseError(fallbackResponse);
      resetV2(fallbackHost, true);
      return fallbackResponse;
    } catch (error) {
      resetV2(fallbackHost, false);
      throw error;
    }
  };

  let sessionId = localStorage.getItem(`${storagePrefix}:session`);
  if (!sessionId) {
    sessionId = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(`${storagePrefix}:session`, sessionId);
  }

  const createFeedback = async (story) => {
    const source = story.querySelector(".source[href]");
    if (!source || !editionDate) return;

    const headline = story.querySelector("h3")?.textContent?.trim() || "Artikel";
    const meta = story.querySelector(".meta span")?.textContent || "";
    const topic = (meta.split("·").slice(1).join("·").trim() || "Sonstiges").slice(0, 80);
    const articleId = source.href;
    const articleHash = await hash(`${editionDate}|${articleId}`);
    const voteKey = `${storagePrefix}:vote:${articleHash}`;

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.innerHTML = `
      <div class="feedback-copy">
        <b>War diese Meldung relevant?</b>
        <small>Anonym · eine Bewertung je Browser</small>
      </div>
      <div class="feedback-actions">
        <button class="feedback-button" type="button" data-vote="1" aria-pressed="false">👍</button>
        <button class="feedback-button" type="button" data-vote="-1" aria-pressed="false">👎</button>
        <span class="feedback-status" role="status" aria-live="polite"></span>
      </div>`;
    const fallbackHost = createCaptchaFallback("Bitte bestätigen, dass Sie kein Roboter sind:");
    feedback.append(fallbackHost);
    source.insertAdjacentElement("afterend", feedback);

    const buttons = [...feedback.querySelectorAll(".feedback-button")];
    const status = feedback.querySelector(".feedback-status");
    const savedVote = localStorage.getItem(voteKey);
    buttons[0].setAttribute("aria-label", `Meldung relevant: ${headline}`);
    buttons[1].setAttribute("aria-label", `Meldung weniger relevant: ${headline}`);

    const showSaved = (vote) => {
      buttons.forEach((button) => {
        const selected = button.dataset.vote === String(vote);
        button.disabled = true;
        button.setAttribute("aria-pressed", selected ? "true" : "false");
        if (selected) button.classList.add(vote === 1 ? "selected-up" : "selected-down");
      });
      status.textContent = "Gespeichert";
    };

    if (savedVote) {
      showSaved(Number(savedVote));
      return;
    }

    buttons.forEach((button) => button.addEventListener("click", async () => {
      const vote = Number(button.dataset.vote);
      buttons.forEach((item) => item.disabled = true);
      status.textContent = "Speichert …";

      try {
        const sessionHash = await hash(sessionId);
        const response = await submitWithCaptcha({
          article_id: articleId,
          edition_date: editionDate,
          topic,
          vote,
          session_hash: sessionHash
        }, "feedback_vote", fallbackHost, message => { status.textContent = message; });

        if (!response.ok) throw new Error(`Feedback request failed: ${response.status}`);
        localStorage.setItem(voteKey, String(vote));
        showSaved(vote);
      } catch (error) {
        buttons.forEach((item) => item.disabled = false);
        status.textContent = fallbackHost.hidden
          ? "Nicht gespeichert – bitte erneut versuchen."
          : "Nicht gespeichert – Sicherheitsprüfung erneut versuchen.";
        console.warn("KOEPFER feedback:", error);
      }
    }));
  };

  document.querySelectorAll(".story").forEach((story) => createFeedback(story));

  const wishDialog = document.querySelector(".wish-dialog");
  const wishForm = document.querySelector(".wish-form");
  const wishMessage = document.querySelector(".wish-message");
  const wishSubmit = wishForm?.querySelector(".wish-submit");
  const wishFallback = createCaptchaFallback("Bitte bestätigen, dass Sie kein Roboter sind:");
  wishSubmit?.insertAdjacentElement("beforebegin", wishFallback);
  document.querySelector(".wish-launch")?.addEventListener("click", () => wishDialog?.showModal());
  document.querySelector(".wish-close")?.addEventListener("click", () => wishDialog?.close());

  wishForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const direction = document.querySelector("#wish-direction").value;
    const kind = document.querySelector("#wish-kind").value;
    const target = document.querySelector("#wish-target").value.trim().replace(/\s+/g, " ").slice(0, 120);
    if (target.length < 2) return;
    wishSubmit.disabled = true;
    wishMessage.textContent = "Speichert …";
    try {
      const sessionHash = await hash(sessionId);
      const requestId = `request://${direction}/${kind}/${encodeURIComponent(target.toLocaleLowerCase("de-DE"))}`;
      const response = await submitWithCaptcha({
        article_id: requestId,
        edition_date: editionDate,
        topic: `Redaktionswunsch · ${direction} · ${kind} · ${target}`.slice(0, 200),
        vote: direction === "less" ? -1 : 1,
        session_hash: sessionHash
      }, "editorial_request", wishFallback, message => { wishMessage.textContent = message; });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      wishMessage.textContent = "Gespeichert – wird in der nächsten Ausgabe berücksichtigt.";
      wishForm.reset();
      setTimeout(() => wishDialog.close(), 1600);
    } catch (error) {
      wishMessage.textContent = wishFallback.hidden
        ? "Nicht gespeichert – bitte erneut versuchen."
        : "Nicht gespeichert – Sicherheitsprüfung erneut versuchen.";
      console.warn("KOEPFER editorial request:", error);
    } finally {
      wishSubmit.disabled = false;
    }
  });
})();
