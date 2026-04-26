window.NeoMemory = (() => {
  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function normalizePolish(text) {
    return cleanText(text)
      .toLowerCase()
      .replaceAll("ą", "a")
      .replaceAll("ć", "c")
      .replaceAll("ę", "e")
      .replaceAll("ł", "l")
      .replaceAll("ń", "n")
      .replaceAll("ó", "o")
      .replaceAll("ś", "s")
      .replaceAll("ź", "z")
      .replaceAll("ż", "z");
  }

  function extractEmotionTokens(text) {
    const source = String(text || "");
    return {
      happy: /😊|😄|😀|😁|🥳|✨|🚀|❤️|❤|💖|super|wow|brawo|heja|siema|siemka/i.test(source),
      love: /❤️|❤|💖|koch|mega/i.test(source),
      curious: /🤔|\?|jak|dlaczego|po co|co to/i.test(source),
      celebratory: /urodzin|udało się|sukces|wygr|brawo|super/i.test(source)
    };
  }

  function detectEmotionLabel(text) {
    const flags = extractEmotionTokens(text);
    if (flags.celebratory) return "świętowanie";
    if (flags.happy) return "radość";
    if (flags.love) return "serdeczność";
    if (flags.curious) return "ciekawość";
    return "neutralne";
  }

  function isGreeting(text) {
    return /^(hej|heja|hejo|hejka|siema+|siemka+|siemanko+|elo+|czesc+|cześć+|yo+|hello+|hallo+)[!.? ]*$/i.test(normalizePolish(text));
  }

  function isEmojiOnly(text) {
    const cleaned = cleanText(text);
    if (!cleaned) return false;
    return /^[\p{Emoji}\p{Extended_Pictographic}\s!?.,]+$/u.test(cleaned);
  }

  function detectTopic(text) {
    const normalized = normalizePolish(text);
    if (isGreeting(text)) return "Przywitanie";
    if (/pogoda|temperatura|deszcz|slonce|słońce|mapa|dojazd|gdzie/i.test(normalized)) return "Lokalizacja i pogoda";
    if (/kod|code|python|javascript|typescript|html|css|react|node|sql|api|blad|błąd|error|debug/i.test(normalized)) return "Kodowanie";
    if (/obraz|zdjec|zdjęc|grafik|meme|mem|logo|baner|przerob|przerób/i.test(normalized)) return "Grafika";
    if (/szukaj|wyszukaj|google|www|link|stron|internet|web/i.test(normalized)) return "Wyszukiwanie";
    if (isEmojiOnly(text)) return "Emocje";
    return "Rozmowa";
  }

  function describeMessage(text) {
    const normalized = normalizePolish(text);
    if (isGreeting(text)) return "Użytkownik rozpoczął rozmowę lub się przywitał.";
    if (/pogoda|temperatura/.test(normalized)) return "Użytkownik pyta o pogodę lub warunki.";
    if (/mapa|gdzie|dojazd/.test(normalized)) return "Użytkownik chce link do lokalizacji lub mapy.";
    if (/blad|błąd|error|exception|console|failed|debug/.test(normalized)) return "Użytkownik potrzebuje diagnozy błędu i gotowej poprawki.";
    if (/obraz|grafik|meme|logo|baner|przerob|przerób/.test(normalized)) return "Użytkownik chce wygenerować albo przerobić obraz.";
    if (/szukaj|wyszukaj|google|www|link|internet|web/.test(normalized)) return "Użytkownik potrzebuje źródeł i linków.";
    if (isEmojiOnly(text)) return "Użytkownik wysłał samą emotkę i oczekuje reakcji emocjonalnej.";
    return "Standardowa wiadomość użytkownika.";
  }

  function buildMeta(text, history = []) {
    const current = cleanText(text);
    const previous = Array.isArray(history) ? history.slice(-8).map((entry) => entry?.text || "").join(" ") : "";
    const combined = `${previous} ${current}`.trim();
    return {
      temat: detectTopic(combined || current),
      opis: describeMessage(current || combined),
      emocje: detectEmotionLabel(current || combined)
    };
  }

  return {
    cleanText,
    normalizePolish,
    extractEmotionTokens,
    detectEmotionLabel,
    isGreeting,
    isEmojiOnly,
    buildMeta
  };
})();
