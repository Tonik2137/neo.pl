window.NeoMemory = (() => {
  const typoMap = new Map([
    ["tka", "tak"],
    ["taak", "tak"],
    ["takk", "tak"],
    ["wewrsja", "wersja"],
    ["werjsa", "wersja"],
    ["wersj", "wersja"],
    ["pls", "prosze"],
    ["plsik", "prosze"],
    ["zrob", "zrob"],
    ["zrb", "zrob"],
    ["przerob", "przerob"],
    ["embedd", "embed"],
    ["dc", "discord"],
    ["ds", "discord"],
    ["kanal", "kanal"],
    ["guzik", "przycisk"],
    ["pelna", "pelna"],
    ["krokpokroku", "krok po kroku"],
    ["wszystkei", "wszystkie"],
    ["wsyztskie", "wszystkie"],
    ["wsyztsko", "wszystko"],
    ["nei", "nie"],
    ["nwm", "nie wiem"],
    ["siemaaa", "siema"],
    ["hejaa", "heja"],
    ["hejj", "hej"],
    ["skibidi", "skibidi"]
  ]);

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function normalizePolish(text) {
    let output = cleanText(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}\s/._:+-]/gu, " ")
      .replace(/\s+/g, " ");

    output = output
      .replace(/\bhee+j+\b/g, "hej")
      .replace(/\bsiema+a+\b/g, "siema")
      .replace(/\bsiemka+a+\b/g, "siemka")
      .replace(/\bta+k+\b/g, "tak")
      .replace(/\bnoo+\b/g, "no")
      .replace(/\bchcee+\b/g, "chce");

    output = output
      .split(" ")
      .map((word) => typoMap.get(word) || word)
      .join(" ");

    return output.trim();
  }

  function fuzzyIncludes(text, variants) {
    const normalized = normalizePolish(text);
    return variants.some((variant) => normalized.includes(normalizePolish(variant)));
  }

  function extractEmotionTokens(text) {
    const normalized = normalizePolish(text);
    const source = String(text || "");
    return {
      happy: /😊|😄|😀|😁|🥳|✨|🚀|❤️|❤|💖/u.test(source) || /\b(super|wow|brawo|heja|siema|siemka|yo)\b/.test(normalized),
      sad: /😢|😭|smutno|slabo|kiepsko|zle/.test(source + " " + normalized),
      angry: /😡|wkur|wsciek|cholera|kurde|zjeb|zly/.test(source + " " + normalized),
      love: /❤️|❤|💖/u.test(source) || /\b(koch|mega|milo)\b/.test(normalized),
      curious: /🤔|\?|jak|dlaczego|po co|co to/.test(source + " " + normalized),
      celebratory: /\b(urodzin|udalo sie|sukces|wygr|brawo|gratulacje|gratuluję|start10)\b/.test(normalized)
    };
  }

  function detectEmotionLabel(text) {
    const flags = extractEmotionTokens(text);
    if (flags.celebratory) return "swietowanie";
    if (flags.angry) return "gniew";
    if (flags.sad) return "smutek";
    if (flags.happy) return "radosc";
    if (flags.love) return "serdecznosc";
    if (flags.curious) return "ciekawosc";
    return "neutralne";
  }

  function isGreeting(text) {
    const normalized = normalizePolish(text);
    return /^(hej|heja|hejo|hejka|siema|siemka|siemanko|elo|czesc|yo|hello|hallo)[!.? ]*$/.test(normalized);
  }

  function isEmojiOnly(text) {
    const cleaned = cleanText(text);
    if (!cleaned) return false;
    return /^[\p{Emoji}\p{Extended_Pictographic}\s!?.,]+$/u.test(cleaned);
  }

  function detectTopic(text) {
    const normalized = normalizePolish(text);
    if (isGreeting(text)) return "Przywitanie";
    if (/\b(pogoda|temperatura|deszcz|slonce|mapa|dojazd|gdzie)\b/.test(normalized)) return "Lokalizacja i pogoda";
    if (/\b(kod|code|python|javascript|typescript|html|css|react|node|sql|api|blad|error|debug|discord|embed|weryfikacja|bat|powershell|bash)\b/.test(normalized)) return "Kodowanie";
    if (/\b(obraz|zdjec|grafik|meme|mem|logo|baner|przerob|kot)\b/.test(normalized)) return "Grafika";
    if (/\b(szukaj|wyszukaj|google|www|link|stron|internet|web)\b/.test(normalized)) return "Wyszukiwanie";
    if (isEmojiOnly(text)) return "Emocje";
    return "Rozmowa";
  }

  function describeMessage(text) {
    const normalized = normalizePolish(text);
    if (isGreeting(text)) return "Uzytkownik rozpoczyna rozmowe lub sie przywital.";
    if (/\b(pogoda|temperatura)\b/.test(normalized)) return "Uzytkownik pyta o pogode lub warunki.";
    if (/\b(mapa|gdzie|dojazd)\b/.test(normalized)) return "Uzytkownik chce link do lokalizacji lub mapy.";
    if (/\b(blad|error|exception|console|failed|debug)\b/.test(normalized)) return "Uzytkownik potrzebuje diagnozy bledu i gotowej poprawki.";
    if (/\b(obraz|grafik|meme|logo|baner|przerob)\b/.test(normalized)) return "Uzytkownik chce wygenerowac albo przerobic obraz.";
    if (/\b(szukaj|wyszukaj|google|www|link|internet|web)\b/.test(normalized)) return "Uzytkownik potrzebuje zrodel i linkow.";
    if (isEmojiOnly(text)) return "Uzytkownik wyslal sama emotke i oczekuje reakcji emocjonalnej.";
    return "Standardowa wiadomosc uzytkownika.";
  }

  function buildMeta(text, history = []) {
    const current = cleanText(text);
    const previous = Array.isArray(history) ? history.slice(-8).map((entry) => entry?.text || "").join(" ") : "";
    const combined = `${previous} ${current}`.trim();
    return {
      temat: detectTopic(current || combined),
      opis: describeMessage(current || combined),
      emocje: detectEmotionLabel(current || combined)
    };
  }

  return {
    cleanText,
    normalizePolish,
    fuzzyIncludes,
    extractEmotionTokens,
    detectEmotionLabel,
    isGreeting,
    isEmojiOnly,
    buildMeta
  };
})();
