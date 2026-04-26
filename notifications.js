window.NeoNotifications = (() => {
  const items = [];
  let host = null;

  function ensureHost() {
    if (host) return host;
    host = document.getElementById("notificationCenter");
    return host;
  }

  function icon(type) {
    if (type === "success") return "✓";
    if (type === "warning") return "!";
    if (type === "error") return "×";
    return "i";
  }

  function remove(id) {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) items.splice(index, 1);
    render();
  }

  function sameContent(a, b) {
    return a && b
      && String(a.type || "") === String(b.type || "")
      && String(a.title || "") === String(b.title || "")
      && String(a.text || "") === String(b.text || "");
  }

  function render() {
    const node = ensureHost();
    if (!node) return;
    node.innerHTML = items.slice(-5).map((item) => `
      <article class="notify-card ${item.type}" data-notify-id="${item.id}">
        <button class="notify-close" type="button" aria-label="Zamknij powiadomienie">×</button>
        <div class="notify-icon">${icon(item.type)}</div>
        <div class="notify-copy">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
        </div>
      </article>
    `).join("");

    node.querySelectorAll(".notify-close").forEach((button) => {
      button.addEventListener("click", (event) => {
        const article = event.currentTarget.closest("[data-notify-id]");
        if (!article) return;
        remove(article.getAttribute("data-notify-id"));
      });
    });
  }

  function push({ type = "info", title = "NeoAI", text = "", key = "" }) {
    const payload = { type, title, text, key, id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}` };
    const last = items[items.length - 1];
    if (last && (sameContent(last, payload) || (key && last.key === key))) {
      return;
    }
    const existingIndex = key ? items.findIndex((item) => item.key && item.key === key) : -1;
    if (existingIndex >= 0) items.splice(existingIndex, 1);
    items.push(payload);
    render();
  }

  function clear() {
    items.length = 0;
    render();
  }

  return { push, clear, render, remove };
})();
