window.NeoUIComponents = (() => {
  function menuIcon(name) {
    const icons = {
      upgrade: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
      paint: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3C7.03 3 3 6.69 3 11.25C3 13.64 4.1 15.8 5.9 17.3C6.58 17.87 7 18.72 7 19.62V20C7 20.55 7.45 21 8 21H9.44C10.65 21 11.63 20.02 11.63 18.81C11.63 18.23 11.4 17.67 10.98 17.26L10.7 16.98C10.32 16.59 10.11 16.07 10.11 15.52C10.11 14.39 11.02 13.48 12.15 13.48H13C17.42 13.48 21 10.06 21 5.85C21 4.28 19.72 3 18.15 3H12Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
      profile: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 11A4 4 0 1 0 12 3A4 4 0 0 0 12 11Z" stroke="currentColor" stroke-width="1.6"/></svg>',
      settings: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 0 0 12 8.5Z" stroke="currentColor" stroke-width="1.6"/><path d="M19.4 15A1.7 1.7 0 0 0 19.74 16.87L19.8 16.93A2 2 0 1 1 16.97 19.76L16.91 19.7A1.7 1.7 0 0 0 15.04 19.36A1.7 1.7 0 0 0 14 20.9V21A2 2 0 1 1 10 21V20.9A1.7 1.7 0 0 0 8.96 19.36A1.7 1.7 0 0 0 7.09 19.7L7.03 19.76A2 2 0 1 1 4.2 16.93L4.26 16.87A1.7 1.7 0 0 0 4.6 15A1.7 1.7 0 0 0 3.06 14H3A2 2 0 1 1 3 10H3.06A1.7 1.7 0 0 0 4.6 9A1.7 1.7 0 0 0 4.26 7.13L4.2 7.07A2 2 0 1 1 7.03 4.24L7.09 4.3A1.7 1.7 0 0 0 8.96 4.64A1.7 1.7 0 0 0 10 3.1V3A2 2 0 1 1 14 3V3.1A1.7 1.7 0 0 0 15.04 4.64A1.7 1.7 0 0 0 16.91 4.3L16.97 4.24A2 2 0 1 1 19.8 7.07L19.74 7.13A1.7 1.7 0 0 0 19.4 9A1.7 1.7 0 0 0 20.94 10H21A2 2 0 1 1 21 14H20.94A1.7 1.7 0 0 0 19.4 15Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
      logout: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 16L18 12L14 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M11 20H6A2 2 0 0 1 4 18V6A2 2 0 0 1 6 4H11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
    };
    return icons[name] || icons.settings;
  }

  return { menuIcon };
})();
