window.NeoChatLogic = (() => {
  function weatherLabel(code) {
    const map = {
      0: "słonecznie",
      1: "głównie słonecznie",
      2: "częściowe zachmurzenie",
      3: "pochmurno",
      45: "mgliście",
      48: "mgliście",
      51: "lekka mżawka",
      61: "deszczowo",
      63: "deszczowo",
      65: "mocny deszcz",
      71: "śnieżnie",
      80: "przelotny deszcz",
      95: "burzowo"
    };
    return map[code] || "stabilna pogoda";
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function generateChatMeta(text, history = [], lang = "pl") {
    const clean = cleanText(text);
    const joined = [clean, ...history.map((entry) => entry.text || "")].join(" ").toLowerCase();
    let title = clean.split(" ").slice(0, 4).join(" ");
    if (/pizza|przepis|recipe|rezept/.test(joined)) title = lang === "en" ? "Pizza recipe" : lang === "de" ? "Pizza Rezept" : "Przepis na pizzę";
    if (/kod|code|python|javascript|debug|api|refaktoryzac/.test(joined)) title = lang === "en" ? "Coding help" : lang === "de" ? "Programmierhilfe" : "Kodowanie JS";
    if (/głos|voice|mikrofon|tts|stt/.test(joined)) title = lang === "en" ? "Voice mode" : lang === "de" ? "Sprachmodus" : "Tryb głosowy";
    const analysis = analyzeMessageContext(clean);
    return {
      title: title || analysis.topic || "Nowy czat",
      description: analysis.description || clean.slice(0, 72) || "Rozmowa rozpoczęta"
    };
  }

  function analyzeMessageContext(text) {
    const normalized = cleanText(text).toLowerCase();
    if (/^(hej|hejo|hejka|siema|siemanko|cześć|elo)/i.test(normalized)) {
      return { topic: "Przywitanie", description: "Użytkownik nawiązał kontakt." };
    }
    if (/pogoda|temperatura|weather/i.test(normalized)) {
      return { topic: "Pogoda", description: "Użytkownik pyta o pogodę lub temperaturę." };
    }
    if (/błąd|error|exception|console|trace|failed|cannot/i.test(normalized)) {
      return { topic: "Diagnoza błędu", description: "Użytkownik wkleił lub opisał problem techniczny." };
    }
    if (/kod|code|python|javascript|html|css|cpp|c\+\+|refaktoryzac/.test(normalized)) {
      return { topic: "Kodowanie JS", description: "Użytkownik prosi o pomoc programistyczną lub refaktoryzację." };
    }
    if (/😊|😀|😄|🚀|✨|❤️|😍/.test(text)) {
      return { topic: "Pozytywne emocje", description: "Użytkownik pisze z entuzjazmem lub sympatią." };
    }
    return { topic: "Rozmowa", description: "Standardowa wiadomość użytkownika." };
  }

  function buildReply({ input, model, lang, location, weather }) {
    const prompt = cleanText(input);
    const normalized = prompt.toLowerCase();
    const enthusiastic = lang === "en" ? "Nice one!" : lang === "de" ? "Gute Frage!" : "Dobre pytanie!";

    if (/^(hej|hejo|hejka)$/i.test(prompt)) {
      const city = location?.city ? ` w ${location.city}` : "";
      return `Hej! Super, że wpadłeś${city}! 😊 Jak Ci mija dzień? W czym możemy dziś wspólnie podziałać? 🚀`;
    }

    const mathMatch = normalized.match(/^\s*ile\s+to\s+([0-9+\-*/(). x]+)\s*[\?]?\s*$/i) || normalized.match(/^\s*([0-9+\-*/(). x]+)\s*=\s*$/);
    if (mathMatch) {
      const expression = mathMatch[1].replace(/x/g, "*").replace(/\s+/g, "");
      if (/^[0-9+\-*/().*]+$/.test(expression)) {
        try {
          const value = Function(`"use strict"; return (${expression});`)();
          if (Number.isFinite(value)) return `${value}! ${enthusiastic}`;
        } catch {}
      }
    }

    if (/pogoda|temperatura|weather/i.test(normalized) && location && weather) {
      const city = location.city || "Twojej okolicy";
      const temp = Math.round(weather.temperature_2m);
      const label = weatherLabel(Number(weather.weather_code));
      return `W ${city} jest dziś ${label} i około ${temp}°C! Piękna pogoda! [Źródło](https://open-meteo.com/)`;
    }

    if (/error|exception|failed|cannot|console|uncaught|typeerror|referenceerror|syntaxerror|vite|webpack|react/i.test(normalized)) {
      return `Wygląda na błąd z konsoli. Oto szybki fix:\n\n\`\`\`txt\n1. Znajdź pierwszy błąd w stack trace.\n2. Otwórz wskazany plik i linię.\n3. Napraw import, nazwę albo brakującą wartość.\n\`\`\`\n\nWklej pełny błąd, a dam gotowy fix.`;
    }

    if (/szukaj|wyszukaj|research|źródł|źrodł|internet|web/i.test(prompt)) {
      const query = encodeURIComponent(prompt.replace(/szukaj|wyszukaj|research/gi, "").trim() || "neo ai");
      return [
        `Linki do źródeł:`,
        `- [Google](https://www.google.com/search?q=${query})`,
        `- [DuckDuckGo](https://duckduckgo.com/?q=${query})`,
        `- [Wikipedia](https://pl.wikipedia.org/wiki/Special:Search?search=${query})`
      ].join("\n");
    }

    if (model === "neo-coder-ultra") {
      const language = /python/i.test(prompt) ? "python" : /c\+\+|cpp/i.test(prompt) ? "cpp" : "javascript";
      const snippet = language === "python"
        ? "def solve(problem):\n    return [item for item in problem]"
        : language === "cpp"
          ? "#include <vector>\nusing namespace std;\n\nvector<int> solve(const vector<int>& input) {\n    return input;\n}"
          : "function solve(input) {\n  return [...input];\n}";
      return `\`\`\`${language}\n${snippet}\n\`\`\``;
    }

    if (model === "neo-creative") {
      if (/^(siema|siemanko|hej|cześć|elo|yo)[!.? ]*$/i.test(prompt)) return "Siemanko! Miło Cię widzieć! 😊";
      if (/^(co\?*|coo+\?*|co\?\?\?+)[ ]*$/i.test(prompt)) return "Napisz dokładniej! Zaraz pomogę! 🚀";
      return "Jasne! Mam dla Ciebie coś ekstra! 😊";
    }

    if (model === "neo-vision") return "Podeślij screen, a go opiszę! 🔍";

    if (/jak tam dzień|co tam/i.test(normalized)) return "Dobrze! Dzięki za pytanie 😊";
    if (/^(siema|siemanko|hej|cześć|hello|hallo)[!.? ]*$/i.test(prompt)) return lang === "en" ? "Hi! Great to see you!" : lang === "de" ? "Hallo! Schön, dass du da bist!" : "Cześć! Miło Cię widzieć! 😊";
    if (/^(co\?*|coo+\?*|co\?\?\?+)[ ]*$/i.test(prompt)) return lang === "en" ? "Write a bit more. I’ll help right away!" : lang === "de" ? "Schreib etwas genauer. Ich helfe sofort!" : "Napisz trochę dokładniej! Zaraz pomogę!";

    if (lang === "en") return `${prompt}! Nice one!`;
    if (lang === "de") return `${prompt}! Gute Frage!`;
    return `${prompt}! ${enthusiastic}`;
  }

  return {
    weatherLabel,
    generateChatMeta,
    analyzeMessageContext,
    buildReply
  };
})();
