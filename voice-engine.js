window.NeoVoice = (() => {
  function getPreferredVoice(lang) {
    return window.NeoTTS?.getPreferredVoice(lang) || null;
  }

  function speakText(text, lang) {
    return window.NeoTTS?.speakText(text, lang);
  }

  function enhanceRecognition(recognition, handlers) {
    return window.NeoSTT?.enhanceRecognition(recognition, handlers) || recognition;
  }

  return {
    getPreferredVoice,
    speakText,
    enhanceRecognition
  };
})();
