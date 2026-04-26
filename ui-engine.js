window.NeoUIEngine = (() => {
  // UI composition helpers for history cards and glass notification flows.

  function createHistoryItem({ chat, active, onOpen, onDelete }) {
    const item = document.createElement("li");
    item.className = "history-item";

    const button = document.createElement("button");
    button.className = `history-btn${active ? " active" : ""}`;
    button.innerHTML = `<strong>${escapeHtml(chat.title || "Nowy czat")}</strong><span>${escapeHtml(chat.description || "")}</span>`;
    button.addEventListener("click", onOpen);

    const menuWrap = document.createElement("div");
    menuWrap.className = "history-menu-wrap";

    const menuBtn = document.createElement("button");
    menuBtn.className = "history-menu-btn";
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-label", "Menu czatu");
    menuBtn.textContent = "⋮";
    menuBtn.addEventListener("click", (event) => event.stopPropagation());

    const menu = document.createElement("div");
    menu.className = "history-action-menu";
    menu.addEventListener("click", (event) => event.stopPropagation());

    const removeBtn = document.createElement("button");
    removeBtn.className = "history-action";
    removeBtn.type = "button";
    removeBtn.innerHTML = "<span class=\"history-trash-icon\" aria-hidden=\"true\"></span><span>Usuń czat</span>";
    removeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      item.classList.add("removing");
      window.setTimeout(() => onDelete?.(), 180);
    });

    menu.appendChild(removeBtn);
    menuWrap.appendChild(menuBtn);
    menuWrap.appendChild(menu);
    item.appendChild(button);
    item.appendChild(menuWrap);
    return item;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function notify(payload) {
    window.NeoNotifications?.push(payload);
  }

  function showWelcomeNotice(text) {
    notify({
      type: "success",
      title: "Kod z okazji startu 🎁",
      text,
      key: "welcome-start10"
    });
    return true;
  }

  return {
    createHistoryItem,
    notify,
    showWelcomeNotice
  };
})();
