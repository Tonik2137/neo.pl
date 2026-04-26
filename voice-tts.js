window.NeoVoiceTTS = (() => {
  // Unified speech layer: typing sounds, warm TTS voice selection, and STT wiring.

  function pickWarmVoice(lang) {
    return window.NeoTTS?.getPreferredVoice?.(lang) || null;
  }

  function speak(text, lang) {
    window.NeoVisualFX?.setSpeaking(true);
    window.NeoTTS?.speakText?.(text, lang);
    window.setTimeout(() => window.NeoVisualFX?.setSpeaking(false), Math.min(6000, Math.max(1800, String(text || "").length * 45)));
  }

  function configureRecognition(recognition, handlers) {
    return window.NeoSTT?.enhanceRecognition?.(recognition, handlers) || recognition;
  }

  function play(kind) {
    window.NeoAudio?.play?.(kind);
  }

  return {
    pickWarmVoice,
    speak,
    configureRecognition,
    play
  };
})();
