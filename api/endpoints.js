window.NeoEndpoints = (() => {
  function cleanQuery(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function extractSearchQuery(text) {
    return cleanQuery(text)
      .replace(/^(szukaj|wyszukaj|znajdz|znajdź|research|google|sprawdz|sprawdź)\s*/i, "")
      .trim();
  }

  function extractMapQuery(text, location) {
    const cleaned = cleanQuery(text);
    const match = cleaned.match(/(?:mapa|gdzie|dojazd do|prowadź do|pokaz mi|pokaż mi)\s+(.+)/i);
    if (match?.[1]) return match[1].trim();
    const placeMatch = cleaned.match(/\bw\s+([A-ZĄĆĘŁŃÓŚŹŻ][\p{L}\-]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][\p{L}\-]+)*)/u);
    if (placeMatch?.[1]) return placeMatch[1].trim();
    return location?.city || "Polska";
  }

  function buildSearchLinks(query) {
    const value = encodeURIComponent(cleanQuery(query || "NeoAI"));
    return {
      google: `https://www.google.com/search?q=${value}`,
      duckduckgo: `https://duckduckgo.com/?q=${value}`,
      bing: `https://www.bing.com/search?q=${value}`,
      wikipedia: `https://pl.wikipedia.org/wiki/Special:Search?search=${value}`
    };
  }

  function buildMapsLinks(query) {
    const value = encodeURIComponent(cleanQuery(query || "Polska"));
    return {
      googleMaps: `https://www.google.com/maps/search/?api=1&query=${value}`,
      openStreetMap: `https://www.openstreetmap.org/search?query=${value}`
    };
  }

  function asMarkdownLinks(items) {
    return Object.entries(items)
      .map(([label, href]) => `- [${label}](${href})`)
      .join("\n");
  }

  return {
    cleanQuery,
    extractSearchQuery,
    extractMapQuery,
    buildSearchLinks,
    buildMapsLinks,
    asMarkdownLinks
  };
})();
