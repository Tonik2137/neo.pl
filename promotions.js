window.NeoPromotions = (() => {
  const FIRST_BANNER_KEY = "neo_ai_start10_banner_closed_v1";

  function normalize(value) {
    return String(value || "").trim().toUpperCase();
  }

  function isStart10(value) {
    return normalize(value) === "START10";
  }

  function shouldShowWelcomeBanner() {
    return localStorage.getItem(FIRST_BANNER_KEY) !== "1";
  }

  function closeWelcomeBanner() {
    localStorage.setItem(FIRST_BANNER_KEY, "1");
  }

  function applyStart10(user) {
    if (!user) return null;
    user.plan = "PLUS";
    user.planSource = "code";
    user.expiresAt = new Date(Date.now() + 10 * 86400000).toISOString();
    return user;
  }

  function successMessage() {
    return "Kod START10 zaakceptowany! Twoje konto zostało ulepszone do Planu Plus na 10 dni. Ciesz się szybszym modelem i nowymi wizualizacjami! 🚀";
  }

  return {
    isStart10,
    applyStart10,
    successMessage,
    shouldShowWelcomeBanner,
    closeWelcomeBanner
  };
})();
