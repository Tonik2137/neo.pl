window.NeoVisualFX = (() => {
  // Visual orchestration layer for aura, confetti, listening, and speaking states.

  function setMood(mood) {
    window.NeoEffects?.applyAuraMood?.(document.body, mood || "neutralne");
  }

  function triggerCelebration(text) {
    return window.NeoVFX?.triggerFromText?.(text) || false;
  }

  function setListening(active) {
    document.body.classList.toggle("voice-listening", Boolean(active));
    if (active) setMood("listening");
    else setMood("neutralne");
  }

  function setSpeaking(active) {
    document.body.classList.toggle("voice-speaking", Boolean(active));
  }

  function reactToEmotion(mood, text = "") {
    setMood(mood);
    if (/urodziny|start10|sukces|brawo|gratulacje/i.test(String(text || ""))) {
      triggerCelebration(text);
    }
  }

  return {
    setMood,
    setListening,
    setSpeaking,
    triggerCelebration,
    reactToEmotion
  };
})();
