window.NeoEffects = (() => {
  function applyAuraMood(body, mood) {
    window.NeoVFX?.applyAura(body, mood || "neutral");
  }

  return {
    applyAuraMood
  };
})();
