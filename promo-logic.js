window.NeoPromo = (() => {
  // Promotion facade: keeps START10 logic centralized and always visible on refresh.

  function isPromoCode(value) {
    return window.NeoPromotions?.isStart10?.(value) || false;
  }

  function activateStart10(user) {
    return window.NeoPromotions?.applyStart10?.(user) || user;
  }

  function successMessage() {
    return window.NeoPromotions?.successMessage?.() || "Gratulacje! Kod aktywowany. Twój Plan Plus jest teraz aktywny przez 10 dni! 🚀";
  }

  function shouldShowBanner() {
    return true;
  }

  function dismissBanner() {
    return;
  }

  function welcomeText() {
    return "Witamy w NeoAI! Mamy nadzieję, że nasze AI naprawdę Ci pomoże. Wpisz kod START10 i zgarnij 10 dni Planu Plus! 🚀";
  }

  return {
    isPromoCode,
    activateStart10,
    successMessage,
    shouldShowBanner,
    dismissBanner,
    welcomeText
  };
})();
