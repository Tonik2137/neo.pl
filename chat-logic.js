window.NeoChatLogic = (() => {
  function weatherLabel(code) {
    const map = {
      0: "słonecznie",
      1: "głównie słonecznie",
      2: "częściowo pochmurno",
      3: "pochmurno",
      45: "mgliście",
      48: "mgliście",
      51: "lekka mżawka",
      61: "deszczowo",
      63: "deszczowo",
      65: "mocno deszczowo",
      71: "śnieżnie",
      80: "przelotny deszcz",
      95: "burzowo"
    };
    return map[code] || "stabilnie";
  }

  function generateChatMeta(text, history = [], lang = "pl") {
    const meta = window.NeoMemory?.buildMeta(text, history) || {
      temat: "Rozmowa",
      opis: "Standardowa wiadomość użytkownika.",
      emocje: "neutralne"
    };

    const titleMap = {
      Przywitanie: { pl: "Przywitanie", en: "Greeting", de: "Begrüßung" },
      "Lokalizacja i pogoda": { pl: "Pogoda i mapa", en: "Weather and maps", de: "Wetter und Karte" },
      Kodowanie: { pl: "Pomoc w kodzie", en: "Coding help", de: "Programmierhilfe" },
      Grafika: { pl: "Grafika AI", en: "AI graphics", de: "AI Grafik" },
      Wyszukiwanie: { pl: "Wyszukiwanie", en: "Research", de: "Suche" },
      Emocje: { pl: "Luźna rozmowa", en: "Mood chat", de: "Stimmung" },
      Rozmowa: { pl: "Nowy czat", en: "New chat", de: "Neuer Chat" }
    };

    const title = titleMap[meta.temat]?.[lang] || text.split(" ").slice(0, 4).join(" ") || "Nowy czat";
    return {
      title,
      description: meta.opis
    };
  }

  function analyzeMessageContext(text, history = []) {
    return window.NeoMemory?.buildMeta(text, history) || {
      temat: "Rozmowa",
      opis: "Standardowa wiadomość użytkownika.",
      emocje: "neutralne"
    };
  }

  function buildReply(payload) {
    const result = window.NeoBrain?.buildReply(payload);
    if (typeof result === "string") return result;
    return result || { text: "Jasne — pomogę konkretnie. 😊" };
  }

  return {
    weatherLabel,
    generateChatMeta,
    analyzeMessageContext,
    buildReply
  };
})();
