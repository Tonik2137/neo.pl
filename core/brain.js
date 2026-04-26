window.NeoBrain = (() => {
  function safeMemory() {
    return window.NeoMemory;
  }

  function safeEndpoints() {
    return window.NeoEndpoints;
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

  function greetingReply(location) {
    const city = location?.city ? ` Jak Ci mija dzien w ${location.city}?` : " Jak Ci mija dzien?";
    return `Siemanko! Super, ze wpadles! 🚀${city} W czym mam Ci dzisiaj pomoc?`;
  }

  function emojiReply(input) {
    const text = String(input || "");
    if (/🚀|✨|🥳|😄|😀|😊/u.test(text)) return "Ale energia! 🚀 Lecimy z tym i zrobimy cos fajnego.";
    if (/❤️|❤|💖/u.test(text)) return "Ale milo! 💖 Jestem gotowy dzialac razem z Toba.";
    return "Widze dobry klimat 😄 Napisz tylko, co chcesz zrobic.";
  }

  function weatherReply(location, weather) {
    if (!weather) {
      const city = location?.city || "Twoja okolice";
      return `Nie mam teraz swiezych danych pogodowych dla ${city}. Moge od razu dac Ci link do pogody albo mapy.`;
    }
    const label = window.NeoChatLogic?.weatherLabel?.(Number(weather.weather_code)) || "stabilnie";
    const temperature = Math.round(Number(weather.temperature_2m));
    const city = location?.city || "Twojej okolicy";
    return `W ${city} jest dzis ${label} i okolo ${temperature}°C!`;
  }

  function inferCodeLanguage(prompt) {
    const normalized = safeMemory().normalizePolish(prompt);
    if (/(\.bat|\.cmd|batch|plik bat|skrypt bat)/.test(normalized)) return "bat";
    if (/(\.ps1|powershell)/.test(normalized)) return "powershell";
    if (/(\.sh|bash|shell)/.test(normalized)) return "bash";
    if (/(\.json|\bjson\b)/.test(normalized)) return "json";
    if (/(\.py|\bpython\b)/.test(normalized)) return "python";
    if (/(\.cpp|\.cc|\.cxx|c\+\+|\bcpp\b)/.test(normalized)) return "cpp";
    if (/(\.java|\bjava\b)/.test(normalized)) return "java";
    if (/(\.html|\bhtml\b|frontend)/.test(normalized)) return "html";
    if (/(\.css|\bcss\b)/.test(normalized)) return "css";
    if (/(\.sql|\bsql\b)/.test(normalized)) return "sql";
    if (/(\.ts|\btypescript\b)/.test(normalized)) return "typescript";
    return "javascript";
  }

  function codingReply(prompt, model) {
    const normalized = safeMemory().normalizePolish(prompt);
    const language = inferCodeLanguage(prompt);
    const wantsDiscordVerify = /discord|dc js|bot|embed|weryfikacja|verify|zweryfikuj/.test(normalized);

    if (wantsDiscordVerify) {
      return [
        "Masz gotowy szkic pod Discord.js z przyciskiem i prostym wynikiem matematycznym:",
        "```javascript",
        "const {",
        "  ActionRowBuilder,",
        "  ButtonBuilder,",
        "  ButtonStyle,",
        "  EmbedBuilder,",
        "  ModalBuilder,",
        "  TextInputBuilder,",
        "  TextInputStyle,",
        "  Events",
        "} = require('discord.js');",
        "",
        "function createVerificationMessage() {",
        "  const a = Math.floor(Math.random() * 5) + 1;",
        "  const b = Math.floor(Math.random() * 5) + 1;",
        "",
        "  const embed = new EmbedBuilder()",
        "    .setTitle('Weryfikacja użytkownika')",
        "    .setDescription(`Policz: ${a} + ${b}`)",
        "    .setColor(0x6d5dfc);",
        "",
        "  const button = new ButtonBuilder()",
        "    .setCustomId(`verify:${a}:${b}`)",
        "    .setLabel('Zweryfikuj')",
        "    .setStyle(ButtonStyle.Primary);",
        "",
        "  return {",
        "    embeds: [embed],",
        "    components: [new ActionRowBuilder().addComponents(button)]",
        "  };",
        "}",
        "",
        "client.on(Events.InteractionCreate, async (interaction) => {",
        "  if (interaction.isButton() && interaction.customId.startsWith('verify:')) {",
        "    const [, a, b] = interaction.customId.split(':');",
        "    const modal = new ModalBuilder()",
        "      .setCustomId(`verify-modal:${a}:${b}`)",
        "      .setTitle('Rozwiąż działanie');",
        "",
        "    const answerInput = new TextInputBuilder()",
        "      .setCustomId('verification-answer')",
        "      .setLabel(`Ile to ${a} + ${b}?`)",
        "      .setStyle(TextInputStyle.Short)",
        "      .setRequired(true);",
        "",
        "    modal.addComponents(new ActionRowBuilder().addComponents(answerInput));",
        "    await interaction.showModal(modal);",
        "  }",
        "",
        "  if (interaction.isModalSubmit() && interaction.customId.startsWith('verify-modal:')) {",
        "    const [, a, b] = interaction.customId.split(':');",
        "    const expected = Number(a) + Number(b);",
        "    const answer = Number(interaction.fields.getTextInputValue('verification-answer'));",
        "",
        "    if (answer !== expected) {",
        "      const member = interaction.member;",
        "      await interaction.reply({ content: 'Zly wynik. Zostajesz wyrzucony z serwera.', ephemeral: true });",
        "      if (member && member.kickable) await member.kick('Nieudana weryfikacja');",
        "      return;",
        "    }",
        "",
        "    await interaction.reply({ content: 'Weryfikacja zaliczona!', ephemeral: true });",
        "  }",
        "});",
        "```",
        "",
        model === "neo-coder-ultra"
          ? "Jesli chcesz, w nastepnym kroku rozbije Ci to na osobne pliki: komenda, events, utils i config."
          : "Jesli chcesz, dopisze od razu wersje pod konkretna strukture Twojego bota."
      ].join("\n");
    }

    const snippets = {
      bat: [
        "```bat",
        "@echo off",
        "setlocal EnableExtensions",
        "",
        "set \"USER_INPUT=%~1\"",
        "if \"%USER_INPUT%\"==\"\" (",
        "  echo Brak argumentu.",
        "  exit /b 1",
        ")",
        "",
        "echo Odebrano: %USER_INPUT%",
        "echo Gotowe.",
        "exit /b 0",
        "```"
      ].join("\n"),
      powershell: [
        "```powershell",
        "param(",
        "  [string]$InputValue",
        ")",
        "",
        "if ([string]::IsNullOrWhiteSpace($InputValue)) {",
        "  throw 'Brak argumentu.'",
        "}",
        "",
        "Write-Host \"Odebrano: $InputValue\"",
        "```"
      ].join("\n"),
      bash: [
        "```bash",
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        "INPUT=\"${1:-}\"",
        "if [ -z \"$INPUT\" ]; then",
        "  echo \"Brak argumentu.\"",
        "  exit 1",
        "fi",
        "echo \"Odebrano: $INPUT\"",
        "```"
      ].join("\n"),
      json: [
        "```json",
        "{",
        "  \"app\": \"NeoAI\",",
        "  \"mode\": \"production\",",
        "  \"enabled\": true",
        "}",
        "```"
      ].join("\n"),
      javascript: [
        "```javascript",
        "export function buildAnswer(input) {",
        "  const text = String(input ?? '').trim();",
        "  if (!text) return { ok: false, error: 'Brak danych wejściowych.' };",
        "  return { ok: true, value: text, createdAt: new Date().toISOString() };",
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
        "struct Result { bool ok; std::string value; };",
        "Result buildAnswer(const std::string& input) {",
        "  if (input.empty()) return { false, \"Brak danych wejściowych.\" };",
        "  return { true, input };",
        "}",
        "```"
      ].join("\n"),
      html: [
        "```html",
        "<section class=\"neo-card\">",
        "  <h1>NeoAI Studio</h1>",
        "  <button>Uruchom</button>",
        "</section>",
        "```"
      ].join("\n"),
      sql: [
        "```sql",
        "SELECT id, email, plan",
        "FROM users",
        "WHERE status = 'active';",
        "```"
      ].join("\n"),
      java: [
        "```java",
        "public final class BuildAnswer {",
        "  public static String run(String input) {",
        "    String text = input == null ? \"\" : input.trim();",
        "    if (text.isEmpty()) return \"Brak danych wejściowych.\";",
        "    return text;",
        "  }",
        "}",
        "```"
      ].join("\n"),
      css: [
        "```css",
        ".neo-button {",
        "  padding: 12px 16px;",
        "  border-radius: 14px;",
        "  background: linear-gradient(135deg, #16c7ff, #5b5fff, #f146ff);",
        "  color: #fff;",
        "}",
        "```"
      ].join("\n"),
      typescript: [
        "```typescript",
        "export type Answer = { ok: boolean; value: string };",
        "export function buildAnswer(input: unknown): Answer {",
        "  const text = String(input ?? '').trim();",
        "  if (!text) return { ok: false, value: 'Brak danych wejściowych.' };",
        "  return { ok: true, value: text };",
        "}",
        "```"
      ].join("\n")
    };

    const intro = /\b(error|blad|exception|console|typeerror|referenceerror|failed)\b/.test(normalized)
      ? "Widze blad techniczny. Najszybciej bedzie poprawic to tak:"
      : "Masz gotowy kod:";

    const extra = model === "neo-coder-ultra"
      ? "\n\nJesli chcesz, rozbije Ci to od razu na pliki, foldery, zaleznosci i plan wdrozenia."
      : "\n\nJesli chcesz, dopisze Ci od razu wersje pod Twoj projekt.";

    return `${intro}\n\n${snippets[language] || snippets.javascript}${extra}`;
  }

  function searchReply(prompt) {
    const query = safeEndpoints().extractSearchQuery(prompt) || prompt;
    const links = safeEndpoints().buildSearchLinks(query);
    return [
      `Znalazlem dla Ciebie gotowe miejsca do sprawdzenia tematu "${query}":`,
      safeEndpoints().asMarkdownLinks({
        Google: links.google,
        DuckDuckGo: links.duckduckgo,
        Bing: links.bing,
        Wikipedia: links.wikipedia
      }),
      "",
      "Kliknij link i od razu przejdziesz do wynikow w przegladarce."
    ].join("\n");
  }

  function mapsReply(prompt, location) {
    const place = safeEndpoints().extractMapQuery(prompt, location);
    const links = safeEndpoints().buildMapsLinks(place);
    return [
      `Jasne - przygotowalem mape dla: ${place}.`,
      safeEndpoints().asMarkdownLinks({
        "Google Maps": links.googleMaps,
        OpenStreetMap: links.openStreetMap
      })
    ].join("\n");
  }

  function graphicsReply(prompt) {
    const normalized = safeMemory().normalizePolish(prompt);
    if (/\b(kot|cat)\b/.test(normalized) && /\b(lataj|skrzydl|flying)\b/.test(normalized)) {
      return "Gotowe - przygotowuje latajacego kota w mocniejszej scenie premium.";
    }
    if (/\b(meme|mema|mem)\b/.test(normalized)) {
      return "Gotowe - tworze mema z czytelniejsza kompozycja i lepszym kontrastem.";
    }
    return "Dzialam - przygotowuje bardziej dopracowana grafike lokalnie.";
  }

  function textRequestReply(prompt) {
    return `Pewnie 😄\n\n${prompt}\n\nJesli chcesz, moge od razu zrobic 3 warianty: smieszny, bardziej premium albo totalnie memiczny.`;
  }

  function isCodingIntent(normalized, raw) {
    return /\b(blad|error|exception|console|debug|python|javascript|typescript|html|css|react|node|api|sql|kod|discord|embed|weryfikacja|verify|bat|powershell|bash|json)\b/.test(normalized)
      || /```/.test(raw)
      || /\.(bat|cmd|ps1|sh|json|js|ts|py|cpp|java|sql|html|css)\b/.test(normalized);
  }

  function followUpReply(input, history, model) {
    const normalized = safeMemory().normalizePolish(input);
    const recent = Array.isArray(history) ? history.slice(-6) : [];
    const recentUserText = recent.filter((msg) => msg.role === "user").map((msg) => msg.text || "").join(" ");
    const recentNorm = safeMemory().normalizePolish(recentUserText);

    if (/\b(tak|no|jasne|dokladnie|pelna wersja|pelna wersja krok po kroku|krok po kroku|tka chce|tak chce)\b/.test(normalized) && isCodingIntent(recentNorm, recentUserText)) {
      return codingReply(recentUserText, model);
    }

    return "";
  }

  function buildReply({ input, model, location, weather, history = [] }) {
    const text = safeMemory().cleanText(input);
    const normalized = safeMemory().normalizePolish(text);
    const meta = safeMemory().buildMeta(text, history);

    if (!text) return { text: "Napisz wiadomosc, a od razu pomoge. 😊", meta };
    if (safeMemory().isGreeting(text)) return { text: greetingReply(location), meta };
    if (safeMemory().isEmojiOnly(text)) return { text: emojiReply(text), meta };

    const followUp = followUpReply(text, history, model);
    if (followUp) return { text: followUp, meta };

    const math = mathAnswer(text);
    if (math) return { text: `${math}`, meta };

    if (/\b(urodziny|mam urodziny)\b/.test(normalized)) {
      return { text: "Sto lat! 🎉 Wszystkiego najlepszego i samych dobrych rzeczy. Chcesz, moge od razu napisac Ci zyczenia albo zrobic urodzinowa grafike.", meta };
    }

    if (/\b(pogoda|temperatura|czy pada|ile stopni)\b/.test(normalized)) return { text: weatherReply(location, weather), meta };
    if (/\b(mapa|gdzie|dojazd|google maps|nawigacj)\b/.test(normalized)) return { text: mapsReply(text, location), meta };
    if (/\b(szukaj|wyszukaj|google|internet|www|link|zrodl|research|web)\b/.test(normalized)) return { text: searchReply(text), meta };

    if (/\b(napisz mi|wymysl|stworz tekst|napisz tekst|zrob tekst)\b/.test(normalized) && !isCodingIntent(normalized, text)) {
      const cleaned = text.replace(/^(napisz mi|wymysl|stworz tekst|napisz tekst|zrob tekst)\s*/i, "").trim();
      return { text: textRequestReply(cleaned || text), meta };
    }

    if (isCodingIntent(normalized, text)) return { text: codingReply(text, model), meta };
    if (/\b(obraz|grafik|meme|mema|mem|logo|baner|banner|kot|przerob|zdjec)\b/.test(normalized) || model === "neo-vision") return { text: graphicsReply(text), meta };

    return { text: `Jasne - pomoge. Napisz dokladnie, co chcesz osiagnac, a przejde od razu do konkretu.`, meta };
  }

  return {
    buildReply
  };
})();
