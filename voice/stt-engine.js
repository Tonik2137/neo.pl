window.NeoSTT = (() => {
  function langCode(lang) {
    return lang === "de" ? "de-DE" : lang === "en" ? "en-US" : "pl-PL";
  }

  function enhanceRecognition(recognition, { lang, onStart, onEnd, onResult, onError }) {
    if (!recognition) return recognition;
    recognition.lang = langCode(lang);
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onstart = onStart;
    recognition.onend = onEnd;
    recognition.onresult = (event) => {
      const interim = Array.from(event.results).map((result) => result[0]?.transcript || "").join(" ").trim();
      onResult?.(event, interim);
    };
    recognition.onerror = onError;
    return recognition;
  }

  return {
    enhanceRecognition,
    langCode
  };
})();
