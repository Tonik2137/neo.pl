/**
 * NeoAI Premium VFX Engine
 * canvas-confetti integration + emotion visual effects
 */
const NeoVFXEngine = (() => {
  const COLORS = ['#16c7ff', '#5b5fff', '#f146ff', '#fbbf24', '#22c55e', '#f43f5e'];

  /* ─── canvas-confetti burst ─── */
  function confettiBurst(options = {}) {
    if (typeof window.confetti !== 'function') {
      // fallback canvas implementation
      fallbackConfetti();
      return;
    }

    const defaults = {
      particleCount: 160,
      spread: 90,
      origin: { y: 0.32 },
      colors: COLORS,
      disableForReducedMotion: true
    };

    window.confetti({ ...defaults, ...options });
  }

  /* ─── Fallback confetti (no library) ─── */
  function fallbackConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.2 - 40,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 5,
      vy: 2 + Math.random() * 4,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 50 + Math.random() * 40
    }));

    let frame = 0;
    function tick() {
      frame++;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      pieces.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        p.vy += 0.06; p.life--;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.life / 90, 0);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (frame < 90) requestAnimationFrame(tick);
      else canvas.remove();
    }
    requestAnimationFrame(tick);
  }

  /* ─── Trigger confetti based on text ─── */
  function triggerFromText(text) {
    const value = String(text || '').toLowerCase();
    const triggers = [
      'urodziny', 'sukces', 'brawo', 'gratulacje', 'gratuluję',
      'udało się', 'udalo sie', 'boom', '🚀', '🎉', '🥳'
    ];

    const isBonusCode = /^(START10|B0PYS|GO90|PLUS30|7AB13)$/i.test(text.trim());

    if (triggers.some((t) => value.includes(t)) || isBonusCode) {
      confettiBurst({
        particleCount: isBonusCode ? 220 : 160,
        spread: isBonusCode ? 120 : 90,
        origin: { y: 0.32 },
        colors: isBonusCode
          ? ['#16c7ff', '#5b5fff', '#f146ff', '#fbbf24', '#22c55e', '#ffffff']
          : COLORS
      });

      if (isBonusCode) {
        // Double burst for bonus codes
        setTimeout(() => {
          confettiBurst({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6, x: 0.3 },
            colors: ['#fbbf24', '#f146ff', '#ffffff']
          });
        }, 300);
      }
      return true;
    }
    return false;
  }

  /* ─── Apply aura mood ─── */
  function applyAura(body, mood) {
    if (!body) return;
    const validMoods = ['neutralne', 'radość', 'świętowanie', 'gniew', 'smutek', 'empatia', 'irytacja', 'listening'];
    const aura = validMoods.includes(mood) ? mood : 'neutralne';
    body.dataset.aura = aura;

    // Update TTS emotion to match
    const emotionMap = {
      'gniew': 'gniew', 'irytacja': 'gniew',
      'smutek': 'smutek', 'empatia': 'smutek',
      'radość': 'radość', 'świętowanie': 'świętowanie'
    };
    window.__neoEmotion = emotionMap[aura] || 'radość';
  }

  /* ─── Success celebration for codes ─── */
  function celebrateCode(code) {
    confettiBurst({
      particleCount: 250,
      spread: 140,
      origin: { y: 0.28 },
      colors: ['#16c7ff', '#5b5fff', '#f146ff', '#fbbf24', '#22c55e', '#ffffff']
    });
    setTimeout(() => {
      confettiBurst({ particleCount: 120, spread: 80, origin: { y: 0.55, x: 0.5 } });
    }, 400);
    applyAura(document.body, 'świętowanie');
    setTimeout(() => applyAura(document.body, 'radość'), 6000);
  }

  return {
    confettiBurst,
    triggerFromText,
    applyAura,
    celebrateCode,
    fallbackConfetti
  };
})();

window.NeoVFXEngine = NeoVFXEngine;
