window.NeoImageEngine = (() => {
  let presetCache = null;
  let sceneCache = null;

  async function loadJson(path, fallback) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (response.ok) return await response.json();
    } catch {}
    return fallback;
  }

  async function loadPresets() {
    if (presetCache) return presetCache;
    presetCache = await loadJson("./image-presets.json", {
      styles: {
        default: { background: ["#16c7ff", "#5b5fff", "#f146ff"], panel: "rgba(8, 12, 24, 0.8)", accent: "#ffffff" },
        meme: { background: ["#0f172a", "#2563eb", "#d946ef"], panel: "rgba(10, 18, 32, 0.84)", accent: "#ffffff" },
        poster: { background: ["#111827", "#2563eb", "#ec4899"], panel: "rgba(15, 23, 42, 0.86)", accent: "#f8fafc" }
      }
    });
    return presetCache;
  }

  async function loadScenes() {
    if (sceneCache) return sceneCache;
    sceneCache = await loadJson("./image-scenes.json", {
      meme: {
        captions: {
          top: ["Kiedy mówisz zrób tylko jedną małą poprawkę"],
          bottom: ["a projekt nagle chce zostać aplikacją roku"]
        }
      }
    });
    return sceneCache;
  }

  function normalized(text) {
    return String(text || "")
      .toLowerCase()
      .replaceAll("ą", "a")
      .replaceAll("ć", "c")
      .replaceAll("ę", "e")
      .replaceAll("ł", "l")
      .replaceAll("ń", "n")
      .replaceAll("ó", "o")
      .replaceAll("ś", "s")
      .replaceAll("ź", "z")
      .replaceAll("ż", "z");
  }

  function isImageRequest(prompt, model) {
    const text = normalized(prompt);
    return model === "neo-vision" || /grafik|grafika|obraz|image|meme|mem|logo|baner|banner|plakat|poster|kot|cat|zdjec|zdjęc|przerob|przerób/.test(text);
  }

  function isEditRequest(prompt) {
    return /przerob|przerób|edytuj|edit|zmien|zmień|dodaj/.test(normalized(prompt));
  }

  function roundedRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, r);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function drawGradientBackground(ctx, width, height, colors) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    colors.forEach((color, index) => gradient.addColorStop(index / Math.max(colors.length - 1, 1), color));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function wrapText(ctx, text, maxWidth) {
    const words = String(text || "").split(/\s+/);
    const lines = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth) current = candidate;
      else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function drawCaption(ctx, text, x, y, maxWidth) {
    const lines = wrapText(ctx, String(text || "").toUpperCase(), maxWidth);
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "900 38px Impact, Arial Black, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#0b0e14";
    ctx.lineWidth = 8;
    lines.forEach((line, index) => {
      const lineY = y + index * 46;
      ctx.strokeText(line, x, lineY);
      ctx.fillText(line, x, lineY);
    });
    ctx.restore();
  }

  function drawWing(ctx, x, y, flip = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flip, 1);
    const gradient = ctx.createLinearGradient(-70, 0, 70, 0);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(1, "rgba(196,181,253,0.5)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(60, -50, 110, -10);
    ctx.quadraticCurveTo(70, 10, 20, 34);
    ctx.quadraticCurveTo(58, 20, 86, 54);
    ctx.quadraticCurveTo(35, 44, 0, 14);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawCat(ctx, x, y, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const bodyGradient = ctx.createLinearGradient(-80, -40, 100, 80);
    bodyGradient.addColorStop(0, "#f8fafc");
    bodyGradient.addColorStop(1, "#cbd5e1");

    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(0, 20, 90, 58, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, -40, 54, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-30, -72);
    ctx.lineTo(-8, -118);
    ctx.lineTo(12, -70);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(30, -72);
    ctx.lineTo(8, -118);
    ctx.lineTo(-12, -70);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.arc(-18, -44, 6, 0, Math.PI * 2);
    ctx.arc(18, -44, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-12, -18);
    ctx.quadraticCurveTo(0, -6, 12, -18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-38, -26);
    ctx.lineTo(-70, -32);
    ctx.moveTo(-38, -16);
    ctx.lineTo(-72, -10);
    ctx.moveTo(38, -26);
    ctx.lineTo(70, -32);
    ctx.moveTo(38, -16);
    ctx.lineTo(72, -10);
    ctx.stroke();

    ctx.strokeStyle = "#e879f9";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(78, 18);
    ctx.quadraticCurveTo(146, -14, 136, -76);
    ctx.stroke();

    ctx.restore();
  }

  function inferMemeTexts(prompt, scenes) {
    const text = normalized(prompt);
    if (/kot|cat/.test(text)) {
      return {
        top: "KIEDY PROSISZ O LATAJĄCEGO KOTA",
        bottom: "I NEOAI WRESZCIE DOWOZI COŚ NAPRAWDĘ ODLATUJĄCEGO"
      };
    }
    if (/debug|blad|error/.test(text)) {
      return {
        top: "KIEDY NAPRAWIASZ JEDEN BŁĄD",
        bottom: "A KOLEJNE DWA JUŻ CZEKAJĄ ZA ROGIEM"
      };
    }
    return {
      top: scenes?.meme?.captions?.top?.[0] || "KIEDY CHCESZ TYLKO SZYBKIEGO MEMA",
      bottom: scenes?.meme?.captions?.bottom?.[0] || "A NEOAI ROBI Z TEGO MAŁY SHOW"
    };
  }

  function renderMeme(ctx, width, height, prompt, scenes) {
    drawGradientBackground(ctx, width, height, ["#0f172a", "#2563eb", "#d946ef"]);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    roundedRectPath(ctx, 36, 36, width - 72, height - 72, 28);
    ctx.fill();

    drawWing(ctx, width / 2 - 110, height / 2 + 20, -1);
    drawWing(ctx, width / 2 + 110, height / 2 + 20, 1);
    drawCat(ctx, width / 2, height / 2 + 40, 1.15);

    const memeText = inferMemeTexts(prompt, scenes);
    drawCaption(ctx, memeText.top, width / 2, 82, width - 140);
    drawCaption(ctx, memeText.bottom, width / 2, height - 80, width - 140);
  }

  function renderPoster(ctx, width, height, prompt, style) {
    drawGradientBackground(ctx, width, height, style.background);
    ctx.fillStyle = style.panel;
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 2;
    roundedRectPath(ctx, 70, 80, width - 140, height - 160, 30);
    ctx.fill();
    ctx.stroke();

    drawWing(ctx, 244, 320, -1);
    drawWing(ctx, 716, 320, 1);
    drawCat(ctx, width / 2, 352, 1.3);

    const title = String(prompt || "NeoAI Vision").split(/\s+/).slice(0, 6).join(" ");
    ctx.fillStyle = style.accent;
    ctx.font = "700 58px Inter, Segoe UI, Arial";
    ctx.textAlign = "left";
    wrapText(ctx, title || "NeoAI Vision", width - 260).slice(0, 2).forEach((line, index) => {
      ctx.fillText(line, 110, 156 + index * 66);
    });

    ctx.font = "400 26px Inter, Segoe UI, Arial";
    wrapText(ctx, "Profesjonalna scena wygenerowana lokalnie z neonowym klimatem i mocniejszą kompozycją.", width - 280)
      .slice(0, 3)
      .forEach((line, index) => {
        ctx.fillText(line, 110, 254 + index * 38);
      });
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  async function editImage(prompt, attachment) {
    if (!attachment?.preview) return null;
    const image = await loadImage(attachment.preview);
    const width = 960;
    const height = 640;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    drawGradientBackground(ctx, width, height, ["#0f172a", "#2563eb", "#d946ef"]);

    const scale = Math.min((width - 120) / image.width, (height - 180) / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    ctx.save();
    roundedRectPath(ctx, drawX, drawY, drawWidth, drawHeight, 28);
    ctx.clip();
    ctx.filter = /retro|vintage/.test(normalized(prompt))
      ? "saturate(0.9) contrast(1.15) sepia(0.24)"
      : /jasniej|jaśniej|light/.test(normalized(prompt))
      ? "brightness(1.12) saturate(1.08)"
      : "contrast(1.1) saturate(1.1)";
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    ctx.fillStyle = "rgba(8, 12, 24, 0.56)";
    roundedRectPath(ctx, 40, height - 118, width - 80, 70, 22);
    ctx.fill();

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 30px Inter, Segoe UI, Arial";
    ctx.fillText("NeoAI Edit", 72, height - 74);
    ctx.font = "400 20px Inter, Segoe UI, Arial";
    ctx.fillText("Wersja przerobiona lokalnie z nowym klimatem i lepszym kontrastem.", 232, height - 74);

    const preview = canvas.toDataURL("image/jpeg", 0.88);
    return {
      kind: "Edycja AI",
      name: "neoai-edited-image.jpg",
      preview,
      description: `Przerobiony obraz dla: ${prompt}`,
      size: preview.length
    };
  }

  async function generateImage(prompt) {
    const presets = await loadPresets();
    const scenes = await loadScenes();
    const text = normalized(prompt);
    const style = /meme|mema|mem/.test(text) ? presets.styles.meme : presets.styles.poster || presets.styles.default;
    const width = 960;
    const height = 640;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    if (/meme|mema|mem|kot|cat/.test(text)) renderMeme(ctx, width, height, prompt, scenes);
    else renderPoster(ctx, width, height, prompt, style);

    const preview = canvas.toDataURL("image/jpeg", 0.88);
    return {
      kind: /meme|mema|mem/.test(text) ? "Mem AI" : "Obraz AI",
      name: /meme|mema|mem/.test(text) ? "neoai-meme.jpg" : "neoai-image.jpg",
      preview,
      description: `Wygenerowany obraz dla: ${prompt}`,
      size: preview.length
    };
  }

  return {
    isImageRequest,
    isEditRequest,
    generateImage,
    editImage
  };
})();
