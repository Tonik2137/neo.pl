/**
 * NeoAI Premium Chat Engine
 * Handles chat submit, streaming, emotion hooks, promo detection
 */
const NeoChatEngine = (() => {
  /* ─── Emotion analysis from AI response text ─── */
  function analyzeResponseEmotion(text) {
    const t = String(text || '').toLowerCase();

    // Anger triggers
    const angerPatterns = [
      /nie mogę|nie mog[ęe]|nie wolno|narusz|zabronione|odmawiam|odmawia|nie wykonam/,
      /nie jestem w stanie|to niemożliwe|nie da się|zakaz/,
      /sprzeczność|błąd krytyczny|nieprawidłowe|niedozwolone/,
      /😡|😠|💢/
    ];
    if (angerPatterns.some((p) => p.test(t))) return 'gniew';

    // Sadness / empathy triggers
    const sadnessPatterns = [
      /przykro mi|żal mi|współczuję|rozumiem jak to jest/,
      /trudna sytuacja|ciężki czas|strata|smutek/,
      /jest mi przykro|czuję z tobą|wsparcie/,
      /😢|😭|💔|🥺/
    ];
    if (sadnessPatterns.some((p) => p.test(t))) return 'smutek';

    // Celebration triggers
    const celebrationPatterns = [
      /urodziny|wygrałeś|sukces|osiągnięcie|celebruj/,
      /🎉|🥳|🎊|🏆/
    ];
    if (celebrationPatterns.some((p) => p.test(t))) return 'świętowanie';

    // Joy / enthusiasm (default)
    const joyPatterns = [
      /super|świetnie|fantastycznie|wspaniale|genialnie/,
      /🚀|✨|😊|🎉|👏/
    ];
    if (joyPatterns.some((p) => p.test(t))) return 'radość';

    return 'radość'; // default
  }

  /* ─── Promo code detection ─── */
  function detectPromoCode(input) {
    const clean = String(input || '').trim().toUpperCase();
    const knownCodes = ['START10', 'B0PYS', 'GO90', 'PLUS30', '7AB13'];
    if (knownCodes.includes(clean)) return clean;
    if (/^[A-Z0-9]{5,10}$/.test(clean)) return clean; // generic code pattern
    return null;
  }

  /* ─── Check if text is a promo code request ─── */
  function isPromoRequest(input) {
    const t = String(input || '').trim();
    return detectPromoCode(t) !== null;
  }

  /* ─── Build promo response ─── */
  function buildPromoResponse(code, state) {
    if (code === 'START10') {
      return {
        text: 'Boom! Plan Plus aktywny! 🚀 Masz teraz 10 dni darmowego dostępu do wszystkich funkcji premium!',
        emotion: 'świętowanie',
        isPromo: true
      };
    }
    return {
      text: `Kod ${code} został przyjęty! Sprawdzam dostępność...`,
      emotion: 'radość',
      isPromo: true
    };
  }

  /* ─── Streaming text renderer ─── */
  async function streamText(text, speed, onChunk) {
    const parts = String(text).split(/(\s+)/);
    let current = '';
    for (const part of parts) {
      current += part;
      onChunk(current);
      await new Promise((resolve) => setTimeout(resolve, part.trim() ? speed : 5));
    }
  }

  /* ─── Apply emotion to UI after response ─── */
  function applyEmotion(text) {
    const emotion = analyzeResponseEmotion(text);
    window.NeoVFXEngine?.applyAura?.(document.body, emotion);

    // Return emotion for TTS
    return emotion;
  }

  /* ─── Pre-process user input for special cases ─── */
  function preProcessInput(input) {
    const t = String(input || '').trim();

    // Birthday mention triggers confetti
    if (/urodziny|urodzinki|birthday|geburtstag/i.test(t)) {
      window.NeoVFXEngine?.triggerFromText?.('urodziny');
    }

    // Any bonus code triggers confetti
    if (isPromoRequest(t)) {
      window.NeoVFXEngine?.celebrateCode?.(detectPromoCode(t));
    }

    return t;
  }

  /* ─── Post-process assistant response ─── */
  function postProcessResponse(text) {
    const emotion = applyEmotion(text);

    // Trigger confetti on celebration words in response too
    window.NeoVFXEngine?.triggerFromText?.(text);

    return { emotion, text };
  }

  return {
    analyzeResponseEmotion,
    detectPromoCode,
    isPromoRequest,
    buildPromoResponse,
    streamText,
    applyEmotion,
    preProcessInput,
    postProcessResponse
  };
})();

window.NeoChatEngine = NeoChatEngine;
