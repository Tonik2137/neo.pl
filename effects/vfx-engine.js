window.NeoVFX = (() => {
  function applyAura(body, mood) {
    if (!body) return;
    body.dataset.aura = mood || "neutral";
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function confettiBurst() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const colors = ["#16c7ff", "#5b5fff", "#f146ff", "#fbbf24", "#22c55e"];
    const pieces = Array.from({ length: 120 }, () => ({
      x: random(0, window.innerWidth),
      y: random(-40, window.innerHeight * 0.2),
      w: random(6, 12),
      h: random(10, 18),
      vx: random(-2.5, 2.5),
      vy: random(2, 6),
      r: random(0, Math.PI * 2),
      vr: random(-0.1, 0.1),
      color: colors[Math.floor(Math.random() * colors.length)],
      life: random(50, 90)
    }));

    let frame = 0;
    function tick() {
      frame += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      pieces.forEach((piece) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.r += piece.vr;
        piece.vy += 0.06;
        piece.life -= 1;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.r);
        ctx.fillStyle = piece.color;
        ctx.globalAlpha = Math.max(piece.life / 90, 0);
        ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
        ctx.restore();
      });

      if (frame < 90) requestAnimationFrame(tick);
      else canvas.remove();
    }

    requestAnimationFrame(tick);
  }

  function triggerFromText(text) {
    const value = String(text || "").toLowerCase();
    if (/urodziny|sukces|brawo|gratulacje|gratuluję|udalo sie|udało się/.test(value)) {
      if (typeof window.confetti === "function") {
        window.confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.32 },
          colors: ["#16c7ff", "#5b5fff", "#f146ff", "#fbbf24", "#22c55e"]
        });
      } else {
        confettiBurst();
      }
      return true;
    }
    return false;
  }

  return {
    applyAura,
    confettiBurst,
    triggerFromText
  };
})();
