window.NeoChatLogic = (() => {
  function weatherLabel(code) {
    const map = {
      0: "slonecznie",
      1: "glownie slonecznie",
      2: "czesciowo pochmurno",
      3: "pochmurno",
      45: "mgliscie",
      48: "mgliscie",
      51: "lekka mzawka",
      61: "deszczowo",
      63: "deszczowo",
      65: "mocno deszczowo",
      71: "snieznie",
      80: "przelotny deszcz",
      95: "burzowo"
    };
    return map[code] || "stabilnie";
  }

  function titleFromText(text, meta, lang) {
    const normalized = window.NeoMemory?.normalizePolish(text) || text.toLowerCase();
    if (meta.temat === "Przywitanie") return lang === "en" ? "Greeting" : lang === "de" ? "Begruessung" : "Przywitanie";
    if (meta.temat === "Kodowanie") {
      if (/discord|embed|weryfikacja|verify/.test(normalized)) return "Discord verify";
      if (/bat|cmd/.test(normalized)) return ".bat script";
      return lang === "en" ? "Coding help" : "Pomoc w kodzie";
    }
    if (meta.temat === "Grafika") {
      if (/kot|cat/.test(normalized)) return "Latajacy kot";
      if (/meme|mem/.test(normalized)) return "Generowanie mema";
      return "Grafika AI";
    }
    if (meta.temat === "Lokalizacja i pogoda") return "Pogoda i mapa";
    if (meta.temat === "Wyszukiwanie") return "Wyszukiwanie";
    const words = String(text || "").trim().split(/\s+/).slice(0, 4).join(" ");
    return words || "Nowy czat";
  }

  function generateChatMeta(text, history = [], lang = "pl") {
    const meta = window.NeoMemory?.buildMeta(text, history) || {
      temat: "Rozmowa",
      opis: "Rozmowa uzytkownika.",
      emocje: "neutralne"
    };
    return {
      title: titleFromText(text, meta, lang),
      description: meta.opis
    };
  }

  function analyzeMessageContext(text, history = []) {
    return window.NeoMemory?.buildMeta(text, history) || {
      temat: "Rozmowa",
      opis: "Rozmowa uzytkownika.",
      emocje: "neutralne"
    };
  }

  function buildReply(payload) {
    const result = window.NeoBrain?.buildReply(payload);
    if (typeof result === "string") return result;
    return result || { text: "Jasne - pomoge konkretnie. 😊" };
  }

  return {
    weatherLabel,
    generateChatMeta,
    analyzeMessageContext,
    buildReply
  };
})();
