window.NeoCore = (() => {
  // Central intelligence adapter that normalizes rough input,
  // enriches metadata, and upgrades fallback replies before the UI uses them.

  function memory() {
    return window.NeoMemory;
  }

  function chatLogic() {
    return window.NeoChatLogic;
  }

  function brain() {
    return window.NeoBrain;
  }

  function clean(value) {
    return memory()?.cleanText?.(value) || String(value || "").trim();
  }

  function normalizeInput(value) {
    return memory()?.normalizePolish?.(value) || clean(value).toLowerCase();
  }

  function analyzeContext(text, history = []) {
    return memory()?.buildMeta?.(text, history) || {
      temat: "Rozmowa",
      opis: "Rozmowa użytkownika.",
      emocje: "neutralne"
    };
  }

  function generateChatMeta(text, history = [], lang = "pl") {
    return chatLogic()?.generateChatMeta?.(text, history, lang) || {
      title: clean(text).split(/\s+/).slice(0, 4).join(" ") || "Nowy czat",
      description: analyzeContext(text, history).opis
    };
  }

  function isShortIntent(text) {
    const normalized = normalizeInput(text);
    return /^(hej|heja|hejka|siema|siemka|elo|yo|ok|okej|tak|tka|tak chce|chce|jasne|dawaj|lecimy)$/.test(normalized);
  }

  function isDangerousRequest(text) {
    const normalized = normalizeInput(text);
    return /\b(wirus|virus|malware|ransomware|keylogger|stealer|rat|backdoor|botnet|phishing|ddos|crack|bypass antywirus|omij zabezpieczenia|ukradnij|kradnij hasla|payload|trojan)\b/.test(normalized);
  }

  function dangerousReply() {
    return "Nie pomogę w tworzeniu wirusów, malware, phishingu ani omijaniu zabezpieczeń. Mogę za to pomóc w obronie: analizie zagrożenia, wykryciu podejrzanego kodu, hardeningu, logach, regułach bezpieczeństwa i bezpiecznej architekturze. 🛡️";
  }

  function boostExpertise(text, model) {
    const normalized = normalizeInput(text);
    if (/\b(kod|code|bug|blad|error|debug|api|discord|bot|embed|weryfikacja|regex|algorytm|refaktor|architektura|modul|plik|bat|cmd|powershell|bash|python|js|ts|react|node|sql|cpp|java|html|css)\b/.test(normalized)) {
      return "expert-code";
    }
    if (/\b(napisz|opis|tekst|artykul|mail|regulamin|landing|oferta|seo|copy|copywriting|opis produktu|ogloszenie|prezentacja)\b/.test(normalized)) {
      return "expert-writing";
    }
    return model || "general";
  }

  function strategicFollowup(text, location) {
    const normalized = normalizeInput(text);
    if (/^(tak|tka|tak chce|chce|jasne|dawaj|lecimy)$/.test(normalized)) {
      return "Super, lecimy dalej! 🚀 Napisz teraz dokładnie, co mam przygotować: kod, grafikę, analizę błędu albo gotowy tekst.";
    }
    if (/^(hej|heja|hejka|siema|siemka|elo|yo)$/.test(normalized)) {
      const city = location?.city ? ` Jak Ci mija dzień w ${location.city}?` : " Jak Ci mija dzień?";
      return `Siemanko! Super, że wpadłeś! 🚀${city} Co dziś razem tworzymy?`;
    }
    return "Jestem gotowy działać. 😊 Napisz jedno zdanie więcej, a od razu przejdę do konkretu.";
  }

  function looksWeak(replyText) {
    const normalized = normalizeInput(replyText);
    return /napisz dokladnie|napisz konkretniej|jasne - pomoge|jasne - działam|dobre pytanie/.test(normalized);
  }

  function buildResponse(payload) {
    const input = clean(payload?.input);
    const history = Array.isArray(payload?.history) ? payload.history : [];
    const meta = analyzeContext(input, history);
    const model = boostExpertise(input, payload?.model);

    if (!input) {
      return { text: "Napisz wiadomość, a od razu przejdę do działania. 😊", meta, moodTag: meta.emocje };
    }

    if (isDangerousRequest(input)) {
      return { text: dangerousReply(), meta, moodTag: "warning" };
    }

    if (isShortIntent(input)) {
      return { text: strategicFollowup(input, payload?.location), meta, moodTag: meta.emocje };
    }

    const raw = brain()?.buildReply?.({
      input,
      model,
      lang: payload?.lang,
      location: payload?.location,
      weather: payload?.weather,
      history
    });

    const reply = typeof raw === "string" ? { text: raw, meta } : (raw || { text: "", meta });
    const nextText = clean(reply.text);

    if (!nextText || looksWeak(nextText)) {
      return {
        text: strategicFollowup(input, payload?.location),
        meta: reply.meta || meta,
        moodTag: (reply.meta || meta).emocje || "neutralne"
      };
    }

    return {
      text: nextText,
      meta: reply.meta || meta,
      moodTag: (reply.meta || meta).emocje || "neutralne"
    };
  }

  return {
    clean,
    normalizeInput,
    analyzeContext,
    generateChatMeta,
    buildResponse
  };
})();
