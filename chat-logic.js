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
    if (/grafik|logo|baner|ui|interfejs|design|poster|landing/.test(joined)) title = lang === "en" ? "Design concept" : lang === "de" ? "Design Konzept" : "Projekt grafiki";
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
      return { topic: "Kodowanie", description: "Użytkownik prosi o pomoc programistyczną lub refaktoryzację." };
    }
    if (/grafik|logo|baner|ui|landing|plakat|poster|branding/.test(normalized)) {
      return { topic: "Grafika", description: "Użytkownik chce wygenerować lub zaprojektować grafikę." };
    }
    if (/[😊😀😄🚀✨❤️🥰🤔]/u.test(text)) {
      return { topic: "Pozytywne emocje", description: "Użytkownik pisze z entuzjazmem lub sympatią." };
    }
    return { topic: "Rozmowa", description: "Standardowa wiadomość użytkownika." };
  }

  function buildAdvancedCodeReply(prompt) {
    const language = /python/i.test(prompt) ? "python" : /c\+\+|cpp/i.test(prompt) ? "cpp" : /html|css|frontend|ui/i.test(prompt) ? "html" : "javascript";
    if (language === "python") {
      return [
        "Poniżej masz mocniejszy, czytelny szkielet rozwiązania z miejscem na rozbudowę:",
        "```python",
        "from dataclasses import dataclass",
        "from typing import Iterable, List",
        "",
        "@dataclass",
        "class Item:",
        "    value: int",
        "",
        "def solve(items: Iterable[int]) -> List[Item]:",
        "    normalized = [Item(value=item) for item in items]",
        "    normalized.sort(key=lambda entry: entry.value)",
        "    return normalized",
        "```",
        "",
        "Jeśli chcesz, mogę od razu dopisać wersję produkcyjną z walidacją, testami i obsługą błędów."
      ].join("\n");
    }
    if (language === "cpp") {
      return [
        "Masz tu porządniejszą wersję pod C++ z czytelnym API:",
        "```cpp",
        "#include <algorithm>",
        "#include <vector>",
        "",
        "struct Item {",
        "    int value;",
        "};",
        "",
        "std::vector<Item> solve(const std::vector<int>& input) {",
        "    std::vector<Item> result;",
        "    result.reserve(input.size());",
        "    for (int value : input) {",
        "        result.push_back({value});",
        "    }",
        "    std::sort(result.begin(), result.end(), [](const Item& a, const Item& b) {",
        "        return a.value < b.value;",
        "    });",
        "    return result;",
        "}",
        "```",
        "",
        "Mogę też przygotować wersję pod reverse engineering albo parser binarny."
      ].join("\n");
    }
    if (language === "html") {
      return [
        "Jasne — poniżej masz estetyczny blok startowy pod UI/grafikę webową:",
        "```html",
        "<section class=\"hero-card\">",
        "  <h1>NeoAI Studio</h1>",
        "  <p>Nowoczesny panel do generowania grafik, kodu i pomysłów.</p>",
        "  <button>Uruchom kreator</button>",
        "</section>",
        "```",
        "",
        "```css",
        ".hero-card {",
        "  padding: 32px;",
        "  border-radius: 24px;",
        "  background: linear-gradient(135deg, #0ea5e9, #6366f1, #d946ef);",
        "  color: white;",
        "  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.35);",
        "}",
        "```"
      ].join("\n");
    }
    return [
      "Poniżej masz solidniejszy punkt wyjścia pod kod produkcyjny:",
      "```javascript",
      "export function solve(input) {",
      "  const items = Array.isArray(input) ? input : [];",
      "  return items",
      "    .map((value, index) => ({ id: index + 1, value }))",
      "    .filter((entry) => entry.value !== undefined && entry.value !== null);",
      "}",
      "```",
      "",
      "Jeśli chcesz, dopiszę od razu wersję z typami, testami i refaktorem pod Twój projekt."
    ].join("\n");
  }

  function buildGraphicsReply(prompt) {
    return [
      "Mam dla Ciebie mocny kierunek graficzny:",
      "",
      "```txt",
      `Prompt główny: ${prompt}`,
      "Styl: premium, neon blue + violet, clean lighting, cinematic contrast",
      "Układ: centralny fokus, mocna hierarchia, czytelne CTA",
      "Detale: glassmorphism, subtelny bloom, nowoczesne tło gradientowe",
      "```",
      "",
      "Mogę też wygenerować gotowy:",
      "- prompt do Midjourney / DALL-E",
      "- layout landing page w HTML/CSS",
      "- logo lub banner w stylu NeoAI"
    ].join("\n");
  }

  function buildReply({ input, model, lang, location, weather }) {
    const prompt = cleanText(input);
    const normalized = prompt.toLowerCase();
    const enthusiastic = lang === "en" ? "Nice one!" : lang === "de" ? "Gute Frage!" : "Dobre pytanie!";
    const isGreeting = /^(hej+|hejo+|hejka+|siema+|siemanko+|elo+|cześć+|czesc+|hello+|hallo+|yo+)[!.? ]*$/i.test(prompt);
    const asksWeather = /pogoda|temperatura|weather|jaka pogoda|czy pada|ile stopni/i.test(normalized);

    if (isGreeting) {
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

    if (asksWeather && location && weather) {
      const city = location.city || "Twojej okolicy";
      const temp = Math.round(weather.temperature_2m);
      const label = weatherLabel(Number(weather.weather_code));
      return `W ${city} jest dziś ${label} i około ${temp}°C! Piękna pogoda! [Źródło](https://open-meteo.com/)`;
    }

    if (asksWeather) {
      return "Mogę sprawdzić pogodę, ale w tej chwili nie mam jeszcze aktywnej lokalizacji. Napisz mi miasto, a odpowiem konkretnie.";
    }

    if (/error|exception|failed|cannot|console|uncaught|typeerror|referenceerror|syntaxerror|vite|webpack|react/i.test(normalized)) {
      return `Wygląda na błąd z konsoli. Oto szybki fix:\n\n\`\`\`txt\n1. Znajdź pierwszy błąd w stack trace.\n2. Otwórz wskazany plik i linię.\n3. Napraw import, nazwę albo brakującą wartość.\n\`\`\`\n\nWklej pełny błąd, a dam gotowy fix.`;
    }

    if (/szukaj|wyszukaj|research|źródł|zrodl|internet|web/i.test(prompt)) {
      const query = encodeURIComponent(prompt.replace(/szukaj|wyszukaj|research/gi, "").trim() || "neo ai");
      return [
        "Linki do źródeł:",
        `- [Google](https://www.google.com/search?q=${query})`,
        `- [DuckDuckGo](https://duckduckgo.com/?q=${query})`,
        `- [Wikipedia](https://pl.wikipedia.org/wiki/Special:Search?search=${query})`
      ].join("\n");
    }

    if (model === "neo-coder-ultra" || /napisz kod|zrób kod|fix code|debug code|program/i.test(normalized)) {
      return buildAdvancedCodeReply(prompt);
    }

    if (model === "neo-vision" || /grafik|logo|baner|ui|landing|plakat|poster|obraz|grafika/i.test(normalized)) {
      return buildGraphicsReply(prompt);
    }

    if (model === "neo-creative") {
      if (/^(siema|siemanko|hej|cześć|elo|yo)[!.? ]*$/i.test(prompt)) return "Siemanko! Miło Cię widzieć! 😊";
      if (/^(co\?*|coo+\?*|co\?\?\?+)[ ]*$/i.test(prompt)) return "Napisz dokładniej! Zaraz pomogę! 🚀";
      return "Jasne! Mam dla Ciebie coś ekstra! 😊";
    }

    if (/jak tam dzień|co tam/i.test(normalized)) return "Dobrze! Dzięki za pytanie 😊";
    if (isGreeting) return lang === "en" ? "Hi! Great to see you!" : lang === "de" ? "Hallo! Schön, dass du da bist!" : "Cześć! Miło Cię widzieć! 😊";
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
