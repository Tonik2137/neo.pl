window.NeoSEO = (() => {
  function ensureMeta(name, content, attr = "name") {
    let node = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attr, name);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  }

  function ensureLink(rel, href) {
    let node = document.head.querySelector(`link[rel="${rel}"]`);
    if (!node) {
      node = document.createElement("link");
      node.rel = rel;
      document.head.appendChild(node);
    }
    node.href = href;
  }

  function init() {
    document.title = "NeoAI";
    ensureMeta("description", "NeoAI - czat AI z głosem, kodowaniem, analizą kontekstu i planami FREE, GO, PLUS, PRO.");
    ensureMeta("robots", "index,follow");
    ensureMeta("og:title", "NeoAI", "property");
    ensureMeta("og:description", "NeoAI - inteligentny czat z głosem i kodowaniem.", "property");
    ensureMeta("og:type", "website", "property");
    ensureMeta("og:url", window.location.origin, "property");
    ensureLink("canonical", window.location.origin + "/");
  }

  return { init };
})();
