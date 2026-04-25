window.NeoVoice = (() => {
  function getPreferredVoice(lang) {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    const short = lang === "de" ? "de" : lang === "en" ? "en" : "pl";
    return voices.find((voice) => voice.lang.toLowerCase().startsWith(short) && /female|woman|natural|google/i.test(voice.name))
      || voices.find((voice) => voice.lang.toLowerCase().startsWith(short))
      || voices[0]
      || null;
  }

  function speakText(text, lang) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "de" ? "de-DE" : lang === "en" ? "en-US" : "pl-PL";
    const voice = getPreferredVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.rate = 1.02;
    utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
  }

  function enhanceRecognition(recognition, { lang, onStart, onEnd, onResult, onError }) {
    if (!recognition) return recognition;
    recognition.lang = lang === "de" ? "de-DE" : lang === "en" ? "en-US" : "pl-PL";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = onStart;
    recognition.onend = onEnd;
    recognition.onresult = onResult;
    recognition.onerror = onError;
    return recognition;
  }

  return {
    getPreferredVoice,
    speakText,
    enhanceRecognition
  };
})();
