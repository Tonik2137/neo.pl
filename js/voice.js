/**
 * Neo-4.0 Voice Engine
 * Web Speech API (STT) + TTS with emotion-aware intonation
 */
const NeoVoiceEngine = (() => {
  let recognition = null;
  let isListening = false;
  let voicesLoaded = false;
  let voiceCache = {};

  /* ─── Language helpers ─── */
  function langCode(lang) {
    return lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-US' : 'pl-PL';
  }

  /* ─── Voice scoring: pick best female, human-like voice ─── */
  function scoreVoice(voice, lang) {
    const name = String(voice?.name || '').toLowerCase();
    const voiceLang = String(voice?.lang || '').toLowerCase();
    const short = lang === 'de' ? 'de' : lang === 'en' ? 'en' : 'pl';
    let score = 0;

    // Exact preferred voices
    if (name.includes('pl-pl-smhdev-2')) score += 300;
    if (name.includes('smhdev')) score += 150;
    if (name.includes('paulina')) score += 200;
    if (name.includes('microsoft paulina')) score += 250;

    // Language match
    if (voiceLang.startsWith(short)) score += 60;

    // Female indicators
    if (/female|woman|anna|zosia|kasia|agata|ewa|maria|monika|samantha|victoria|zira|aria/.test(name)) score += 80;
    if (/paulina|polski|polish|natasha/.test(name)) score += 70;

    // Neural / premium
    if (/neural|online|natural|enhanced|premium/.test(name)) score += 30;

    // Penalty male
    if (/male|david|pawel|paweł|tomek/.test(name)) score -= 15;

    return score;
  }

  function getPreferredVoice(lang) {
    const key = lang || 'pl';
    if (voiceCache[key]) return voiceCache[key];

    const voices = window.speechSynthesis?.getVoices?.() || [];
    if (!voices.length) return null;

    const sorted = [...voices].sort((a, b) => scoreVoice(b, key) - scoreVoice(a, key));
    voiceCache[key] = sorted[0] || voices[0];
    return voiceCache[key];
  }

  /* ─── TTS with emotion-aware intonation ─── */
  function speakText(text, lang, emotion = 'neutralne') {
    if (!('speechSynthesis' in window)) return;
    const content = String(text || '').trim();
    if (!content) return;

    window.speechSynthesis.cancel();

    // Emotion-aware prefix
    let prepared = content;
    if (/^(hej|heja|hejka|siema|siemka)/i.test(content)) {
      prepared = content;
    } else {
      prepared = `Hejka! Już sprawdzam to dla Ciebie. ${content}`;
    }

    const utterance = new SpeechSynthesisUtterance(prepared);
    utterance.lang = langCode(lang);

    const voice = getPreferredVoice(lang);
    if (voice) utterance.voice = voice;

    // Emotion-aware rate & pitch
    const emotionMap = {
      'gniew': { rate: 1.08, pitch: 0.9, volume: 1.0 },
      'irytacja': { rate: 1.05, pitch: 0.92, volume: 1.0 },
      'smutek': { rate: 0.82, pitch: 0.85, volume: 0.85 },
      'empatia': { rate: 0.86, pitch: 0.88, volume: 0.88 },
      'radość': { rate: 1.02, pitch: 1.18, volume: 1.0 },
      'świętowanie': { rate: 1.05, pitch: 1.22, volume: 1.0 },
      'listening': { rate: 0.92, pitch: 1.16, volume: 1.0 }
    };

    const cfg = emotionMap[emotion] || emotionMap['radość'];
    utterance.rate = cfg.rate;
    utterance.pitch = cfg.pitch;
    utterance.volume = cfg.volume;

    setTimeout(() => window.speechSynthesis.speak(utterance), 160);
  }

  /* ─── STT initialization ─── */
  function enhanceRecognition(recognitionInstance, { lang, onStart, onEnd, onResult, onError }) {
    if (!recognitionInstance) return null;
    recognitionInstance.lang = langCode(lang);
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = onStart;
    recognitionInstance.onend = onEnd;
    recognitionInstance.onresult = (event) => {
      const interim = Array.from(event.results)
        .map((r) => r[0]?.transcript || '')
        .join(' ')
        .trim();
      onResult?.(event, interim);
    };
    recognitionInstance.onerror = onError;
    return recognitionInstance;
  }

  /* ─── Emotion-aware speak wrapper ─── */
  function speakWithEmotion(text, lang, emotion) {
    speakText(text, lang, emotion || 'radość');
  }

  /* ─── Load voices eagerly ─── */
  function preloadVoices() {
    if (!window.speechSynthesis) return;
    const load = () => { voicesLoaded = true; getPreferredVoice('pl'); };
    window.speechSynthesis.onvoiceschanged = load;
    if (window.speechSynthesis.getVoices().length) load();
  }

  preloadVoices();

  return {
    langCode,
    getPreferredVoice,
    speakText,
    speakWithEmotion,
    enhanceRecognition,
    scoreVoice
  };
})();

window.NeoVoiceEngine = NeoVoiceEngine;
