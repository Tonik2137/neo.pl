window.NeoUIEffects = (() => {
  function attachCodeCopyButtons(container) {
    container.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-code-btn")) return;
      const button = document.createElement("button");
      button.className = "copy-code-btn";
      button.type = "button";
      button.textContent = "Kopiuj";
      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Skopiowano";
          setTimeout(() => { button.textContent = "Kopiuj"; }, 1200);
        } catch {
          button.textContent = "Błąd";
          setTimeout(() => { button.textContent = "Kopiuj"; }, 1200);
        }
      });
      pre.appendChild(button);
    });
  }

  function initSelectGlow(selects) {
    selects.forEach((select) => {
      if (!select) return;
      const refresh = () => {
        select.style.boxShadow = "0 0 0 1px rgba(91,95,255,.18), 0 0 18px rgba(91,95,255,.14)";
        select.style.background = "linear-gradient(135deg, rgba(22,199,255,.14), rgba(91,95,255,.18), rgba(241,70,255,.14))";
      };
      refresh();
      select.addEventListener("focus", refresh);
      select.addEventListener("change", refresh);
      select.addEventListener("mouseenter", refresh);
    });
  }

  return {
    attachCodeCopyButtons,
    initSelectGlow
  };
})();
