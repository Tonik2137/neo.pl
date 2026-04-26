window.NeoTTS = (() => {
  function langCode(lang) {
    return lang === "de" ? "de-DE" : lang === "en" ? "en-US" : "pl-PL";
  }

  function scoreVoice(voice, lang) {
    const name = String(voice?.name || "").toLowerCase();
    const voiceLang = String(voice?.lang || "").toLowerCase();
    const short = lang === "de" ? "de" : lang === "en" ? "en" : "pl";
    let score = 0;
    if (voiceLang.startsWith(short)) score += 40;
    if (/microsoft paulina|paulina|google polski|female|woman|anna|zosia|kasia|agata|ewa|maria|monika|samantha|victoria|zira|natural|aria/.test(name)) score += 56;
    if (/neural|online|natural|enhanced|premium/.test(name)) score += 20;
    if (/male|david|pawel|paweł|tomek/.test(name)) score -= 8;
    return score;
  }

  function getPreferredVoice(lang) {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    if (!voices.length) return null;
    return [...voices].sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))[0] || voices[0] || null;
  }

  function speakText(text, lang) {
    if (!("speechSynthesis" in window)) return;
    const content = String(text || "").trim();
    if (!content) return;
    window.speechSynthesis.cancel();
    const prepared = /^(hej|heja|hejka|siema|siemka)/i.test(content)
      ? content
      : `Hejka! Już sprawdzam to dla Ciebie. ${content}`;
    const utterance = new SpeechSynthesisUtterance(prepared);
    utterance.lang = langCode(lang);
    const voice = getPreferredVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.92;
    utterance.pitch = 1.16;
    utterance.volume = 1;
    setTimeout(() => window.speechSynthesis.speak(utterance), 160);
  }

  return {
    getPreferredVoice,
    speakText,
    langCode
  };
})();
