window.NeoImageEngine = (() => {
  let presetCache = null;

  async function loadPresets() {
    if (presetCache) return presetCache;
    try {
      const response = await fetch("./image-presets.json", { cache: "no-store" });
      if (response.ok) {
        presetCache = await response.json();
        return presetCache;
      }
    } catch {}
    presetCache = {
      styles: {
        default: {
          background: ["#0ea5e9", "#6366f1", "#d946ef"],
          panel: "rgba(8, 12, 24, 0.82)",
          accent: "#f8fafc",
          shape: "orb"
        }
      }
    };
    return presetCache;
  }

  function isImageRequest(prompt, model) {
    const text = String(prompt || "").toLowerCase();
    return model === "neo-vision" || /grafik|grafika|obraz|image|meme|mem|logo|baner|banner|plakat|poster|miniatur|thumbnail|okładk|cover|tapet|wallpaper/.test(text);
  }

  function pickStyle(prompt) {
    const text = String(prompt || "").toLowerCase();
    if (/meme|mem/.test(text)) return "meme";
    if (/logo|logotyp/.test(text)) return "logo";
    if (/baner|banner|okładk|cover|thumbnail/.test(text)) return "banner";
    return "default";
  }

  function splitPrompt(prompt) {
    const clean = String(prompt || "").replace(/\s+/g, " ").trim();
    const words = clean.split(" ");
    const title = words.slice(0, 6).join(" ").trim() || "NeoAI Vision";
    const subtitle = words.slice(6).join(" ").trim() || "Profesjonalna kompozycja wygenerowana lokalnie";
    return { title, subtitle };
  }

  function drawShape(ctx, shape, width, height) {
    ctx.save();
    ctx.globalAlpha = 0.26;
    if (shape === "hex") {
      ctx.translate(width * 0.76, height * 0.3);
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i;
        const x = Math.cos(angle) * 90;
        const y = Math.sin(angle) * 90;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    } else if (shape === "burst") {
      ctx.translate(width * 0.78, height * 0.28);
      for (let i = 0; i < 18; i += 1) {
        ctx.rotate(Math.PI / 9);
        ctx.fillRect(0, -6, 100, 12);
      }
    } else if (shape === "wave") {
      ctx.beginPath();
      ctx.moveTo(width * 0.45, height * 0.76);
      ctx.bezierCurveTo(width * 0.62, height * 0.48, width * 0.78, height * 0.98, width, height * 0.68);
      ctx.lineTo(width, height);
      ctx.lineTo(width * 0.45, height);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.3, 120, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  async function generateImage(prompt, options = {}) {
    const presets = await loadPresets();
    const styleKey = pickStyle(prompt);
    const style = presets.styles[styleKey] || presets.styles.default;
    const width = 1280;
    const height = 768;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    style.background.forEach((color, index) => {
      gradient.addColorStop(index / Math.max(style.background.length - 1, 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.arc(width * 0.18, height * 0.22, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.05)";
    drawShape(ctx, style.shape, width, height);

    ctx.fillStyle = style.panel;
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    const cardX = 70;
    const cardY = 90;
    const cardW = width - 140;
    const cardH = height - 180;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 28);
    ctx.fill();
    ctx.stroke();

    const { title, subtitle } = splitPrompt(prompt);
    ctx.fillStyle = style.accent;
    ctx.font = "700 64px Inter, Segoe UI, Arial";
    ctx.fillText(title.slice(0, 34), 120, 220);

    ctx.font = "400 30px Inter, Segoe UI, Arial";
    const subtitleLines = subtitle.match(/.{1,54}(\s|$)/g) || [subtitle];
    subtitleLines.slice(0, 3).forEach((line, index) => {
      ctx.fillText(line.trim(), 120, 290 + index * 46);
    });

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.beginPath();
    ctx.roundRect(120, height - 220, 240, 74, 18);
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.font = "700 26px Inter, Segoe UI, Arial";
    ctx.fillText("NEOAI VISION", 152, height - 174);

    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.beginPath();
    ctx.roundRect(width - 350, height - 250, 210, 140, 26);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width - 314, height - 155);
    ctx.lineTo(width - 252, height - 210);
    ctx.lineTo(width - 196, height - 165);
    ctx.lineTo(width - 142, height - 228);
    ctx.stroke();

    const preview = canvas.toDataURL("image/png");
    return {
      kind: "Obraz AI",
      name: `neo-vision-${styleKey}.png`,
      preview,
      description: `Wygenerowana grafika ${styleKey} dla: ${prompt}`,
      size: preview.length
    };
  }

  return {
    isImageRequest,
    generateImage
  };
})();
