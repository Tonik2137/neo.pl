
    emailjs.init("WizosBKaIo6sNwho1");

    const STORAGE_KEYS = {
      users: "neo_ai_users_v2",
      session: "neo_ai_session_v2",
      chats: "neo_ai_chats_v2",
      prefs: "neo_ai_prefs_v2",
      codes: "neo_ai_codes_cache_v2",
      guest: "neo_ai_guest_v2",
      deviceId: "neo_ai_device_id_v1",
      deviceAccount: "neo_ai_device_account_v1",
      ipAccount: "neo_ai_ip_account_v1",
      geoCache: "neo_ai_geo_cache_v1"
    };

    const PLAN_RULES = {
      FREE: { dailyDataBytes: 50 * 1024, dailyScreens: 2, speed: 60, style: "lite" },
      GO: { dailyDataBytes: 250 * 1024, dailyScreens: 24, speed: 32, style: "pro" },
      PLUS: { dailyDataBytes: Infinity, dailyScreens: Infinity, speed: 14, style: "ultra" },
      PRO: { dailyDataBytes: Infinity, dailyScreens: Infinity, speed: 10, style: "ultra" }
    };

    const translations = {
      pl: {
        newChat: "Nowy czat",
        history: "Historia",
        emptyHistory: "Czat pojawi się tutaj dopiero po pierwszej wiadomości.",
        heroTitle: "Nad czym dziś pracujemy?",
        heroSubtitle: "Czysty widok czatu, lokalna pamięć rozmów i odpowiedzi zależne od Twojego planu.",
        emailLabel: "Adres e-mail",
        passwordLabel: "Hasło",
        googleContinue: "Kontynuuj z Google",
        continueBtn: "Dalej",
        sendCode: "Wyślij kod",
        resendCode: "Nie otrzymałeś kodu? Wyślij ponownie ({seconds}s)",
        otpPrompt: "Wpisz 6-cyfrowy kod",
        upgradePlan: "Upgrade plan",
        personalization: "Personalizacja",
        profile: "Profil",
        settings: "Ustawienia",
        logout: "Wyloguj się",
        freeDesc: "Neo-Lite, 2 screeny / 24h i 50 KB danych.",
        goDesc: "Neo-Pro i Neo-Vision oraz większy limit danych.",
        plusDesc: "Wszystkie modele premium, brak limitu plików i najwyższa szybkość.",
        proDesc: "Pełna moc NeoAI bez limitów danych.",
        buyNow: "Kup teraz",
        bonusCode: "Wykorzystaj kod",
        redeemCode: "Wykorzystaj kod",
        themeLabel: "Motyw",
        themeDark: "Ciemny",
        themeLight: "Oryginalny biały",
        languageLabel: "Język",
        usernameLabel: "Nazwa użytkownika",
        avatarLabel: "Zdjęcie profilowe",
        avatarInfo: "Zdjęcie profilowe zostanie zapamiętane na tym urządzeniu.",
        saveProfile: "Zapisz profil",
        cardInfo: "Podpięta karta",
        paymentHistory: "Historia płatności",
        planSource: "Status planu",
        authTitle: "Zaloguj się do NeoAI",
        authSubtitle: "Podaj e-mail, a wyślemy jednorazowy kod logowania.",
        authSent: "Kod wysłany na {email}, wygaśnie o {time}.",
        authError: "Nieprawidłowy kod weryfikacyjny.",
        emailSent: "Kod weryfikacyjny został wysłany na {email}.",
        resendSent: "Nowy kod został wysłany.",
        guestMode: "Tryb gościa aktywny.",
        localReady: "Silnik lokalny gotowy.",
        limitReached: "Osiągnąłeś dzienny limit danych dla planu FREE. Odnów limit za 24h lub przejdź na PRO.",
        upgradeLocked: "Zaloguj się, aby zarządzać planem.",
        profileSaved: "Profil został zapisany.",
        planBought: "Plan {plan} został aktywowany lokalnie na 30 dni.",
        codeActivated: "Kod aktywował plan {plan} na {days} dni.",
        codeInvalid: "Kod jest nieprawidłowy lub wygasł.",
        cardDefault: "•••• 4242 • Visa",
        paymentDefault: "Brak płatności do pokazania.",
        planSourceDefault: "Plan gotowy do użycia.",
        messagePlaceholder: "Wiadomość do NeoAI",
        currentPlan: "Aktualny plan: {plan}. Dzisiaj wykorzystano {used} z {limit} danych.",
        currentPlanUnlimited: "Aktualny plan: {plan}. Dzisiaj wykorzystano {used}. Limit danych: bez limitu.",
        profileLine: "{name} | {plan}",
        guestName: "guest",
        guestSubline: "Tryb lokalny",
        userSubline: "Konto lokalne",
        limitCounter: "{used} / {limit} dzisiaj",
        limitCounterUnlimited: "{used} dzisiaj • bez limitu danych",
        headerSubtitle: "Interfejs czatu z prywatną pamięcią rozmów i planami NeoAI.",
        registerTitle: "Zarejestruj konto NeoAI",
        registerSubtitle: "Podaj e-mail, a wyślemy kod tworzenia konta."
      },
      en: {
        newChat: "New chat",
        history: "History",
        emptyHistory: "A chat appears here only after the first message.",
        heroTitle: "What are we working on today?",
        heroSubtitle: "Clean chat view, local memory, and responses shaped by your plan.",
        emailLabel: "Email address",
        passwordLabel: "Password",
        googleContinue: "Continue with Google",
        continueBtn: "Continue",
        sendCode: "Send code",
        resendCode: "Didn't get the code? Resend ({seconds}s)",
        otpPrompt: "Enter the 6-digit code",
        upgradePlan: "Upgrade plan",
        personalization: "Personalization",
        profile: "Profile",
        settings: "Settings",
        logout: "Log out",
        freeDesc: "Neo-Lite, 2 screens / 24h and 50 KB of data.",
        goDesc: "Neo-Pro and Neo-Vision with a higher data limit.",
        plusDesc: "All premium models, no file limit, highest speed.",
        proDesc: "Full NeoAI power with no data limits.",
        buyNow: "Buy now",
        bonusCode: "Redeem bonus code",
        redeemCode: "Redeem code",
        themeLabel: "Theme",
        themeDark: "Dark",
        themeLight: "Original white",
        languageLabel: "Language",
        usernameLabel: "Username",
        avatarLabel: "Profile photo",
        avatarInfo: "Profile photo is stored on this device.",
        saveProfile: "Save profile",
        cardInfo: "Linked card",
        paymentHistory: "Payment history",
        planSource: "Plan status",
        authTitle: "Sign in to NeoAI",
        authSubtitle: "Enter your email and we will send a one-time sign-in code.",
        authSent: "Code sent to {email}, expires at {time}.",
        authError: "Invalid verification code.",
        emailSent: "Verification code was sent to {email}.",
        resendSent: "A new code was sent.",
        guestMode: "Guest mode active.",
        localReady: "Local engine ready.",
        limitReached: "You reached the daily data limit for the FREE plan. Renew in 24h or upgrade to PRO.",
        upgradeLocked: "Sign in to manage your plan.",
        profileSaved: "Profile saved.",
        planBought: "Plan {plan} was activated locally for 30 days.",
        codeActivated: "Code activated plan {plan} for {days} days.",
        codeInvalid: "The code is invalid or expired.",
        cardDefault: "•••• 4242 • Visa",
        paymentDefault: "No payments to show yet.",
        planSourceDefault: "Plan is ready to use.",
        messagePlaceholder: "Message NeoAI",
        currentPlan: "Current plan: {plan}. Used {used} of {limit} today.",
        currentPlanUnlimited: "Current plan: {plan}. Used {used} today. Data limit: unlimited.",
        profileLine: "{name} | {plan}",
        guestName: "guest",
        guestSubline: "Local mode",
        userSubline: "Local account",
        limitCounter: "{used} / {limit} today",
        limitCounterUnlimited: "{used} today • unlimited data",
        headerSubtitle: "Chat interface with private conversation memory and NeoAI plans.",
        registerTitle: "Create your NeoAI account",
        registerSubtitle: "Enter your email and we will send an account code."
      },
      de: {
        newChat: "Neuer Chat",
        history: "Verlauf",
        emptyHistory: "Ein Chat erscheint hier erst nach der ersten Nachricht.",
        heroTitle: "Woran arbeiten wir heute?",
        heroSubtitle: "Saubere Chat-Ansicht, lokaler Verlauf und Antworten passend zu deinem Tarif.",
        emailLabel: "E-Mail-Adresse",
        passwordLabel: "Passwort",
        googleContinue: "Mit Google fortfahren",
        continueBtn: "Weiter",
        sendCode: "Code senden",
        resendCode: "Keinen Code erhalten? Erneut senden ({seconds}s)",
        otpPrompt: "Gib den 6-stelligen Code ein",
        upgradePlan: "Upgrade Plan",
        personalization: "Personalisierung",
        profile: "Profil",
        settings: "Einstellungen",
        logout: "Abmelden",
        freeDesc: "Neo-Lite, 2 Screens / 24h und 50 KB Daten.",
        goDesc: "Neo-Pro und Neo-Vision mit höherem Datenlimit.",
        plusDesc: "Alle Premium-Modelle, kein Dateilimit, höchste Geschwindigkeit.",
        proDesc: "Volle NeoAI-Leistung ohne Datenlimit.",
        buyNow: "Jetzt kaufen",
        bonusCode: "Bonuscode einlösen",
        redeemCode: "Code aktivieren",
        themeLabel: "Thema",
        themeDark: "Dunkel",
        themeLight: "Original Weiß",
        languageLabel: "Sprache",
        usernameLabel: "Benutzername",
        avatarLabel: "Profilbild",
        avatarInfo: "Das Profilbild wird auf diesem Gerät gespeichert.",
        saveProfile: "Profil speichern",
        cardInfo: "Verknüpfte Karte",
        paymentHistory: "Zahlungsverlauf",
        planSource: "Tarifstatus",
        authTitle: "Bei NeoAI anmelden",
        authSubtitle: "Gib deine E-Mail ein und wir senden dir einen Einmal-Code.",
        authSent: "Code an {email} gesendet, gültig bis {time}.",
        authError: "Ungültiger Bestätigungscode.",
        emailSent: "Verifizierungscode wurde an {email} gesendet.",
        resendSent: "Ein neuer Code wurde gesendet.",
        guestMode: "Gastmodus aktiv.",
        localReady: "Lokale Engine bereit.",
        limitReached: "Du hast das tägliche Datenlimit des FREE-Tarifs erreicht. Warte 24h oder upgrade auf PRO.",
        upgradeLocked: "Melde dich an, um deinen Tarif zu verwalten.",
        profileSaved: "Profil wurde gespeichert.",
        planBought: "Plan {plan} wurde lokal für 30 Tage aktiviert.",
        codeActivated: "Code hat den Plan {plan} für {days} Tage aktiviert.",
        codeInvalid: "Der Code ist ungültig oder abgelaufen.",
        cardDefault: "•••• 4242 • Visa",
        paymentDefault: "Noch keine Zahlungen vorhanden.",
        planSourceDefault: "Plan ist einsatzbereit.",
        messagePlaceholder: "Nachricht an NeoAI",
        currentPlan: "Aktueller Tarif: {plan}. Heute wurden {used} von {limit} verbraucht.",
        currentPlanUnlimited: "Aktueller Tarif: {plan}. Heute wurden {used} verbraucht. Datenlimit: unbegrenzt.",
        profileLine: "{name} | {plan}",
        guestName: "guest",
        guestSubline: "Lokaler Modus",
        userSubline: "Lokales Konto",
        limitCounter: "{used} / {limit} heute",
        limitCounterUnlimited: "{used} heute • unbegrenzte Daten",
        headerSubtitle: "Chat-Oberfläche mit privatem Verlauf und NeoAI-Plänen.",
        registerTitle: "NeoAI Konto erstellen",
        registerSubtitle: "Gib deine E-Mail ein und wir senden einen Konto-Code."
      }
    };

    const state = {
      users: [],
      session: null,
      chats: {},
      prefs: { theme: "dark", lang: "pl", model: "neo-lite", speed: "balanced" },
      currentChatId: null,
      draftChat: true,
      responseBusy: false,
      pendingAttachment: null,
      otpCode: "",
      otpExpiry: 0,
      otpEmail: "",
      otpPassword: "",
      otpCooldown: 0,
      otpTimer: null,
      panelTab: "upgrade",
      codes: [],
      authMode: "login",
      googleInitialized: false,
      recognition: null,
      isListening: false,
      lastInputMode: "text",
      checkoutPlan: "PRO",
      checkoutMethod: "card",
      lightboxImage: "",
      location: null,
      weather: null
    };

    const el = {
      body: document.body,
      sidebar: document.getElementById("sidebar"),
      sidebarScrim: document.getElementById("sidebarScrim"),
      openSidebarBtn: document.getElementById("openSidebarBtn"),
      newChatBtn: document.getElementById("newChatBtn"),
      historyList: document.getElementById("historyList"),
      emptyHistory: document.getElementById("emptyHistory"),
      profileTrigger: document.getElementById("profileTrigger"),
      profilePopup: document.getElementById("profilePopup"),
      profileLine: document.getElementById("profileLine"),
      profileSubline: document.getElementById("profileSubline"),
      avatarFallback: document.getElementById("avatarFallback"),
      avatarImg: document.getElementById("avatarImg"),
      headerRank: document.getElementById("headerRank"),
      headerSubtitle: document.getElementById("headerSubtitle"),
      speedSelect: document.getElementById("speedSelect"),
      modelSelect: document.getElementById("modelSelect"),
      hero: document.getElementById("hero"),
      messages: document.getElementById("messages"),
      chatScroll: document.getElementById("chatScroll"),
      chatForm: document.getElementById("chatForm"),
      attachInput: document.getElementById("attachInput"),
      attachBtn: document.getElementById("attachBtn"),
      voiceBtn: document.getElementById("voiceBtn"),
      chatInput: document.getElementById("chatInput"),
      sendBtn: document.getElementById("sendBtn"),
      authModal: document.getElementById("authModal"),
      authTitle: document.getElementById("authTitle"),
      authSubtitle: document.getElementById("authSubtitle"),
      loginCategoryBtn: document.getElementById("loginCategoryBtn"),
      registerCategoryBtn: document.getElementById("registerCategoryBtn"),
      authEntryView: document.getElementById("authEntryView"),
      otpView: document.getElementById("otpView"),
      authEmail: document.getElementById("authEmail"),
      authPassword: document.getElementById("authPassword"),
      emailShield: document.getElementById("emailShield"),
      googleButtonHost: document.getElementById("googleButtonHost"),
      sendCodeBtn: document.getElementById("sendCodeBtn"),
      authStatus: document.getElementById("authStatus"),
      closeAuthBtn: document.getElementById("closeAuthBtn"),
      otpSummary: document.getElementById("otpSummary"),
      otpError: document.getElementById("otpError"),
      otpBoxes: Array.from(document.querySelectorAll(".otp-box")),
      otpResendBtn: document.getElementById("otpResendBtn"),
      panelBackdrop: document.getElementById("panelBackdrop"),
      panelTitle: document.getElementById("panelTitle"),
      panelSubtitle: document.getElementById("panelSubtitle"),
      closePanelBtn: document.getElementById("closePanelBtn"),
      panelTabs: Array.from(document.querySelectorAll(".tab-btn")),
      panelViews: Array.from(document.querySelectorAll("[data-panel-view]")),
      menuItems: Array.from(document.querySelectorAll(".menu-item[data-panel]")),
      logoutBtn: document.getElementById("logoutBtn"),
      currentPlanInfo: document.getElementById("currentPlanInfo"),
      buyButtons: Array.from(document.querySelectorAll("[data-buy-plan]")),
      bonusCodeInput: document.getElementById("bonusCodeInput"),
      redeemCodeBtn: document.getElementById("redeemCodeBtn"),
      upgradeStatus: document.getElementById("upgradeStatus"),
      settingsStatus: document.getElementById("settingsStatus"),
      cancelPlanBtn: document.getElementById("cancelPlanBtn"),
      themeOptions: Array.from(document.querySelectorAll(".theme-option")),
      langOptions: Array.from(document.querySelectorAll(".lang-option")),
      profileNameInput: document.getElementById("profileNameInput"),
      avatarUpload: document.getElementById("avatarUpload"),
      saveProfileBtn: document.getElementById("saveProfileBtn"),
      profileStatus: document.getElementById("profileStatus"),
      planSourceText: document.getElementById("planSourceText"),
      settingsEmailText: document.getElementById("settingsEmailText"),
      settingsRankText: document.getElementById("settingsRankText"),
      settingsPlanSourceText: document.getElementById("settingsPlanSourceText"),
      settingsExpiresText: document.getElementById("settingsExpiresText"),
      settingsCreatedText: document.getElementById("settingsCreatedText"),
      settingsAccountStatusText: document.getElementById("settingsAccountStatusText"),
      lightbox: document.getElementById("lightbox"),
      lightboxImage: document.getElementById("lightboxImage"),
      lightboxDownload: document.getElementById("lightboxDownload"),
      lightboxCloseBtn: document.getElementById("lightboxCloseBtn"),
      promoTopBanner: document.getElementById("promoTopBanner"),
      promoTopBannerClose: document.getElementById("promoTopBannerClose"),
      promoSidebarBox: document.getElementById("promoSidebarBox")
    };

    function t(key, params = {}) {
      let value = translations[state.prefs.lang]?.[key] ?? translations.pl[key] ?? key;
      for (const [param, content] of Object.entries(params)) {
        value = value.replaceAll(`{${param}}`, String(content));
      }
      return value;
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function setMenuItemLabel(button, label) {
      if (!button) return;
      const textNode = button.querySelector("span:last-child");
      if (textNode) textNode.textContent = label;
      else button.textContent = label;
    }

    function hydrateMenuIcons() {
      document.querySelectorAll(".menu-icon[data-icon]").forEach((node) => {
        const iconName = node.getAttribute("data-icon");
        node.innerHTML = window.NeoUIComponents?.menuIcon(iconName) || "";
      });
    }

    function storageLoad(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    }

    function storageSave(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error("storageSave error:", error);
        return false;
      }
    }

    function compactChatsForStorage(chats) {
      const compact = {};
      for (const [bucket, entries] of Object.entries(chats || {})) {
        compact[bucket] = (entries || []).map((chat) => ({
          ...chat,
          messages: (chat.messages || []).map((message) => {
            if (!message.attachment?.preview) return message;
            const preview = message.attachment.preview;
            const safePreview = preview.length > 180000 ? "" : preview;
            return {
              ...message,
              attachment: {
                ...message.attachment,
                preview: safePreview
              }
            };
          })
        }));
      }
      return compact;
    }

    function getOrCreateDeviceId() {
      let id = localStorage.getItem(STORAGE_KEYS.deviceId);
      if (!id) {
        id = `device_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
        localStorage.setItem(STORAGE_KEYS.deviceId, id);
      }
      return id;
    }

    function bindCurrentDeviceToEmail(email) {
      const bindings = storageLoad(STORAGE_KEYS.deviceAccount, {});
      bindings[getOrCreateDeviceId()] = canonicalizeEmail(email);
      storageSave(STORAGE_KEYS.deviceAccount, bindings);
    }

    function getBoundEmailForCurrentDevice() {
      const bindings = storageLoad(STORAGE_KEYS.deviceAccount, {});
      return canonicalizeEmail(bindings[getOrCreateDeviceId()] || "");
    }

    function bindIpToEmail(ip, email) {
      if (!ip) return;
      const bindings = storageLoad(STORAGE_KEYS.ipAccount, {});
      bindings[ip] = canonicalizeEmail(email);
      storageSave(STORAGE_KEYS.ipAccount, bindings);
    }

    function getBoundEmailForIp(ip) {
      if (!ip) return "";
      const bindings = storageLoad(STORAGE_KEYS.ipAccount, {});
      return canonicalizeEmail(bindings[ip] || "");
    }

    async function detectLocationAndWeather() {
      const cached = storageLoad(STORAGE_KEYS.geoCache, null);
      const cacheFresh = cached?.timestamp && (Date.now() - cached.timestamp) < 30 * 60 * 1000;
      if (cacheFresh) {
        state.location = cached.location || null;
        state.weather = cached.weather || null;
        return;
      }
      try {
        const geoRes = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        const geo = await geoRes.json();
        if (geo?.latitude && geo?.longitude) {
          state.location = {
            ip: geo.ip || "",
            city: geo.city || "Twojej okolicy",
            region: geo.region || "",
            country: geo.country_name || ""
          };
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m,weather_code&timezone=auto`, { cache: "no-store" });
          const weatherData = await weatherRes.json();
          state.weather = weatherData?.current || null;
          storageSave(STORAGE_KEYS.geoCache, {
            timestamp: Date.now(),
            location: state.location,
            weather: state.weather
          });
        }
      } catch {}
    }

    function weatherLabel(code) {
      return window.NeoChatLogic?.weatherLabel(code) || "stabilna pogoda";
    }

    function getPreferredVoice() {
      return window.NeoVoice?.getPreferredVoice(state.prefs.lang) || null;
    }

    async function digestText(text) {
      const bytes = new TextEncoder().encode(text);
      const hash = await crypto.subtle.digest("SHA-256", bytes);
      return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    function currentDateKey() {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    }

    function canonicalizeEmail(email) {
      return String(email || "").trim().toLowerCase();
    }

    function findUserByEmail(email) {
      const canonical = canonicalizeEmail(email);
      return state.users.find((user) => canonicalizeEmail(user.email) === canonical) || null;
    }

    function dedupeUsersByEmail(users) {
      const merged = new Map();
      for (const rawUser of users || []) {
        if (!rawUser?.email) continue;
        const email = canonicalizeEmail(rawUser.email);
        const existing = merged.get(email) || {};
        merged.set(email, {
          ...existing,
          ...rawUser,
          email,
          username: rawUser.username || rawUser.name || existing.username || email.split("@")[0],
          rank: rawUser.rank || existing.rank || getRankForEmail(email)
        });
      }
      return Array.from(merged.values());
    }

    function normalizeChatBuckets(chats) {
      const normalized = {};
      for (const [key, value] of Object.entries(chats || {})) {
        const targetKey = key === "__guest__" ? key : canonicalizeEmail(key);
        normalized[targetKey] = [...(normalized[targetKey] || []), ...(Array.isArray(value) ? value : [])];
      }
      return normalized;
    }

    function currentUser() {
      if (!state.session?.email) {
        const guest = storageLoad(STORAGE_KEYS.guest, {
          email: "",
          username: t("guestName"),
          plan: "FREE",
          rank: "GUEST",
          avatar: "",
          usage: { date: currentDateKey(), bytes: 0, screens: 0 },
          paymentHistory: [],
          cardInfo: t("cardDefault"),
          planSource: "guest"
        });
        ensureUsage(guest);
        return guest;
      }
      return findUserByEmail(state.session.email);
    }

    function isGuest() {
      return !state.session?.email;
    }

    function getRankForEmail(email) {
      const value = canonicalizeEmail(email);
      return value.endsWith("@neo.eu") || value.endsWith("@neoai.eu") ? "SECRET_ADMIN" : "USER";
    }

    function updateEmailShield() {
      const email = canonicalizeEmail(el.authEmail.value);
      if (!email) {
        el.emailShield.style.color = "var(--muted)";
        return;
      }
      if (email.endsWith("@neo.eu") || email.endsWith("@neoai.eu")) {
        el.emailShield.style.color = "#fbbf24";
        return;
      }
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email);
      el.emailShield.style.color = valid ? "var(--accent)" : "var(--danger)";
    }

    function ensureUsage(user) {
      if (!user.usage || user.usage.date !== currentDateKey()) {
        user.usage = { date: currentDateKey(), bytes: 0, screens: 0 };
      }
      if (typeof user.usage.bytes !== "number") {
        user.usage.bytes = typeof user.usage.count === "number" ? user.usage.count : 0;
      }
      if (typeof user.usage.screens !== "number") {
        user.usage.screens = 0;
      }
      return user.usage;
    }

    function getUsageBytes(user) {
      return ensureUsage(user).bytes;
    }

    function incrementUsage(user, bytes) {
      ensureUsage(user).bytes += bytes;
      persistCurrentUser(user);
    }

    function incrementScreens(user) {
      ensureUsage(user).screens += 1;
      persistCurrentUser(user);
    }

    function formatBytes(bytes) {
      const kb = bytes / 1024;
      if (kb < 1024) return `${kb.toFixed(1)} KB`;
      return `${(kb / 1024).toFixed(2)} MB`;
    }

    function getPlanRule(plan) {
      return PLAN_RULES[plan] || PLAN_RULES.FREE;
    }

    function persistUsers() {
      storageSave(STORAGE_KEYS.users, state.users);
    }

    function persistCurrentUser(user) {
      if (isGuest()) {
        storageSave(STORAGE_KEYS.guest, user);
        return;
      }
      user.email = canonicalizeEmail(user.email);
      const index = state.users.findIndex((entry) => canonicalizeEmail(entry.email) === user.email);
      if (index >= 0) state.users[index] = user;
      else state.users.push(user);
      persistUsers();
    }

    function getChatBucketKey() {
      return isGuest() ? "__guest__" : canonicalizeEmail(state.session.email);
    }

    function getUserChats() {
      return state.chats[getChatBucketKey()] || [];
    }

    function setUserChats(chats) {
      state.chats[getChatBucketKey()] = chats;
      if (!storageSave(STORAGE_KEYS.chats, state.chats)) {
        const compact = compactChatsForStorage(state.chats);
        state.chats = compact;
        storageSave(STORAGE_KEYS.chats, compact);
      }
    }

    function createChat() {
      const now = Date.now();
      return {
        id: `chat_${now}_${Math.random().toString(36).slice(2, 8)}`,
        title: "",
        description: "",
        createdAt: now,
        updatedAt: now,
        messages: []
      };
    }

    function getCurrentChat() {
      if (!state.currentChatId) return null;
      return getUserChats().find((chat) => chat.id === state.currentChatId) || null;
    }

    function saveChat(chat) {
      const chats = getUserChats();
      const index = chats.findIndex((item) => item.id === chat.id);
      if (index >= 0) chats[index] = chat;
      else chats.unshift(chat);
      setUserChats(chats);
    }

    function generateChatMeta(text) {
      return window.NeoChatLogic?.generateChatMeta(text, getCurrentChat()?.messages || [], state.prefs.lang) || {
        title: "Nowy czat",
        description: "Rozmowa rozpoczęta"
      };
    }

    function analyzeMessageContext(text) {
      return window.NeoChatLogic?.analyzeMessageContext(text, getCurrentChat()?.messages || []) || { temat: "Rozmowa", opis: "Standardowa wiadomość użytkownika.", emocje: "neutralne" };
    }

    function setStatus(text) {
      void text;
    }

    function setAuthStatus(type, text) {
      el.authStatus.className = `status-box ${type}`;
      el.authStatus.textContent = text;
      el.authStatus.classList.remove("hidden");
    }

    function hideAuthStatus() {
      el.authStatus.classList.add("hidden");
      el.authStatus.textContent = "";
    }

    function setPanelStatus(target, type, text) {
      target.className = `status-box ${type}`;
      target.textContent = text;
      target.classList.remove("hidden");
    }

    function formatDateTime(value) {
      if (!value) return "Brak danych";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "Brak danych";
      const locale = state.prefs.lang === "en" ? "en-US" : state.prefs.lang === "de" ? "de-DE" : "pl-PL";
      return date.toLocaleString(locale, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }

    function describePlanSource(source) {
      const sourceMap = {
        guest: "Plan gościa FREE",
        subscription: "Plan aktywny przez subskrypcję",
        code: "Plan aktywny przez kod bonusowy",
        local: "Plan nadany lokalnie",
        admin: "Plan nadany przez administratora"
      };
      return sourceMap[source] || t("planSourceDefault");
    }

    function updateTheme() {
      el.body.classList.toggle("theme-light", state.prefs.theme === "light");
      el.body.classList.toggle("theme-dark", state.prefs.theme !== "light");
      el.themeOptions.forEach((button) => button.classList.toggle("active", button.dataset.theme === state.prefs.theme));
    }

    function applyTranslations() {
      document.documentElement.lang = state.prefs.lang;
      document.querySelectorAll("[data-i18n]").forEach((node) => {
        const key = node.getAttribute("data-i18n");
        node.textContent = t(key);
      });
      el.chatInput.placeholder = t("messagePlaceholder");
      el.headerSubtitle.textContent = t("headerSubtitle");
      el.planSourceText.textContent = describePlanSource(currentUser().planSource);
      applyAuthMode(state.authMode);
      renderHistory();
      renderMessages();
      updateProfileUI();
      updateLimitUI();
      updateUpgradeInfo();
      updateSendCodeButton();
      el.menuItems.forEach((button) => {
        const panel = button.dataset.panel;
        if (panel === "upgrade") setMenuItemLabel(button, t("upgradePlan"));
        if (panel === "personalization") setMenuItemLabel(button, t("personalization"));
        if (panel === "profile") setMenuItemLabel(button, t("profile"));
        if (panel === "settings") setMenuItemLabel(button, t("settings"));
      });
      el.panelTabs.forEach((button) => button.textContent = t(button.dataset.panelTab === "upgrade" ? "upgradePlan" : button.dataset.panelTab));
    }

    function updateProfileUI() {
      const user = currentUser();
      const name = user.username || t("guestName");
      el.profileLine.textContent = t("profileLine", { name, plan: user.plan });
      el.profileSubline.textContent = isGuest() ? t("guestSubline") : (user.rank === "SECRET_ADMIN" ? "SECRET_ADMIN" : t("userSubline"));
      el.headerRank.textContent = user.rank === "SECRET_ADMIN" ? "SECRET_ADMIN" : user.plan;
      el.headerRank.style.color = user.rank === "SECRET_ADMIN" ? "#fbbf24" : "";
      setMenuItemLabel(el.logoutBtn, isGuest() ? "Zaloguj się" : "Wyloguj się");
      el.logoutBtn.classList.toggle("danger", !isGuest());
      el.profileNameInput.value = name;
      if (user.avatar) {
        el.avatarImg.src = user.avatar;
        el.avatarImg.classList.remove("hidden");
        el.avatarFallback.classList.add("hidden");
      } else {
        el.avatarImg.classList.add("hidden");
        el.avatarFallback.classList.remove("hidden");
      }
      updateUpgradeInfo();
      updateSettingsInfo();
      updateModelOptions();
      if (el.promoSidebarBox) {
        el.promoSidebarBox.innerHTML = user.plan === "PLUS" || user.plan === "PRO"
          ? `<strong>🎁 Plan aktywny</strong><span>Masz teraz <b>${escapeHtml(user.plan)}</b>. W Ustawieniach sprawdzisz źródło planu i datę końca.</span>`
          : `<strong>🎁 Masz kod?</strong><span>Wpisz <b>START10</b>, aby aktywować Plan Plus na 10 dni!</span>`;
      }
    }

    function updateSettingsInfo() {
      const user = currentUser();
      const email = isGuest() ? "guest" : (user.email || "Brak danych");
      const plan = user.plan || "FREE";
      const rank = user.rank || (isGuest() ? "GUEST" : "USER");
      const createdAt = user.createdAt || user.data_dolaczenia || null;
      const expiresAt = user.expiresAt || user["wygaśnięcie_planu"] || user["wygaśniÄ™cie_planu"] || null;
      const source = describePlanSource(user.planSource);
      el.settingsEmailText.textContent = email;
      el.settingsRankText.textContent = `${rank} • ${plan}`;
      el.settingsPlanSourceText.textContent = source;
      el.settingsExpiresText.textContent = expiresAt ? formatDateTime(expiresAt) : "Brak daty wygaśnięcia.";
      el.settingsCreatedText.textContent = createdAt ? formatDateTime(createdAt) : "Brak danych.";
      el.settingsAccountStatusText.textContent = isGuest() ? "Gość" : "Aktywne";
    }

    function getAllModelCatalog() {
      return [
        { value: "neo-lite", label: "Neo-Lite", minPlan: "FREE" },
        { value: "neo-pro", label: "Neo-Pro", minPlan: "GO" },
        { value: "neo-vision", label: "Neo-Vision", minPlan: "GO" },
        { value: "gpt-4o", label: "GPT-4o", minPlan: "PLUS" },
        { value: "claude-3.5-sonnet", label: "Claude-3.5-Sonnet", minPlan: "PLUS" },
        { value: "neo-coder-ultra", label: "Neo-Coder-Ultra", minPlan: "PLUS" },
        { value: "neo-4.0-voice", label: "Neo-4.0 Voice", minPlan: "PLUS" },
        { value: "neo-creative", label: "Neo-Creative", minPlan: "PLUS" }
      ];
    }

    function planLevel(plan) {
      return ["FREE", "GO", "PLUS", "PRO"].indexOf(plan);
    }

    function canAccessModel(plan, modelPlan) {
      return currentUser().rank === "SECRET_ADMIN" || planLevel(plan) >= planLevel(modelPlan);
    }

    function getModelOptionsForPlan(plan) {
      return getAllModelCatalog().filter((option) => canAccessModel(plan, option.minPlan));
    }

    function updateModelOptions() {
      const options = getModelOptionsForPlan(currentUser().plan);
      const current = state.prefs.model;
      el.modelSelect.innerHTML = options.map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`).join("");
      const hasCurrent = options.some((option) => option.value === current);
      state.prefs.model = hasCurrent ? current : options[0].value;
      el.modelSelect.value = state.prefs.model;
      storageSave(STORAGE_KEYS.prefs, state.prefs);
    }

    function updateLimitUI() {
      return currentUser();
    }

    function updateUpgradeInfo() {
      const user = currentUser();
      const rule = getPlanRule(user.plan);
      const used = formatBytes(getUsageBytes(user));
      const limit = Number.isFinite(rule.dailyDataBytes) ? formatBytes(rule.dailyDataBytes) : "";
      el.currentPlanInfo.textContent = Number.isFinite(rule.dailyDataBytes)
        ? t("currentPlan", { plan: user.plan, used, limit })
        : t("currentPlanUnlimited", { plan: user.plan, used });
    }

    function closeSidebar() {
      el.sidebar.classList.remove("open");
      el.sidebarScrim.classList.add("hidden");
    }

    function openSidebar() {
      el.sidebar.classList.add("open");
      el.sidebarScrim.classList.remove("hidden");
    }

    function toggleProfilePopup(force) {
      const open = force ?? el.profilePopup.classList.contains("hidden");
      el.profilePopup.classList.toggle("hidden", !open);
    }

    function openPanel(tab) {
      if (isGuest() && tab === "upgrade") {
        openAuthModal(t("upgradeLocked"));
        return;
      }
      state.panelTab = tab;
      el.panelBackdrop.classList.remove("hidden");
      el.panelBackdrop.querySelector(".panel")?.classList.toggle("fullscreen", tab === "upgrade");
      el.panelTabs.forEach((button) => button.classList.toggle("active", button.dataset.panelTab === tab));
      el.panelViews.forEach((view) => view.classList.toggle("hidden", view.dataset.panelView !== tab));
      toggleProfilePopup(false);
    }

    function closePanel() {
      el.panelBackdrop.classList.add("hidden");
    }

    function deleteChat(chatId) {
      const chats = getUserChats().filter((chat) => chat.id !== chatId);
      setUserChats(chats);
      if (state.currentChatId === chatId) {
        state.currentChatId = null;
        state.draftChat = true;
      }
      renderHistory();
      renderMessages();
    }

    function renderHistory() {
      const chats = [...getUserChats()].sort((a, b) => b.updatedAt - a.updatedAt);
      el.historyList.innerHTML = "";
      el.emptyHistory.classList.toggle("hidden", chats.length > 0);
      for (const chat of chats) {
        const item = document.createElement("li");
        item.className = "history-item";
        const button = document.createElement("button");
        button.className = `history-btn${chat.id === state.currentChatId && !state.draftChat ? " active" : ""}`;
        button.innerHTML = `<strong>${escapeHtml(chat.title || "Nowy czat")}</strong><span>${escapeHtml(chat.description || "")}</span>`;
        button.addEventListener("click", () => {
          state.currentChatId = chat.id;
          state.draftChat = false;
          renderHistory();
          renderMessages();
          if (window.innerWidth <= 940) closeSidebar();
        });
        const menuBtn = document.createElement("button");
        menuBtn.className = "history-menu-btn";
        menuBtn.type = "button";
        menuBtn.innerHTML = "⋯";
        menuBtn.setAttribute("aria-label", "Menu czatu");
        menuBtn.addEventListener("click", (event) => event.stopPropagation());
        menuBtn.addEventListener("mouseenter", () => menu.classList.add("open"));
        item.appendChild(button);
        item.appendChild(menuBtn);
        const menu = document.createElement("div");
        menu.className = "history-action-menu";
        item.addEventListener("mouseleave", () => menu.classList.remove("open"));
        menu.addEventListener("mouseleave", () => menu.classList.remove("open"));
        menu.addEventListener("click", (event) => event.stopPropagation());
        const removeBtn = document.createElement("button");
        removeBtn.className = "history-action";
        removeBtn.type = "button";
        removeBtn.textContent = "Usuń czat";
        removeBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          deleteChat(chat.id);
        });
        menu.appendChild(removeBtn);
        item.appendChild(menu);
        el.historyList.appendChild(item);
      }
    }

    function createUserAvatarMarkup() {
      const user = currentUser();
      if (user.avatar) {
        return `<div class="message-avatar"><img src="${user.avatar}" alt="avatar użytkownika" /></div>`;
      }
      return `<div class="message-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 11A4 4 0 1 0 12 3A4 4 0 0 0 12 11Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>`;
    }

    function createAiAvatarMarkup() {
      return `<div class="neo-logo message-avatar" style="width:40px;height:40px;" aria-hidden="true"><span></span></div>`;
    }

    function openLightbox(src, name = "neoai-image.jpg") {
      if (!src) return;
      el.lightboxImage.src = src;
      if (el.lightboxDownload) {
        el.lightboxDownload.href = src;
        el.lightboxDownload.download = name;
      }
      el.lightbox.classList.remove("hidden");
    }

    function closeLightbox() {
      el.lightbox.classList.add("hidden");
      el.lightboxImage.src = "";
      if (el.lightboxDownload) {
        el.lightboxDownload.href = "#";
      }
    }

    function formatAssistantMessage(text) {
      const safe = escapeHtml(text);
      const markdownLinks = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      const withLinks = markdownLinks.replace(/(^|[\s>])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
      const withCode = withLinks.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
      return withCode.split(/\n{2,}/).map((part) => {
        if (part.startsWith("<pre>")) return part;
        return `<p>${part.replace(/\n/g, "<br>")}</p>`;
      }).join("");
    }

    function attachCodeCopyButtons(container) {
      window.NeoUIEffects?.attachCodeCopyButtons(container);
    }

    function attachmentMarkup(attachment) {
      if (!attachment) return "";
      if (attachment.preview) {
        return `<button class="attachment-thumb" type="button" data-lightbox="${escapeHtml(attachment.preview)}" data-lightbox-name="${escapeHtml(attachment.name || "neoai-image.jpg")}"><img src="${escapeHtml(attachment.preview)}" alt="${escapeHtml(attachment.name || "screen")}" /></button>`;
      }
      return `<div class="attachment-chip">${escapeHtml(attachment.kind || "Plik")}: ${escapeHtml(attachment.name || "")}</div>`;
    }

    function renderAssistantBubbleText(text, attachment) {
      return `${attachmentMarkup(attachment)}${formatAssistantMessage(text)}`;
    }

    function createMessageNode(role, text, typing = false, meta = {}) {
      const article = document.createElement("article");
      article.className = `message ${role}`;
      const attachment = attachmentMarkup(meta.attachment);
      const avatar = role === "user" ? createUserAvatarMarkup() : createAiAvatarMarkup();
      article.innerHTML = `
        ${avatar}
        <div class="bubble">${attachment}${typing ? '<div class="typing"><span class="typing-grid"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span><strong>NeoAI tworzy odpowiedź/obraz...</strong></div>' : role === "assistant" ? renderAssistantBubbleText(text, null) : escapeHtml(text)}</div>
      `;
      const thumb = article.querySelector("[data-lightbox]");
      if (thumb) {
        thumb.addEventListener("click", () => openLightbox(thumb.dataset.lightbox, thumb.dataset.lightboxName || "neoai-image.jpg"));
      }
      if (role === "assistant" && !typing) {
        attachCodeCopyButtons(article);
      }
      return article;
    }

    function renderMessages() {
      const chat = getCurrentChat();
      const messages = chat?.messages || [];
      el.messages.innerHTML = "";
      el.hero.classList.toggle("hidden", messages.length > 0);
      for (const message of messages) {
        el.messages.appendChild(createMessageNode(message.role, message.text, false, { attachment: message.attachment }));
      }
      requestAnimationFrame(() => {
        el.chatScroll.scrollTop = el.chatScroll.scrollHeight;
      });
    }

    function appendMessage(message) {
      el.hero.classList.add("hidden");
      const node = createMessageNode(message.role, message.text, false, { attachment: message.attachment });
      el.messages.appendChild(node);
      el.chatScroll.scrollTop = el.chatScroll.scrollHeight;
      return node;
    }

    function buildReply(input) {
      return window.NeoChatLogic?.buildReply({
        input,
        model: el.modelSelect.value,
        lang: state.prefs.lang,
        location: state.location,
        weather: state.weather
      }) || { text: "Mam dla Ciebie coś ekstra! 😊" };
    }

    async function streamText(text, speed, onChunk) {
      const parts = String(text).split(/(\s+)/);
      let current = "";
      for (const part of parts) {
        current += part;
        onChunk(current);
        await new Promise((resolve) => setTimeout(resolve, part.trim() ? speed : 5));
      }
    }

    async function handleChatSubmit(event) {
      event.preventDefault();
      if (state.responseBusy) return;
      const input = el.chatInput.value.trim();
      if (!input && !state.pendingAttachment) return;

      if (window.NeoPromotions?.isStart10(input)) {
        if (isGuest()) {
          openAuthModal("Zaloguj się lub zarejestruj, aby aktywować START10.");
          return;
        }
        const user = currentUser();
        window.NeoPromotions.applyStart10(user);
        persistCurrentUser(user);
        updateProfileUI();
        updateLimitUI();
        updateUpgradeInfo();
        window.NeoVFX?.triggerFromText("START10 sukces");

        let promoChat = getCurrentChat();
        if (!promoChat) {
          promoChat = createChat();
          state.currentChatId = promoChat.id;
          state.draftChat = true;
        }
        if (state.draftChat) {
          const meta = generateChatMeta(input);
          promoChat.title = meta.title;
          promoChat.description = meta.description;
          state.draftChat = false;
        }

        const userMessage = { role: "user", text: input, analysis: analyzeMessageContext(input) };
        const assistantText = window.NeoPromotions.successMessage();
        const assistantMessage = { role: "assistant", text: assistantText, analysis: analyzeMessageContext(assistantText) };
        promoChat.messages.push(userMessage, assistantMessage);
        promoChat.updatedAt = Date.now();
        saveChat(promoChat);
        renderHistory();
        renderMessages();
        setStatus(assistantText);
        return;
      }

      const user = currentUser();
      const rule = getPlanRule(user.plan);
      const estimatedBytes = input.length * 2 + (state.pendingAttachment?.size || 0);
      if (Number.isFinite(rule.dailyDataBytes) && getUsageBytes(user) + estimatedBytes >= rule.dailyDataBytes) {
        setStatus(t("limitReached"));
        updateLimitUI();
        return;
      }
      if (state.pendingAttachment && Number.isFinite(rule.dailyScreens) && ensureUsage(user).screens >= rule.dailyScreens) {
        setStatus("W planie FREE wykorzystano już limit screenów na dziś.");
        return;
      }

      let typingNode = null;
      let assistantMessage = null;
      try {
        let chat = getCurrentChat();
        if (!chat) {
          chat = createChat();
          state.currentChatId = chat.id;
          state.draftChat = true;
        }

        if (state.draftChat) {
          const meta = generateChatMeta(input);
          chat.title = meta.title;
          chat.description = meta.description;
          state.draftChat = false;
        }

        const attachment = state.pendingAttachment;
        const userMessage = { role: "user", text: input || (attachment ? `[${attachment.kind}]` : ""), attachment, analysis: analyzeMessageContext(input || attachment?.name || "") };
        chat.messages.push(userMessage);
        chat.updatedAt = Date.now();
        saveChat(chat);
        renderHistory();
        appendMessage(userMessage);

        el.chatInput.value = "";
        el.chatInput.style.height = "auto";
        state.responseBusy = true;
        el.sendBtn.disabled = true;
        setStatus("NeoAI analizuje wiadomość...");
        window.NeoVFX?.triggerFromText(input);

        typingNode = createMessageNode("assistant", "", true);
        el.messages.appendChild(typingNode);
        el.chatScroll.scrollTop = el.chatScroll.scrollHeight;

        const speedMode = state.prefs.speed || "balanced";
        const thinkDelay = speedMode === "fast" ? 220 : speedMode === "deep" ? 900 : 480;
        await new Promise((resolve) => setTimeout(resolve, thinkDelay));
        const shouldGenerateImage = !attachment && window.NeoImageEngine?.isImageRequest(input, el.modelSelect.value);
        const shouldEditImage = !!attachment?.preview && window.NeoImageEngine?.isEditRequest(input || "");
        let assistantAttachment = null;
        const replyPayload = buildReply(input || attachment?.name || "");
        let reply = typeof replyPayload === "string" ? replyPayload : (replyPayload?.text || "Jasne — działam. 😊");
        const replyMeta = typeof replyPayload === "object" && replyPayload?.meta ? replyPayload.meta : analyzeMessageContext(reply);
        if (attachment) {
          if (shouldEditImage) {
            try {
              assistantAttachment = await window.NeoImageEngine.editImage(input || attachment.name, attachment, { model: el.modelSelect.value });
            } catch (imageEditError) {
              console.error("NeoImageEngine edit error:", imageEditError);
            }
            reply = assistantAttachment
              ? "Gotowe — przerobiłem obraz lokalnie w NeoAI Vision. Kliknij podgląd, żeby otworzyć go na cały ekran i pobrać gotową wersję."
              : "Nie udało się przerobić obrazu w tej chwili. Spróbuj krótszej komendy, na przykład: „przerób to na neonowy plakat”.";
          } else {
            reply = `Analizuję Twój screen... 🔍\n\nWidzę plik „${attachment.name}”. Mogę go opisać, wskazać problem, wyciągnąć tekst albo przerobić go wizualnie lokalnie w NeoAI.`;
          }
        } else if (shouldGenerateImage) {
          try {
            assistantAttachment = await window.NeoImageEngine.generateImage(input, { model: el.modelSelect.value });
          } catch (imageError) {
            console.error("NeoImageEngine error:", imageError);
          }
          reply = assistantAttachment
            ? "Gotowe — przygotowałem dla Ciebie wygenerowaną grafikę lokalnie w Neo-Vision. Jeśli chcesz, mogę teraz zrobić drugą wersję: bardziej premium, bardziej memiczną albo bardziej reklamową."
            : "Nie udało się wygenerować obrazu w tej chwili. Spróbuj inną scenę albo krótszy opis.";
        }
        typingNode.remove();
        typingNode = null;

        assistantMessage = { role: "assistant", text: "", attachment: assistantAttachment, analysis: replyMeta };
        chat.messages.push(assistantMessage);
        saveChat(chat);
        const node = appendMessage(assistantMessage);
        const bubble = node.querySelector(".bubble");
        const renderSpeed = speedMode === "fast" ? Math.max(8, rule.speed - 10) : speedMode === "deep" ? rule.speed + 12 : rule.speed;
        await streamText(reply, renderSpeed, (chunk) => {
          assistantMessage.text = chunk;
          bubble.innerHTML = renderAssistantBubbleText(chunk, assistantAttachment);
          attachCodeCopyButtons(node);
          el.chatScroll.scrollTop = el.chatScroll.scrollHeight;
        });

        incrementUsage(user, (userMessage.text.length + assistantMessage.text.length + (attachment?.size || 0) + (assistantAttachment?.size || 0)));
        if (attachment) incrementScreens(user);
        state.pendingAttachment = null;
        el.attachInput.value = "";
        chat.updatedAt = Date.now();
        saveChat(chat);
        renderHistory();
        updateLimitUI();
        updateUpgradeInfo();
        setStatus(t("localReady"));
        window.NeoEffects?.applyAuraMood(document.body, assistantMessage.analysis?.emocje || "neutralne");
        window.NeoVFX?.triggerFromText(`${input} ${assistantMessage.text}`);
        if (state.lastInputMode === "voice" || el.modelSelect.value === "neo-4.0-voice") {
          window.NeoVoice?.speakText(assistantMessage.text, state.prefs.lang);
          state.lastInputMode = "text";
        }
      } catch (error) {
        console.error("NeoAI chat error:", error);
        if (typingNode) {
          typingNode.remove();
        }
        const fallbackText = "Wystąpił błąd podczas generowania odpowiedzi. Spróbuj jeszcze raz — silnik został odblokowany.";
        const fallbackMessage = { role: "assistant", text: fallbackText, analysis: analyzeMessageContext(fallbackText) };
        appendMessage(fallbackMessage);
        setStatus(fallbackText);
      } finally {
        state.responseBusy = false;
        el.sendBtn.disabled = false;
      }
    }

    function newChat() {
      state.currentChatId = null;
      state.draftChat = true;
      el.messages.innerHTML = "";
      el.hero.classList.remove("hidden");
      renderHistory();
      setStatus(t("localReady"));
      el.chatInput.focus();
    }

    function openAuthModal(message = "") {
      el.authModal.classList.remove("hidden");
      el.authEntryView.classList.remove("hidden");
      el.otpView.classList.add("hidden");
      hideAuthStatus();
      el.otpError.classList.add("hidden");
      if (message) setAuthStatus("info", message);
    }

    function applyAuthMode(mode) {
      state.authMode = mode;
      const login = mode === "login";
      el.loginCategoryBtn.classList.toggle("active", login);
      el.registerCategoryBtn.classList.toggle("active", !login);
      el.authTitle.textContent = login ? t("authTitle") : t("registerTitle");
      el.authSubtitle.textContent = login ? t("authSubtitle") : t("registerSubtitle");
    }

    function closeAuthAsGuest() {
      state.session = null;
      storageSave(STORAGE_KEYS.session, null);
      storageSave(STORAGE_KEYS.guest, currentUser());
      el.authModal.classList.add("hidden");
      updateProfileUI();
      updateLimitUI();
      setStatus(t("guestMode"));
    }

    function formatExpiry(ts) {
      const locale = state.prefs.lang === "en" ? "en-US" : state.prefs.lang === "de" ? "de-DE" : "pl-PL";
      return new Date(ts).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
    }

    function updateSendCodeButton() {
      el.sendCodeBtn.textContent = state.otpCooldown > 0 ? `${t("continueBtn")} (${state.otpCooldown}s)` : t("continueBtn");
      el.sendCodeBtn.disabled = state.otpCooldown > 0;
      el.otpResendBtn.textContent = t("resendCode", { seconds: Math.max(state.otpCooldown, 0) });
    }

    function startOtpCooldown() {
      clearInterval(state.otpTimer);
      state.otpCooldown = 60;
      updateSendCodeButton();
      state.otpTimer = setInterval(() => {
        state.otpCooldown -= 1;
        updateSendCodeButton();
        if (state.otpCooldown <= 0) {
          clearInterval(state.otpTimer);
          state.otpTimer = null;
        }
      }, 1000);
    }

    function generateOtp() {
      return String(Math.floor(100000 + Math.random() * 900000));
    }

    async function sendOtp(isResend = false) {
      const email = canonicalizeEmail(el.authEmail.value);
      const password = el.authPassword.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email) || !password || state.otpCooldown > 0) return;

      state.otpEmail = email;
      state.otpPassword = password;
      state.otpCode = generateOtp();
      state.otpExpiry = Date.now() + 15 * 60 * 1000;
      const time = formatExpiry(state.otpExpiry);

      try {
        await emailjs.send("service_1o1uws1", "template_i2xcy7r", {
          to_email: email,
          passcode: state.otpCode,
          time
        });
      } catch (error) {
        console.error(error);
        setAuthStatus("error", "EmailJS error");
        return;
      }

      startOtpCooldown();
      setAuthStatus("info", isResend ? t("resendSent") : t("emailSent", { email }));
      el.authEntryView.classList.add("hidden");
      el.otpView.classList.remove("hidden");
      el.otpSummary.textContent = t("authSent", { email, time });
      el.otpBoxes.forEach((box) => {
        box.value = "";
        box.classList.remove("shake");
      });
      el.otpError.classList.add("hidden");
      el.otpBoxes[0].focus();
    }

    function shakeOtp() {
      el.otpBoxes.forEach((box) => {
        box.classList.remove("shake");
        void box.offsetWidth;
        box.classList.add("shake");
      });
    }

    function normalizeUser(email) {
      const canonicalEmail = canonicalizeEmail(email);
      const existing = findUserByEmail(canonicalEmail);
      if (existing) return existing;
      const username = canonicalEmail.split("@")[0];
      const rank = getRankForEmail(canonicalEmail);
      const user = {
        email: canonicalEmail,
        username,
        plan: rank === "SECRET_ADMIN" ? "PLUS" : "FREE",
        rank,
        passwordHash: "",
        avatar: "",
        usage: { date: currentDateKey(), bytes: 0, screens: 0 },
        paymentHistory: [],
        cardInfo: t("cardDefault"),
        planSource: "local",
        createdAt: new Date().toISOString(),
        expiresAt: null
      };
      state.users.push(user);
      persistUsers();
      return user;
    }

    async function verifyOtp() {
      const code = el.otpBoxes.map((box) => box.value).join("");
      if (Date.now() > state.otpExpiry || code !== state.otpCode) {
        el.otpError.textContent = t("authError");
        el.otpError.classList.remove("hidden");
        shakeOtp();
        return;
      }

      const user = normalizeUser(state.otpEmail);
      const passwordHash = await digestText(state.otpPassword);
      if (state.authMode === "login" && user.passwordHash && user.passwordHash !== passwordHash) {
        el.otpError.textContent = t("authError");
        el.otpError.classList.remove("hidden");
        shakeOtp();
        return;
      }
      user.passwordHash = passwordHash;
      state.session = { email: user.email };
      storageSave(STORAGE_KEYS.session, state.session);
      bindCurrentDeviceToEmail(user.email);
      bindIpToEmail(state.location?.ip, user.email);
      persistCurrentUser(user);
      el.authModal.classList.add("hidden");
      updateProfileUI();
      updateLimitUI();
      setStatus(t("localReady"));
    }

    function parseJwtCredential(token) {
      try {
        const payload = token.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
      } catch {
        return null;
      }
    }

    function handleGoogleCredential(response) {
      const payload = parseJwtCredential(response.credential || "");
      const email = canonicalizeEmail(payload?.email);
      if (!email) {
        setAuthStatus("error", "Google login error");
        return;
      }
      const user = normalizeUser(email);
      user.username = payload.name || user.username;
      user.avatar = payload.picture || user.avatar;
      user.rank = getRankForEmail(email);
      if (user.rank === "SECRET_ADMIN") user.plan = "PRO";
      persistCurrentUser(user);
      state.session = { email };
      storageSave(STORAGE_KEYS.session, state.session);
      bindCurrentDeviceToEmail(email);
      bindIpToEmail(state.location?.ip, email);
      updateProfileUI();
      el.authModal.classList.add("hidden");
      window.location.href = window.location.origin;
    }

    function initGoogleAuth() {
      if (state.googleInitialized) return;
      if (!window.google?.accounts?.id) {
        setTimeout(initGoogleAuth, 400);
        return;
      }
      window.google.accounts.id.initialize({
        client_id: "460383328898-a0f81tfskntch330bpk2susas7kfekhe.apps.googleusercontent.com",
        callback: handleGoogleCredential,
        ux_mode: "popup",
        auto_select: false
      });
      if (el.googleButtonHost) {
        el.googleButtonHost.innerHTML = "";
        window.google.accounts.id.renderButton(el.googleButtonHost, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "pill",
          width: 320
        });
        window.google.accounts.id.prompt();
      }
      state.googleInitialized = true;
    }

    function handleOtpInput(event) {
      const input = event.target;
      input.value = input.value.replace(/\D/g, "").slice(0, 1);
      const index = Number(input.dataset.otpIndex);
      if (input.value && index < el.otpBoxes.length - 1) {
        el.otpBoxes[index + 1].focus();
      }
      if (el.otpBoxes.every((box) => box.value.length === 1)) {
        verifyOtp();
      }
    }

    function handleOtpKeydown(event) {
      const index = Number(event.target.dataset.otpIndex);
      if (event.key === "Backspace" && !event.target.value && index > 0) {
        el.otpBoxes[index - 1].focus();
      }
    }

    async function loadCodes() {
      const cached = storageLoad(STORAGE_KEYS.codes, null);
      if (cached?.codes?.length) state.codes = cached.codes;
      try {
        const response = await fetch("./codes.json", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          state.codes = data.codes || [];
          storageSave(STORAGE_KEYS.codes, data);
        }
      } catch {
        if (!state.codes.length) {
          state.codes = [
            { Kod: "7AB13", Dni: 30, Plan: "PRO", Wygasniecie: "2026-12-31", max_users: 100, current_users: 0 },
            { Kod: "PLUS30", Dni: 30, Plan: "PLUS", Wygasniecie: "2026-12-31", max_users: 100, current_users: 0 },
            { Kod: "GO90", Dni: 90, Plan: "GO", Wygasniecie: "2026-12-31", max_users: 100, current_users: 0 }
          ];
        }
      }
      state.codes = state.codes.map((code) => ({ current_users: 0, max_users: Infinity, ...code }));
    }

    function applyPlan(user, plan, source, days = 30) {
      user.plan = plan;
      if (user.email) {
        user.rank = getRankForEmail(user.email);
      }
      user.planSource = source;
      user.expiresAt = new Date(Date.now() + days * 86400000).toISOString();
      persistCurrentUser(user);
      updateProfileUI();
      updateLimitUI();
      updateUpgradeInfo();
      applyTranslations();
    }

    function handleBuyPlan(plan) {
      if (isGuest()) {
        openAuthModal(t("upgradeLocked"));
        return;
      }
      if (plan === "FREE") {
        const user = currentUser();
        applyPlan(user, plan, "local", 30);
        setPanelStatus(el.upgradeStatus, "info", t("planBought", { plan }));
        return;
      }
      state.panelTab = "upgrade";
      el.bonusCodeInput.focus();
      setPanelStatus(el.settingsStatus, "info", `Aby aktywować plan ${plan}, wpisz poprawny kod.`);
    }

    function handleRedeemCode() {
      if (isGuest()) {
        openAuthModal(t("upgradeLocked"));
        return;
      }
      const raw = el.bonusCodeInput.value.trim().toUpperCase();
      if (window.NeoPromotions?.isStart10(raw)) {
        const user = currentUser();
        window.NeoPromotions.applyStart10(user);
        persistCurrentUser(user);
        updateProfileUI();
        updateLimitUI();
        updateUpgradeInfo();
        setPanelStatus(el.settingsStatus, "info", window.NeoPromotions.successMessage());
        window.NeoVFX?.triggerFromText("START10 sukces");
        return;
      }
      const match = state.codes.find((code) => code.Kod === raw && (!code.Wygasniecie || new Date(code.Wygasniecie).getTime() >= Date.now()) && code.current_users < code.max_users);
      const targetStatus = el.settingsStatus || el.upgradeStatus;
      if (!match) {
        setPanelStatus(targetStatus, "error", t("codeInvalid"));
        return;
      }
      const user = currentUser();
      match.current_users += 1;
      storageSave(STORAGE_KEYS.codes, { codes: state.codes });
      applyPlan(user, match.Plan, "code", match.Dni);
      setPanelStatus(targetStatus, "info", t("codeActivated", { plan: match.Plan, days: match.Dni }));
    }

    function handleCancelPlan() {
      if (isGuest()) {
        openAuthModal(t("upgradeLocked"));
        return;
      }
      const user = currentUser();
      user.plan = "FREE";
      user.planSource = "local";
      user.expiresAt = null;
      persistCurrentUser(user);
      updateProfileUI();
      updateLimitUI();
      updateUpgradeInfo();
      setPanelStatus(el.upgradeStatus, "info", "Plan został anulowany. Konto wróciło do FREE.");
    }

    function handleSaveProfile() {
      if (isGuest()) {
        openAuthModal(t("upgradeLocked"));
        return;
      }
      const user = currentUser();
      user.username = el.profileNameInput.value.trim() || user.username || "neo-user";
      persistCurrentUser(user);
      updateProfileUI();
      setPanelStatus(el.profileStatus, "info", t("profileSaved"));
    }

    function handleAvatarUpload(event) {
      const file = event.target.files?.[0];
      if (!file || isGuest()) return;
      const reader = new FileReader();
      reader.onload = () => {
        const user = currentUser();
        user.avatar = reader.result;
        persistCurrentUser(user);
        updateProfileUI();
      };
      reader.readAsDataURL(file);
    }

    function handleAttachmentSelect(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      const lower = file.name.toLowerCase();
      const description = lower.includes("error") ? "ekran błędu lub komunikatu systemowego" : lower.includes("dashboard") ? "panel z danymi lub dashboard" : "screen interfejsu, który mogę opisać";
      const reader = new FileReader();
      reader.onload = () => {
        state.pendingAttachment = {
          name: file.name,
          size: file.size || 0,
          kind: "Screen",
          description,
          preview: reader.result
        };
        setStatus(`Załączono screen: ${file.name}`);
      };
      reader.readAsDataURL(file);
    }

    function initVoiceRecognition() {
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition || state.recognition) return;
      state.recognition = new Recognition();
      window.NeoVoice?.enhanceRecognition(state.recognition, {
        lang: state.prefs.lang,
        onStart: () => {
          state.isListening = true;
          el.voiceBtn.classList.add("active");
          el.voiceBtn.innerHTML = '<span class="voice-indicator" aria-hidden="true"></span>';
          window.NeoEffects?.applyAuraMood(document.body, "listening");
          setStatus("Nasłuchuję wiadomości głosowej...");
        },
        onEnd: () => {
          state.isListening = false;
          el.voiceBtn.classList.remove("active");
          el.voiceBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3Z" stroke="currentColor" stroke-width="1.8"/><path d="M19 11.5C19 15.09 15.87 18 12 18C8.13 18 5 15.09 5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 18V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 21H16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
          window.NeoEffects?.applyAuraMood(document.body, "neutralne");
        },
        onResult: (speechEvent, transcript) => {
          el.chatInput.value = transcript;
          el.chatInput.dispatchEvent(new Event("input"));
          state.lastInputMode = "voice";
          setStatus("Wiadomość głosowa została przepisana.");
          const lastResult = speechEvent?.results?.[speechEvent.results.length - 1];
          if (lastResult?.isFinal) {
            setTimeout(() => el.chatForm.requestSubmit(), 120);
          }
        },
        onError: () => {
          setStatus("Nie udało się użyć rozpoznawania mowy.");
        }
      });
    }

    function toggleVoiceInput() {
      if (location.protocol !== "https:") {
        setStatus("Mikrofon wymaga HTTPS, aby poprosić o uprawnienia.");
        return;
      }
      initVoiceRecognition();
      if (!state.recognition) {
        setStatus("Ta przeglądarka nie wspiera Web Speech API.");
        return;
      }
      if (state.isListening) {
        state.recognition.stop();
      } else {
        state.recognition.lang = state.prefs.lang === "de" ? "de-DE" : state.prefs.lang === "en" ? "en-US" : "pl-PL";
        state.recognition.start();
      }
    }

    function validateCouponCode(rawCode) {
      if (typeof window.validateNeoCoupon === "function") {
        return window.validateNeoCoupon(rawCode, "PRO", currentUser(), state.codes);
      }
      const code = state.codes.find((entry) => entry.Kod === rawCode && entry.current_users < entry.max_users && (!entry.Wygasniecie || new Date(entry.Wygasniecie).getTime() >= Date.now()));
      return code || null;
    }

    function logout() {
      if (isGuest()) {
        openAuthModal();
        return;
      }
      state.session = null;
      storageSave(STORAGE_KEYS.session, null);
      storageSave(STORAGE_KEYS.guest, currentUser());
      toggleProfilePopup(false);
      updateProfileUI();
      updateLimitUI();
      setStatus(t("guestMode"));
    }

    function initState() {
      state.users = dedupeUsersByEmail(storageLoad(STORAGE_KEYS.users, []));
      persistUsers();
      state.session = storageLoad(STORAGE_KEYS.session, null);
      if (state.session?.email) {
        state.session.email = canonicalizeEmail(state.session.email);
        storageSave(STORAGE_KEYS.session, state.session);
      }
      if (!state.session?.email) {
        const boundEmail = canonicalizeEmail(getBoundEmailForCurrentDevice());
        if (boundEmail && findUserByEmail(boundEmail)) {
          state.session = { email: boundEmail };
          storageSave(STORAGE_KEYS.session, state.session);
        }
      }
      if (!state.session?.email) {
        const ipBoundEmail = canonicalizeEmail(getBoundEmailForIp(state.location?.ip));
        if (ipBoundEmail && findUserByEmail(ipBoundEmail)) {
          state.session = { email: ipBoundEmail };
          storageSave(STORAGE_KEYS.session, state.session);
        }
      }
      state.chats = compactChatsForStorage(normalizeChatBuckets(storageLoad(STORAGE_KEYS.chats, {})));
      storageSave(STORAGE_KEYS.chats, state.chats);
      state.prefs = storageLoad(STORAGE_KEYS.prefs, { theme: "dark", lang: "pl", model: "neo-lite", speed: "balanced" });
      el.modelSelect.value = state.prefs.model || "neo-lite";
      if (el.speedSelect) el.speedSelect.value = state.prefs.speed || "balanced";
      updateTheme();
      applyTranslations();
      updateProfileUI();
      updateLimitUI();
      if (el.promoTopBanner && window.NeoPromotions?.shouldShowWelcomeBanner()) {
        el.promoTopBanner.classList.remove("hidden");
      }
      if (isGuest()) openAuthModal();
      else el.authModal.classList.add("hidden");
    }

    el.openSidebarBtn.addEventListener("click", openSidebar);
    el.sidebarScrim.addEventListener("click", closeSidebar);
    el.newChatBtn.addEventListener("click", newChat);
    el.profileTrigger.addEventListener("click", () => toggleProfilePopup());
    document.addEventListener("click", (event) => {
      if (!el.profilePopup.contains(event.target) && !el.profileTrigger.contains(event.target)) {
        toggleProfilePopup(false);
      }
    });

    el.menuItems.forEach((button) => button.addEventListener("click", () => openPanel(button.dataset.panel)));
    el.logoutBtn.addEventListener("click", logout);
    el.closePanelBtn.addEventListener("click", closePanel);
    el.panelBackdrop.addEventListener("click", (event) => {
      if (event.target === el.panelBackdrop) closePanel();
    });

    el.panelTabs.forEach((button) => {
      button.addEventListener("click", () => openPanel(button.dataset.panelTab));
    });

    el.loginCategoryBtn.addEventListener("click", () => applyAuthMode("login"));
    el.registerCategoryBtn.addEventListener("click", () => applyAuthMode("register"));
    el.closeAuthBtn.addEventListener("click", closeAuthAsGuest);
    el.sendCodeBtn.addEventListener("click", () => sendOtp(false));
    el.otpResendBtn.addEventListener("click", () => sendOtp(true));
    el.authEmail.addEventListener("input", updateEmailShield);
    el.attachBtn.addEventListener("click", () => el.attachInput.click());
    el.attachInput.addEventListener("change", handleAttachmentSelect);
    el.voiceBtn.addEventListener("click", toggleVoiceInput);
    el.otpBoxes.forEach((box) => {
      box.addEventListener("input", handleOtpInput);
      box.addEventListener("keydown", handleOtpKeydown);
    });

    el.buyButtons.forEach((button) => button.addEventListener("click", () => handleBuyPlan(button.dataset.buyPlan)));
    el.redeemCodeBtn.addEventListener("click", handleRedeemCode);
    el.cancelPlanBtn.addEventListener("click", handleCancelPlan);
    el.saveProfileBtn.addEventListener("click", handleSaveProfile);
    el.avatarUpload.addEventListener("change", handleAvatarUpload);

    el.themeOptions.forEach((button) => {
      button.addEventListener("click", () => {
        state.prefs.theme = button.dataset.theme;
        storageSave(STORAGE_KEYS.prefs, state.prefs);
        updateTheme();
        el.themeOptions.forEach((entry) => entry.classList.toggle("active", entry.dataset.theme === state.prefs.theme));
      });
    });

    el.langOptions.forEach((button) => {
      button.addEventListener("click", () => {
        state.prefs.lang = button.dataset.lang;
        storageSave(STORAGE_KEYS.prefs, state.prefs);
        el.langOptions.forEach((entry) => entry.classList.toggle("active", entry.dataset.lang === state.prefs.lang));
        applyTranslations();
      });
    });

    function updateSpeed(value) {
      state.prefs.speed = value;
      storageSave(STORAGE_KEYS.prefs, state.prefs);
      if (el.speedSelect) el.speedSelect.value = value;
    }

    el.speedSelect?.addEventListener("change", () => updateSpeed(el.speedSelect.value));

    el.modelSelect.addEventListener("change", () => {
      state.prefs.model = el.modelSelect.value;
      storageSave(STORAGE_KEYS.prefs, state.prefs);
    });

    el.chatForm.addEventListener("submit", handleChatSubmit);
    el.chatInput.addEventListener("input", () => {
      el.chatInput.style.height = "auto";
      el.chatInput.style.height = `${Math.min(el.chatInput.scrollHeight, 180)}px`;
    });
    el.chatInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        el.chatForm.requestSubmit();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 940) closeSidebar();
    });

    el.lightbox.addEventListener("click", (event) => {
      if (event.target === el.lightbox) closeLightbox();
    });
    el.lightboxCloseBtn?.addEventListener("click", closeLightbox);
    el.promoTopBannerClose?.addEventListener("click", () => {
      el.promoTopBanner?.classList.add("hidden");
      window.NeoPromotions?.closeWelcomeBanner();
    });

    (async function init() {
      await loadCodes();
      await detectLocationAndWeather();
      hydrateMenuIcons();
      initState();
      initGoogleAuth();
      window.NeoSEO?.init();
      window.NeoUIEffects?.initSelectGlow?.([el.speedSelect, el.modelSelect]);
      window.NeoEffects?.applyAuraMood(document.body, "neutralne");
      setStatus(t("localReady"));
      renderHistory();
      renderMessages();
      el.themeOptions.forEach((entry) => entry.classList.toggle("active", entry.dataset.theme === state.prefs.theme));
      el.langOptions.forEach((entry) => entry.classList.toggle("active", entry.dataset.lang === state.prefs.lang));
      updateEmailShield();
    })();
  

