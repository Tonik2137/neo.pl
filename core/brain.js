window.NeoBrain = (() => {
  function safeMemory() {
    return window.NeoMemory;
  }

  function safeEndpoints() {
    return window.NeoEndpoints;
  }

  function hasAny(text, patterns) {
    return patterns.some((pattern) => pattern.test(text));
  }

  function mathAnswer(prompt) {
    const normalized = safeMemory().normalizePolish(prompt);
    const match = normalized.match(/(?:ile to|oblicz)\s+([0-9+\-*/(). x]+)/i) || normalized.match(/^([0-9+\-*/(). x]+)$/i);
    if (!match) return "";
    const expression = String(match[1]).replace(/x/gi, "*").replace(/\s+/g, "");
    if (!/^[0-9+\-*/().*]+$/.test(expression)) return "";
    try {
      const value = Function(`"use strict"; return (${expression});`)();
      return Number.isFinite(value) ? `${value}` : "";
    } catch {
      return "";
    }
  }

  function greetingReply(input, location) {
    const city = location?.city ? ` Jak Ci mija dzień w ${location.city}?` : " Jak Ci mija dzień?";
    return `Hej! Super Cię widzieć! 😊${city} W czym możemy dziś wspólnie podziałać? 🚀`;
  }

  function emojiReply(input) {
    const text = String(input || "");
    if (/🚀|✨|🥳|😄|😀|😊/u.test(text)) {
      return "Ale energia! 😊 Lecimy z tym razem i zrobimy coś naprawdę fajnego! 🚀";
    }
    if (/❤️|❤|💖/u.test(text)) {
      return "Ale miło! 💖 Jestem gotowy działać razem z Tobą.";
    }
    return "Widzę dobry klimat! 😊 Napisz tylko, co chcesz zrobić, a od razu przejdę do konkretu.";
  }

  function weatherReply(location, weather) {
    if (!weather) {
      const city = location?.city || "Twoją okolicę";
      return `Nie mam teraz świeżych danych pogodowych dla ${city}. Mogę za to od razu dać Ci link do pogody albo mapy.`;
    }
    const label = window.NeoChatLogic?.weatherLabel?.(Number(weather.weather_code)) || "stabilnie";
    const temperature = Math.round(Number(weather.temperature_2m));
    const city = location?.city || "Twojej okolicy";
    return `W ${city} jest dziś ${label} i około ${temperature}°C! Piękna pogoda, żeby działać dalej.`;
  }

  function inferCodeLanguage(prompt) {
    const normalized = safeMemory().normalizePolish(prompt);
    if (/\.(bat|cmd)\b|batch|plik bat|skrypt bat/.test(normalized)) return "bat";
    if (/\.(ps1)\b|powershell/.test(normalized)) return "powershell";
    if (/\.(sh)\b|bash|shell script/.test(normalized)) return "bash";
    if (/\.(json)\b|json/.test(normalized)) return "json";
    if (/\.(py)\b|python/.test(normalized)) return "python";
    if (/\.(cpp|cc|cxx)\b|c\+\+|cpp/.test(normalized)) return "cpp";
    if (/\.(java)\b|java/.test(normalized)) return "java";
    if (/\.(html)\b|frontend|html/.test(normalized)) return "html";
    if (/\.(css)\b|css/.test(normalized)) return "css";
    if (/\.(sql)\b|sql/.test(normalized)) return "sql";
    if (/\.(ts)\b|typescript/.test(normalized)) return "typescript";
    return "javascript";
  }

  function codingReply(prompt, model) {
    const normalized = safeMemory().normalizePolish(prompt);
    const language = inferCodeLanguage(prompt);

    const intro = /error|blad|błąd|exception|console|typeerror|referenceerror|failed/.test(normalized)
      ? "Widzę błąd techniczny. Najszybciej będzie poprawić to tak:"
      : "Masz poniżej mocniejszą, czystszą wersję:";

    const snippets = {
      bat: [
        "```bat",
        "@echo off",
        "setlocal",
        "",
        "echo Uruchamiam zadanie...",
        "if \"%~1\"==\"\" (",
        "  echo Brak argumentu wejściowego.",
        "  exit /b 1",
        ")",
        "",
        "set \"INPUT=%~1\"",
        "echo Odebrano: %INPUT%",
        "echo Gotowe.",
        "exit /b 0",
        "```"
      ].join("\n"),
      powershell: [
        "```powershell",
        "param(",
        "  [Parameter(Mandatory = $true)]",
        "  [string]$InputValue",
        ")",
        "",
        "Write-Host \"Uruchamiam zadanie...\"",
        "Write-Host \"Odebrano: $InputValue\"",
        "Write-Host \"Gotowe.\"",
        "```"
      ].join("\n"),
      bash: [
        "```bash",
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        "",
        "INPUT=\"${1:-}\"",
        "if [ -z \"$INPUT\" ]; then",
        "  echo \"Brak argumentu wejściowego.\"",
        "  exit 1",
        "fi",
        "",
        "echo \"Uruchamiam zadanie...\"",
        "echo \"Odebrano: $INPUT\"",
        "echo \"Gotowe.\"",
        "```"
      ].join("\n"),
      json: [
        "```json",
        "{",
        "  \"app\": \"NeoAI\",",
        "  \"mode\": \"production\",",
        "  \"features\": [\"chat\", \"voice\", \"vision\"],",
        "  \"enabled\": true",
        "}",
        "```"
      ].join("\n"),
      javascript: [
        "```javascript",
        "export function buildAnswer(input) {",
        "  const text = String(input || '').trim();",
        "  if (!text) return { ok: false, error: 'Brak danych wejściowych.' };",
        "",
        "  return {",
        "    ok: true,",
        "    value: text,",
        "    createdAt: new Date().toISOString()",
        "  };",
        "}",
        "```"
      ].join("\n"),
      python: [
        "```python",
        "from dataclasses import dataclass",
        "",
        "@dataclass",
        "class Result:",
        "    ok: bool",
        "    value: str",
        "",
        "def build_answer(text: str) -> Result:",
        "    cleaned = (text or '').strip()",
        "    if not cleaned:",
        "        return Result(ok=False, value='Brak danych wejściowych.')",
        "    return Result(ok=True, value=cleaned)",
        "```"
      ].join("\n"),
      cpp: [
        "```cpp",
        "#include <string>",
        "",
        "struct Result {",
        "    bool ok;",
        "    std::string value;",
        "};",
        "",
        "Result buildAnswer(const std::string& input) {",
        "    if (input.empty()) return { false, \"Brak danych wejściowych.\" };",
        "    return { true, input };",
        "}",
        "```"
      ].join("\n"),
      html: [
        "```html",
        "<section class=\"neo-card\">",
        "  <h1>NeoAI Studio</h1>",
        "  <p>Nowoczesny panel do pracy z AI, kodem i obrazami.</p>",
        "  <button>Uruchom</button>",
        "</section>",
        "```",
        "",
        "```css",
        ".neo-card {",
        "  padding: 32px;",
        "  border-radius: 24px;",
        "  background: linear-gradient(135deg, #16c7ff, #5b5fff, #f146ff);",
        "  color: #fff;",
        "}",
        "```"
      ].join("\n"),
      sql: [
        "```sql",
        "SELECT id, email, plan, expires_at",
        "FROM users",
        "WHERE status = 'active'",
        "ORDER BY created_at DESC;",
        "```"
      ].join("\n"),
      java: [
        "```java",
        "public final class BuildAnswer {",
        "    public static String run(String input) {",
        "        String text = input == null ? \"\" : input.trim();",
        "        if (text.isEmpty()) return \"Brak danych wejściowych.\";",
        "        return text;",
        "    }",
        "}",
        "```"
      ].join("\n"),
      css: [
        "```css",
        ".neo-button {",
        "  padding: 12px 16px;",
        "  border-radius: 14px;",
        "  color: #fff;",
        "  background: linear-gradient(135deg, #16c7ff, #5b5fff, #f146ff);",
        "  box-shadow: 0 18px 32px rgba(91, 95, 255, 0.28);",
        "}",
        "```"
      ].join("\n"),
      typescript: [
        "```typescript",
        "export type Answer = {",
        "  ok: boolean;",
        "  value: string;",
        "};",
        "",
        "export function buildAnswer(input: unknown): Answer {",
        "  const text = String(input ?? '').trim();",
        "  if (!text) return { ok: false, value: 'Brak danych wejściowych.' };",
        "  return { ok: true, value: text };",
        "}",
        "```"
      ].join("\n")
    };

    const extra = model === "neo-coder-ultra"
      ? "\n\nJeśli chcesz, rozbiję Ci to od razu na pliki, foldery, zależności i gotowy plan zmian."
      : "\n\nJeśli chcesz, mogę od razu dopisać fix pod Twój błąd z konsoli.";

    return `${intro}\n\n${snippets[language] || snippets.javascript}${extra}`;
  }

  function searchReply(prompt) {
    const query = safeEndpoints().extractSearchQuery(prompt) || prompt;
    const links = safeEndpoints().buildSearchLinks(query);
    return [
      `Znalazłem dla Ciebie gotowe miejsca do sprawdzenia tematu „${query}”:`,
      safeEndpoints().asMarkdownLinks({
        Google: links.google,
        DuckDuckGo: links.duckduckgo,
        Bing: links.bing,
        Wikipedia: links.wikipedia
      }),
      "",
      "Kliknij link i od razu przejdziesz do wyników w przeglądarce."
    ].join("\n");
  }

  function mapsReply(prompt, location) {
    const place = safeEndpoints().extractMapQuery(prompt, location);
    const links = safeEndpoints().buildMapsLinks(place);
    return [
      `Jasne — przygotowałem mapę dla: ${place}.`,
      safeEndpoints().asMarkdownLinks({
        "Google Maps": links.googleMaps,
        OpenStreetMap: links.openStreetMap
      }),
      "",
      "Kliknij wybraną mapę i od razu otworzy się właściwa lokalizacja."
    ].join("\n");
  }

  function graphicsReply(prompt) {
    const normalized = safeMemory().normalizePolish(prompt);
    if (/kot|kota|cat/.test(normalized) && /lataj|skrzydl|flying/.test(normalized)) {
      return "Gotowe — generuję latającego kota w bardziej dopracowanej scenie premium. Jeśli chcesz, mogę też zrobić wersję memiczną, bajkową albo realistyczną.";
    }
    if (/meme|mema|mem/.test(normalized)) {
      return "Gotowe — tworzę mema z mocniejszą kompozycją, większym kontrastem i czytelnym układem. Jeśli chcesz, zrobię od razu drugi wariant.";
    }
    return "Działam — przygotowuję bardziej dopracowaną grafikę lokalnie i zaraz pokażę gotowy efekt.";
  }

  function longGeneralReply(prompt) {
    return `Jasne — mogę to rozwinąć konkretnie i bez lania wody.\n\nPowiedz tylko, czy chcesz:\n- szybką odpowiedź,\n- pełną wersję krok po kroku,\n- gotowy tekst do wklejenia,\n- albo wersję techniczną z kodem i strukturą plików.\n\nJeśli chcesz, mogę od razu przejść do rozwiązania na podstawie Twojej wiadomości: "${prompt}".`;
  }

  function playfulTextReply(prompt) {
    return `Jasne 😄\n\n${prompt}\n\nJeśli chcesz, mogę też zrobić 3 warianty: śmieszny, bardziej absurdalny albo totalnie memiczny.`;
  }

  function isCodingIntent(normalized, raw) {
    return hasAny(normalized, [
      /blad|błąd|error|exception|console|debug/,
      /python|javascript|typescript|html|css|react|node|api|sql|kod/,
      /\.bat\b|\.cmd\b|batch|powershell|\.ps1\b|bash|\.sh\b/,
      /\.json\b|\.js\b|\.ts\b|\.py\b|\.cpp\b|\.java\b/
    ]) || /```/.test(raw);
  }

  function buildReply({ input, model, location, weather }) {
    const text = safeMemory().cleanText(input);
    const normalized = safeMemory().normalizePolish(text);
    const meta = safeMemory().buildMeta(text);

    if (!text) return { text: "Napisz wiadomość, a od razu pomogę. 😊", meta };
    if (safeMemory().isGreeting(text)) return { text: greetingReply(text, location), meta };
    if (safeMemory().isEmojiOnly(text)) return { text: emojiReply(text), meta };

    const math = mathAnswer(text);
    if (math) return { text: `${math}! Dobre pytanie.`, meta };

    if (/pogoda|temperatura|czy pada|ile stopni/.test(normalized)) {
      return { text: weatherReply(location, weather), meta };
    }

    if (/mapa|gdzie|dojazd|google maps|nawigacj/.test(normalized)) {
      return { text: mapsReply(text, location), meta };
    }

    if (/szukaj|wyszukaj|google|internet|www|link|zrodl|źródl|research|web/.test(normalized)) {
      return { text: searchReply(text), meta };
    }

    if (/napisz mi|wymyśl|stworz tekst|napisz tekst|zrob tekst|zrób tekst/.test(normalized) && !isCodingIntent(normalized, text)) {
      return { text: playfulTextReply(text.replace(/^(napisz mi|wymyśl|stworz tekst|napisz tekst|zrob tekst|zrób tekst)\s*/i, "").trim() || text), meta };
    }

    if (isCodingIntent(normalized, text)) {
      return { text: codingReply(text, model), meta };
    }

    if (/obraz|grafik|meme|mema|mem|logo|baner|banner|kot|przerob|przerób|zdjec|zdjęc/.test(normalized) || model === "neo-vision") {
      return { text: graphicsReply(text), meta };
    }

    if (/hej|siema|heja/.test(normalized)) {
      return { text: greetingReply(text, location), meta };
    }

    return { text: longGeneralReply(text), meta };
  }

  return {
    buildReply
  };
})();
