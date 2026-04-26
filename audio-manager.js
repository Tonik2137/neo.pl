window.NeoAudio = (() => {
  let ctx = null;
  let lastTypeAt = 0;

  function ensureContext() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!ctx) ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }

  function tone({ frequency, duration = 0.08, type = "sine", gain = 0.03, delay = 0 }) {
    const audio = ensureContext();
    if (!audio) return;
    const now = audio.currentTime + delay;
    const osc = audio.createOscillator();
    const amp = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(gain, now + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(amp).connect(audio.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function play(kind) {
    if (kind === "type") {
      const now = Date.now();
      if (now - lastTypeAt < 45) return;
      lastTypeAt = now;
      tone({ frequency: 740, duration: 0.03, type: "square", gain: 0.015 });
      return;
    }
    if (kind === "success") {
      tone({ frequency: 880, duration: 0.12, type: "sine", gain: 0.035 });
      tone({ frequency: 1174, duration: 0.18, type: "sine", gain: 0.03, delay: 0.06 });
      tone({ frequency: 1480, duration: 0.14, type: "sine", gain: 0.022, delay: 0.12 });
      return;
    }
    if (kind === "warning") {
      tone({ frequency: 240, duration: 0.12, type: "triangle", gain: 0.04 });
      tone({ frequency: 210, duration: 0.18, type: "triangle", gain: 0.03, delay: 0.08 });
      return;
    }
    if (kind === "info") {
      tone({ frequency: 620, duration: 0.08, type: "sine", gain: 0.02 });
      tone({ frequency: 760, duration: 0.06, type: "sine", gain: 0.014, delay: 0.04 });
    }
  }

  return { play };
})();
