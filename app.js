const STORAGE_KEY_CONFIG = "bluvi_hurghada_config_v9";
const STORAGE_KEY_TRIPS = "bluvi_hurghada_trips_v9";
const STORAGE_KEY_LANG = "bluvi_hurghada_lang_v1";

let SITE_CONFIG = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    return saved ? { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) } : { ...DEFAULT_SITE_CONFIG };
  } catch (e) {
    return { ...DEFAULT_SITE_CONFIG };
  }
})();

let TRIPS_DATA = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TRIPS);
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_TRIPS_DATA));
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_TRIPS_DATA));
  }
})();

let currentState = {
  lang: localStorage.getItem(STORAGE_KEY_LANG) || "en",
  route: "home",
  homeFilter: "all",
  selectedTripId: null,
  booking: {
    guests: 2
  }
};

let lastFormattedBookingText = "";

function t(key) {
  const langPack = UI_TEXT[currentState.lang] || UI_TEXT.en;
  return langPack[key] || UI_TEXT.en[key] || key;
}

function getTripLocalized(trip) {
  const isDe = currentState.lang === "de";
  return {
    title: (isDe && trip.titleDe) ? trip.titleDe : trip.title,
    duration: (isDe && trip.durationDe) ? trip.durationDe : trip.duration,
    shortDesc: (isDe && trip.shortDescDe) ? trip.shortDescDe : trip.shortDesc,
    fullDesc: (isDe && trip.fullDescDe) ? trip.fullDescDe : trip.fullDesc,
    unitLabel: (isDe && trip.unitLabelDe) ? trip.unitLabelDe : trip.unitLabel
  };
}

function getCategoryMeta(category) {
  switch (category) {
    case "speedboats":
      return { label: t("catSpeedTitle"), icon: "fa-gauge-high" };
    case "islands":
      return { label: t("filterIslands"), icon: "fa-umbrella-beach" };
    case "sea":
      return { label: t("catSeaTitle"), icon: "fa-ship" };
    case "safari":
      return { label: t("catSafariTitle"), icon: "fa-sun" };
    default:
      return { label: "Hurghada", icon: "fa-compass" };
  }
}

function persistAllData() {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(SITE_CONFIG));
    localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(TRIPS_DATA));
  } catch (e) {
    console.warn("Storage warning:", e);
  }
  syncGlobalContactElements();
}

function setLanguage(lang) {
  currentState.lang = lang === "de" ? "de" : "en";
  try {
    localStorage.setItem(STORAGE_KEY_LANG, currentState.lang);
  } catch (e) {}
  document.documentElement.lang = currentState.lang;
  updateLanguageButtonsUI();
  syncGlobalContactElements();
  renderApp();
}

function updateLanguageButtonsUI() {
  const enBtn = document.getElementById("lang-btn-en");
  const deBtn = document.getElementById("lang-btn-de");
  if (enBtn) enBtn.classList.toggle("active-lang", currentState.lang === "en");
  if (deBtn) deBtn.classList.toggle("active-lang", currentState.lang === "de");

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt("top-rating-text", t("ratingBadge"));
  setTxt("top-follow-label", t("followUs"));
  setTxt("nav-home", t("navHome"));
  const spNav = document.querySelector("#nav-speedboats span");
  if (spNav) spNav.textContent = t("navSpeedboats");
  setTxt("nav-islands", t("navIslands"));
  setTxt("nav-sea", t("navSea"));
  setTxt("nav-safari", t("navSafari"));
  setTxt("nav-about", t("navAbout"));
  setTxt("nav-policy", t("navPolicy"));
  setTxt("nav-contact", t("navContact"));

  const setMNav = (id, val) => { const el = document.querySelector(`#${id} span`); if (el) el.textContent = val; };
  setMNav("mnav-home", t("navHome"));
  setMNav("mnav-speedboats", t("navSpeedboats"));
  setMNav("mnav-islands", t("navIslands"));
  setMNav("mnav-sea", t("navSea"));
  setMNav("mnav-safari", t("navSafari"));
  setMNav("mnav-about", t("navAbout"));
  setMNav("mnav-policy", t("navPolicy"));
  setMNav("mnav-contact", t("navContact"));

  setTxt("footer-col2-title", t("footerCol2"));
  setTxt("footer-col3-title", t("footerCol3"));
  setTxt("footer-col4-title", t("footerCol4"));
  setTxt("fnav-about", t("navAbout"));
  setTxt("fnav-speedboats", t("navSpeedboats"));
  setTxt("fnav-policy", t("navPolicy"));
  setTxt("fnav-contact", t("navContact"));
  setTxt("fbar-policy", t("navPolicy"));
  setTxt("fbar-contact", t("navContact"));
}

function applyCustomUserCode() {
  const existingHead = document.getElementById("bluvi-user-head-code");
  if (existingHead) existingHead.remove();
  if (SITE_CONFIG.customHeadCode && SITE_CONFIG.customHeadCode.trim()) {
    const div = document.createElement("div");
    div.id = "bluvi-user-head-code";
    div.innerHTML = SITE_CONFIG.customHeadCode;
    document.head.appendChild(div);
  }

  const existingBody = document.getElementById("bluvi-user-body-code");
  if (existingBody) existingBody.remove();
  if (SITE_CONFIG.customBodyCode && SITE_CONFIG.customBodyCode.trim()) {
    const div = document.createElement("div");
    div.id = "bluvi-user-body-code";
    div.innerHTML = SITE_CONFIG.customBodyCode;
    document.body.appendChild(div);
  }
}

function syncGlobalContactElements() {
  document.title = `${SITE_CONFIG.brandName} | Private Speedboats, Intro Dive, Red Sea Islands & Adventures`;

  const waMsg = encodeURIComponent(`Hello ${SITE_CONFIG.brandName}! I would like to inquire about a Speedboat or Hurghada excursion.`);
  const waBase = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  const waFull = `${waBase}?text=${waMsg}`;
  const mailHref = `mailto:${SITE_CONFIG.email}`;

  const topEmailLink = document.getElementById("top-email-link");
  const topEmailText = document.getElementById("top-email-text");
  if (topEmailLink) topEmailLink.href = mailHref;
  if (topEmailText) topEmailText.textContent = SITE_CONFIG.email;

  const topIg = document.getElementById("top-ig-link");
  const topTt = document.getElementById("top-tt-link");
  const topFb = document.getElementById("top-fb-link");
  const topMap1 = document.getElementById("top-gmaps-link");
  const topMap2 = document.getElementById("top-map-icon-link");
  if (topIg) topIg.href = SITE_CONFIG.instagramUrl;
  if (topTt) topTt.href = SITE_CONFIG.tiktokUrl;
  if (topFb) topFb.href = SITE_CONFIG.facebookUrl;
  if (topMap1) topMap1.href = SITE_CONFIG.googleMapsUrl;
  if (topMap2) topMap2.href = SITE_CONFIG.googleMapsUrl;

  if (SITE_CONFIG.customLogoUrl && SITE_CONFIG.customLogoUrl.trim() !== "") {
    const imgTag = `<img src="${SITE_CONFIG.customLogoUrl}" alt="${SITE_CONFIG.brandName}" class="h-12 sm:h-14 w-auto object-contain rounded-lg" />`;
    const hLogo = document.getElementById("header-logo-wrapper");
    const fLogo = document.getElementById("footer-logo-wrapper");
    if (hLogo) hLogo.innerHTML = imgTag;
    if (fLogo) fLogo.innerHTML = imgTag;
  }

  const fIg = document.getElementById("footer-ig-link");
  const fTt = document.getElementById("footer-tt-link");
  const fFb = document.getElementById("footer-fb-link");
  const fMapBtn = document.getElementById("footer-map-btn");
  const fMapLink = document.getElementById("footer-map-link");
  if (fIg) fIg.href = SITE_CONFIG.instagramUrl;
  if (fTt) fTt.href = SITE_CONFIG.tiktokUrl;
  if (fFb) fFb.href = SITE_CONFIG.facebookUrl;
  if (fMapBtn) fMapBtn.href = SITE_CONFIG.googleMapsUrl;
  if (fMapLink) fMapLink.href = SITE_CONFIG.googleMapsUrl;

  const fAddr = document.getElementById("footer-address-display");
  if (fAddr) fAddr.textContent = SITE_CONFIG.address;

  const fWaLink = document.getElementById("footer-wa-link");
  const fWaDisp = document.getElementById("footer-wa-display");
  if (fWaLink) fWaLink.href = waBase;
  if (fWaDisp) fWaDisp.textContent = SITE_CONFIG.whatsappDisplay;

  const fEmailLink = document.getElementById("footer-email-link");
  const fEmailDisp = document.getElementById("footer-email-display");
  if (fEmailLink) fEmailLink.href = mailHref;
  if (fEmailDisp) fEmailDisp.textContent = SITE_CONFIG.email;

  const fCopy = document.getElementById("footer-copyright");
  if (fCopy) fCopy.innerHTML = `&copy; 2026 ${SITE_CONFIG.brandName} (bluvihurghada.com). All rights reserved. Hurghada, Red Sea, Egypt.`;

  const floatEmailBtn = document.getElementById("float-email-btn");
  if (floatEmailBtn) {
    floatEmailBtn.href = mailHref;
    floatEmailBtn.title = "Email: " + SITE_CONFIG.email;
  }

  const floatWaBtn = document.getElementById("float-wa-btn");
  if (floatWaBtn) {
    floatWaBtn.href = waFull;
    floatWaBtn.title = "WhatsApp: " + SITE_CONFIG.whatsappDisplay;
  }
}

function navigateTo(route, tripId = null) {
  currentState.route = route;
  currentState.selectedTripId = tripId;

  if (route === "trip" && tripId) {
    window.location.hash = `trip/${tripId}`;
  } else {
    window.location.hash = route;
  }

  updateActiveNavStyles(route);
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openTripDetail(tripId) {
  currentState.booking = { guests: 2 };
  navigateTo("trip", tripId);
}

function setHomeFilter(filterCategory) {
  currentState.homeFilter = filterCategory;
  renderApp();
}

function updateActiveNavStyles(activeRoute) {
  document.querySelectorAll(".nav-link").forEach(btn => {
    const target = btn.getAttribute("data-nav");
    if (target === activeRoute) {
      btn.classList.add("bg-aqua-500", "text-white", "shadow-sm");
      btn.classList.remove("text-sky-100", "hover:bg-white/10");
    } else {
      btn.classList.remove("bg-aqua-500", "text-white", "shadow-sm");
      btn.classList.add("text-sky-100", "hover:bg-white/10");
    }
  });

  document.querySelectorAll(".mobile-nav-link").forEach(btn => {
    const target = btn.getAttribute("data-nav");
    if (target === activeRoute) {
      btn.classList.add("bg-aqua-500", "text-white");
      btn.classList.remove("text-sky-100");
    } else {
      btn.classList.remove("bg-aqua-500", "text-white");
      btn.classList.add("text-sky-100");
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("mobile-menu-icon");
  if (!menu || !icon) return;
  const isHidden = menu.classList.contains("hidden");
  if (isHidden) {
    menu.classList.remove("hidden");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    menu.classList.add("hidden");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
}

function handleHashChange() {
  const hash = window.location.hash.replace("#", "");
  const validRoutes = ["home", "speedboats", "islands", "sea", "safari", "about", "policy", "contact"];
  if (hash.startsWith("trip/")) {
    const id = hash.replace("trip/", "");
    const exists = TRIPS_DATA.find(item => item.id === id);
    if (exists) {
      currentState.route = "trip";
      currentState.selectedTripId = id;
      updateActiveNavStyles(exists.category);
      renderApp();
      return;
    }
  } else if (validRoutes.includes(hash)) {
    currentState.route = hash;
    currentState.selectedTripId = null;
    updateActiveNavStyles(hash);
    renderApp();
    return;
  }
  currentState.route = "home";
  updateActiveNavStyles("home");
  renderApp();
}

window.addEventListener("hashchange", handleHashChange);

function createTripCardHTML(trip) {
  const meta = getCategoryMeta(trip.category);
  const loc = getTripLocalized(trip);
  const hasImage = trip.image && trip.image.trim() !== "";
  const price = trip.pricePerPerson ?? trip.price ?? 0;

  return `
    <article onclick="openTripDetail('${trip.id}')"
             class="trip-card cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between group">
      <div>
        <div class="relative h-56 overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-aqua-600">
          ${hasImage ? `
            <img src="${trip.image}" alt="${loc.title}"
                 onerror="this.style.display='none'"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ` : `
            <div class="w-full h-full flex items-center justify-center text-white/25 text-6xl">
              <i class="fa-solid ${meta.icon}"></i>
            </div>
          `}
          <div class="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-ocean-950/15 to-transparent"></div>
          <span class="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 bg-ocean-900/90 backdrop-blur-md text-aqua-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
            <i class="fa-solid ${meta.icon}"></i> ${meta.label}
          </span>
          <span class="absolute top-3.5 right-3.5 bg-aqua-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
            ${trip.badge || "Bluvi"}
          </span>
          <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white/95 font-medium">
            <span class="inline-flex items-center gap-1.5">
              <i class="fa-regular fa-clock text-aqua-400"></i> ${loc.duration}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-aqua-400"></i> ${trip.location || "Hurghada"}
            </span>
          </div>
        </div>

        <div class="p-6">
          <h3 class="font-display font-bold text-lg text-ocean-900 group-hover:text-aqua-600 transition-colors leading-snug mb-2.5">
            ${loc.title}
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed line-clamp-3">
            ${loc.shortDesc}
          </p>
        </div>
      </div>

      <div class="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400 block">${trip.isPrivateBoat ? t("privateCharterLabel") : t("priceLabel")}</span>
          <div class="flex items-baseline gap-1">
            <span class="font-display font-extrabold text-2xl text-ocean-900">${trip.currency}${price}</span>
            <span class="text-xs text-slate-500 font-medium">/ ${loc.unitLabel}</span>
          </div>
        </div>
        <span class="inline-flex items-center gap-2 bg-ocean-900 group-hover:bg-aqua-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <span>${t("detailsBookBtn")}</span>
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </span>
      </div>
    </article>
  `;
}

function renderHomePage() {
  const filteredTrips = currentState.homeFilter === "all"
    ? TRIPS_DATA
    : TRIPS_DATA.filter(item => item.category === currentState.homeFilter);

  const speedCount = TRIPS_DATA.filter(item => item.category === "speedboats").length;
  const islandsCount = TRIPS_DATA.filter(item => item.category === "islands").length;
  const seaCount = TRIPS_DATA.filter(item => item.category === "sea").length;
  const safariCount = TRIPS_DATA.filter(item => item.category === "safari").length;

  const filterButtons = [
    { key: "all", label: `${t("filterAll")} (${TRIPS_DATA.length})`, icon: "fa-layer-group" },
    { key: "speedboats", label: `${t("filterSpeed")} (${speedCount})`, icon: "fa-gauge-high" },
    { key: "islands", label: `${t("filterIslands")} (${islandsCount})`, icon: "fa-umbrella-beach" },
    { key: "sea", label: `${t("filterSea")} (${seaCount})`, icon: "fa-ship" },
    { key: "safari", label: `${t("filterSafari")} (${safariCount})`, icon: "fa-sun" }
  ];

  const isDe = currentState.lang === "de";
  const heroTitle = isDe ? (SITE_CONFIG.heroTitleDe || SITE_CONFIG.heroTitle) : SITE_CONFIG.heroTitle;
  const heroSub = isDe ? (SITE_CONFIG.heroSubDe || SITE_CONFIG.heroSub) : SITE_CONFIG.heroSub;
  const heroBadge = isDe ? (SITE_CONFIG.heroBadgeDe || SITE_CONFIG.heroBadge) : SITE_CONFIG.heroBadge;

  return `
    <section class="relative min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden bg-ocean-950">
      ${SITE_CONFIG.heroBgType === "video" && SITE_CONFIG.heroBgVideo ? `
        <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover object-center opacity-70">
          <source src="${SITE_CONFIG.heroBgVideo}" type="video/mp4" />
        </video>
      ` : `
        <img src="${SITE_CONFIG.heroBgImage || "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1920&q=85"}"
             alt="Private Speedboats and Red Sea Excursions in Hurghada"
             onerror="this.style.display='none'"
             class="absolute inset-0 w-full h-full object-cover object-center opacity-70" />
      `}
      <div class="hero-overlay absolute inset-0"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div class="max-w-3xl space-y-6">
            <div class="inline-flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-md border border-aqua-400/30 text-aqua-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
              <i class="fa-solid fa-star text-amber-400"></i>
              <span>${heroBadge}</span>
            </div>

            <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              ${heroTitle}
            </h1>

            <p class="text-lg sm:text-xl text-sky-100/90 font-normal leading-relaxed max-w-2xl">
              ${heroSub}
            </p>

            <div class="pt-3 flex flex-wrap items-center gap-3.5">
              <button onclick="navigateTo('speedboats')"
                      class="inline-flex items-center gap-2 bg-aqua-500 hover:bg-aqua-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-aqua-500/30 transition-all hover:-translate-y-0.5 text-sm sm:text-base">
                <i class="fa-solid fa-gauge-high"></i>
                <span>${t("heroBtnSpeed")} (${speedCount})</span>
              </button>
              <button onclick="openTripDetail('trip-intro-dive')"
                      class="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/25 font-bold px-5 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 text-sm sm:text-base">
                <i class="fa-solid fa-water text-aqua-400"></i>
                <span>${t("heroBtnIntro")}</span>
              </button>
              <a href="${SITE_CONFIG.googleMapsUrl}" target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold px-4 py-3.5 rounded-2xl transition-all text-sm">
                <i class="fa-solid fa-location-dot text-rose-400"></i>
                <span>${t("heroBtnMap")}</span>
              </a>
            </div>
          </div>

          <div class="hidden md:flex flex-col items-center justify-center flex-shrink-0">
            <div class="p-7 rounded-3xl bg-ocean-950/85 backdrop-blur-md border border-aqua-400/30 shadow-2xl shadow-ocean-950/70 space-y-5 text-center">
              <svg viewBox="0 0 365 118" class="w-72 h-auto block mx-auto" xmlns="http://www.w3.org/2000/svg" aria-label="Bluvi Brand Emblem">
                <path d="M 10,12 L 54,12 C 77,12 91,27 91,48 L 91,56 C 72,49 51,48 31,52 L 10,55 Z" fill="#1CB5E0" />
                <circle cx="35" cy="32" r="9.5" fill="#041221" />
                <path d="M 10,60 L 42,60 C 66,60 77,73 77,86 C 77,97 67,104 56,104 C 46,104 39,97 39,88 C 39,81 44,76 50,76 C 55,76 58,79 58,83 C 58,86 55,88 52,88 C 50,88 49,86 49,84 C 49,83 50,82 51,82 C 51,83 51,84 52,84 C 53,84 54,83 54,82 C 54,80 52,79 50,79 C 46,79 43,83 43,88 C 43,95 49,100 56,100 C 65,100 72,93 72,85 C 72,74 62,67 48,67 L 26,67 L 26,86 C 26,95 34,104 49,107 L 49,112 C 25,112 10,98 10,77 Z" fill="#1474B8" />
                <text x="103" y="84" font-family="'Plus Jakarta Sans', 'Arial Black', sans-serif" font-weight="900" font-size="82" letter-spacing="-2" fill="#1474B8">Bluvi</text>
                <text x="107" y="108" font-family="'Inter', sans-serif" font-weight="600" font-size="14.5" letter-spacing="4.6" fill="#22B8CF">FEEL THE BLUE VIBE</text>
              </svg>
              <div class="pt-3 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-sky-200">
                <span><strong class="text-white">5.0 ★</strong> Google</span>
                <span>•</span>
                <span><strong class="text-white">8.9K+</strong> Facebook</span>
                <span>•</span>
                <span><strong class="text-white">1.3K+</strong> Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div onclick="navigateTo('speedboats')" class="cursor-pointer bg-ocean-900 hover:bg-ocean-800 text-white rounded-2xl p-6 shadow-xl border border-aqua-400/30 flex flex-col justify-between transition-all group">
          <div class="space-y-2">
            <div class="w-12 h-12 rounded-xl bg-aqua-500/20 border border-aqua-400/30 flex items-center justify-center text-aqua-400 text-xl mb-3">
              <i class="fa-solid fa-gauge-high"></i>
            </div>
            <h2 class="font-display font-bold text-xl">${t("catSpeedTitle")}</h2>
            <p class="text-xs text-sky-200/80 leading-relaxed">${t("catSpeedDesc")}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 text-aqua-400 font-semibold text-xs pt-4 group-hover:translate-x-1 transition-transform">
            ${speedCount} <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>

        <div onclick="navigateTo('islands')" class="cursor-pointer bg-white hover:bg-aqua-50/60 text-ocean-900 rounded-2xl p-6 shadow-xl border border-slate-200/80 flex flex-col justify-between transition-all group">
          <div class="space-y-2">
            <div class="w-12 h-12 rounded-xl bg-aqua-50 border border-aqua-200 flex items-center justify-center text-aqua-600 text-xl mb-3">
              <i class="fa-solid fa-umbrella-beach"></i>
            </div>
            <h2 class="font-display font-bold text-xl">${t("catIslandTitle")}</h2>
            <p class="text-xs text-slate-600 leading-relaxed">${t("catIslandDesc")}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 text-aqua-600 font-semibold text-xs pt-4 group-hover:translate-x-1 transition-transform">
            ${islandsCount} <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>

        <div onclick="navigateTo('sea')" class="cursor-pointer bg-ocean-800 hover:bg-ocean-700 text-white rounded-2xl p-6 shadow-xl border border-white/10 flex flex-col justify-between transition-all group">
          <div class="space-y-2">
            <div class="w-12 h-12 rounded-xl bg-aqua-500/20 border border-aqua-400/30 flex items-center justify-center text-aqua-400 text-xl mb-3">
              <i class="fa-solid fa-ship"></i>
            </div>
            <h2 class="font-display font-bold text-xl">${t("catSeaTitle")}</h2>
            <p class="text-xs text-sky-200/80 leading-relaxed">${t("catSeaDesc")}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 text-aqua-400 font-semibold text-xs pt-4 group-hover:translate-x-1 transition-transform">
            ${seaCount} <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>

        <div onclick="navigateTo('safari')" class="cursor-pointer bg-white hover:bg-aqua-50/60 text-ocean-900 rounded-2xl p-6 shadow-xl border border-slate-200/80 flex flex-col justify-between transition-all group">
          <div class="space-y-2">
            <div class="w-12 h-12 rounded-xl bg-aqua-50 border border-aqua-200 flex items-center justify-center text-aqua-600 text-xl mb-3">
              <i class="fa-solid fa-sun"></i>
            </div>
            <h2 class="font-display font-bold text-xl">${t("catSafariTitle")}</h2>
            <p class="text-xs text-slate-600 leading-relaxed">${t("catSafariDesc")}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 text-aqua-600 font-semibold text-xs pt-4 group-hover:translate-x-1 transition-transform">
            ${safariCount} <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </section>

    <section id="all-packages-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span class="text-aqua-600 font-bold text-xs uppercase tracking-widest">${t("catalogOverline")}</span>
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-ocean-900 mt-1">${t("catalogHeading")}</h2>
        </div>
        <p class="text-slate-600 text-sm max-w-md">${t("catalogSub")}</p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5 mb-8">
        ${filterButtons.map(btn => {
          const isActive = currentState.homeFilter === btn.key;
          return `
            <button onclick="setHomeFilter('${btn.key}')"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-ocean-900 text-white shadow-md shadow-ocean-900/20"
                        : "bg-white text-ocean-900 border border-slate-200 hover:border-aqua-500 hover:text-aqua-600"
                    }">
              <i class="fa-solid ${btn.icon} ${isActive ? "text-aqua-400" : "text-aqua-500"}"></i>
              <span>${btn.label}</span>
            </button>
          `;
        }).join("")}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${filteredTrips.map(trip => createTripCardHTML(trip)).join("")}
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-ocean-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="space-y-3 max-w-2xl">
          <span class="inline-flex items-center gap-2 bg-aqua-500/20 text-aqua-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            <i class="fa-solid fa-location-dot"></i> ${t("socialOverline")}
          </span>
          <h2 class="font-display font-extrabold text-2xl sm:text-3xl">${t("socialHeading")}</h2>
          <p class="text-sm text-sky-200/85 leading-relaxed">${t("socialSub")}</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <a href="${SITE_CONFIG.instagramUrl}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3 rounded-xl text-sm font-bold transition-colors">
            <i class="fa-brands fa-instagram text-pink-400 text-lg"></i> Instagram
          </a>
          <a href="${SITE_CONFIG.tiktokUrl}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3 rounded-xl text-sm font-bold transition-colors">
            <i class="fa-brands fa-tiktok text-white text-lg"></i> TikTok
          </a>
          <a href="${SITE_CONFIG.facebookUrl}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3 rounded-xl text-sm font-bold transition-colors">
            <i class="fa-brands fa-facebook text-sky-400 text-lg"></i> Facebook
          </a>
          <a href="${SITE_CONFIG.googleMapsUrl}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 bg-aqua-500 hover:bg-aqua-600 px-5 py-3 rounded-xl text-sm font-bold shadow transition-colors">
            <i class="fa-solid fa-map-location-dot"></i> ${t("openMapBtn")}
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderCategoryPage(categoryKey, title, subtitle, badgeText, iconClass, heroImg) {
  const items = TRIPS_DATA.filter(item => item.category === categoryKey);
  return `
    <section class="relative bg-ocean-900 text-white py-16 sm:py-20 overflow-hidden">
      <img src="${heroImg}" alt="${title}" onerror="this.style.display='none'" class="absolute inset-0 w-full h-full object-cover opacity-45" />
      <div class="hero-overlay absolute inset-0"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="inline-flex items-center gap-2 bg-aqua-500/20 border border-aqua-400/30 text-aqua-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
          <i class="fa-solid ${iconClass}"></i> ${badgeText} (${items.length})
        </span>
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">${title}</h1>
        <p class="text-sky-100/90 text-base sm:text-lg max-w-2xl leading-relaxed">${subtitle}</p>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${items.map(trip => createTripCardHTML(trip)).join("")}
      </div>
    </section>
  `;
}

function renderAboutPage() {
  const isDe = currentState.lang === "de";
  const storyText = isDe ? (SITE_CONFIG.aboutStoryDe || SITE_CONFIG.aboutStory) : SITE_CONFIG.aboutStory;
  return `
    <section class="relative bg-ocean-900 text-white py-16 sm:py-20 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1800&q=80" alt="About Bluvi Hurghada" class="absolute inset-0 w-full h-full object-cover opacity-35" />
      <div class="hero-overlay absolute inset-0"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="inline-flex items-center gap-2 bg-aqua-500/20 border border-aqua-400/30 text-aqua-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
          <i class="fa-solid fa-building"></i> ${t("navAbout")}
        </span>
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">${t("aboutHeroTitle")}</h1>
        <p class="text-sky-100/90 text-base sm:text-lg max-w-2xl leading-relaxed">${t("aboutHeroSub")}</p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-5 relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-aqua-500/30 aspect-[4/5] bg-ocean-900">
              <img src="${SITE_CONFIG.ownerImage || "51615.jpg"}" alt="${SITE_CONFIG.ownerName}"
                   onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'"
                   class="w-full h-full object-cover object-top" />
              <div class="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <span class="bg-aqua-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${isDe ? (SITE_CONFIG.ownerTitleDe || SITE_CONFIG.ownerTitle) : SITE_CONFIG.ownerTitle}</span>
                <h3 class="font-display font-extrabold text-xl sm:text-2xl mt-1">${SITE_CONFIG.ownerName}</h3>
                <p class="text-xs text-sky-200">${SITE_CONFIG.ownerSubtitle}</p>
              </div>
            </div>
          </div>
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 bg-aqua-50 text-aqua-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <i class="fa-solid fa-anchor"></i> ${isDe ? (SITE_CONFIG.ownerBadgeDe || SITE_CONFIG.ownerBadge) : SITE_CONFIG.ownerBadge}
            </div>
            <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-ocean-900 leading-tight">
              ${isDe ? (SITE_CONFIG.ownerHeadingDe || SITE_CONFIG.ownerHeading) : SITE_CONFIG.ownerHeading}
            </h2>
            <p class="text-slate-700 text-base sm:text-lg leading-relaxed">
              ${isDe ? (SITE_CONFIG.ownerStoryDe || SITE_CONFIG.ownerStory) : SITE_CONFIG.ownerStory}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div class="bg-sand-50 p-4 rounded-2xl border border-slate-200 text-center">
                <span class="block font-display font-extrabold text-2xl text-ocean-900">PADI</span>
                <span class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Diving Instructor</span>
              </div>
              <div class="bg-sand-50 p-4 rounded-2xl border border-slate-200 text-center">
                <span class="block font-display font-extrabold text-2xl text-ocean-900">1,000+</span>
                <span class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Happy Travelers</span>
              </div>
              <div class="bg-sand-50 p-4 rounded-2xl border border-slate-200 text-center">
                <span class="block font-display font-extrabold text-2xl text-ocean-900">5.0 ★</span>
                <span class="text-xs text-slate-500 font-semibold uppercase tracking-wider">Google Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-5">
        <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-ocean-900">${t("whoWeAre")}</h2>
        <p class="text-slate-600 text-base leading-relaxed">${storyText}</p>
      </div>
    </section>
  `;
}

function renderPolicyPage() {
  const isDe = currentState.lang === "de";
  const payText = isDe ? (SITE_CONFIG.paymentPolicyDe || SITE_CONFIG.paymentPolicy) : SITE_CONFIG.paymentPolicy;
  const refText = isDe ? (SITE_CONFIG.refundPolicyDe || SITE_CONFIG.refundPolicy) : SITE_CONFIG.refundPolicy;
  const formatParagraphs = (text) => text.split("\n").filter(Boolean).map(p => `<p class="text-slate-700 text-sm sm:text-base leading-relaxed">${p}</p>`).join("");

  return `
    <section class="bg-ocean-900 text-white py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="inline-flex items-center gap-2 bg-aqua-500/20 border border-aqua-400/30 text-aqua-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
          <i class="fa-solid fa-file-shield"></i> Bluvi Hurghada
        </span>
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-white mb-3">${t("policyHeroTitle")}</h1>
        <p class="text-sky-100/85 text-base max-w-2xl">${t("policyHeroSub")}</p>
      </div>
    </section>

    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div class="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-sm space-y-4">
        <h2 class="font-display font-extrabold text-2xl text-ocean-900">${t("paymentPolicyH")}</h2>
        <div class="space-y-3 pt-1">${formatParagraphs(payText)}</div>
      </div>

      <div class="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-sm space-y-4">
        <h2 class="font-display font-extrabold text-2xl text-ocean-900">${t("refundPolicyH")}</h2>
        <div class="space-y-3 pt-1">${formatParagraphs(refText)}</div>
      </div>
    </section>
  `;
}

function renderContactPage() {
  return `
    <section class="bg-ocean-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-white mb-3">${t("contactHeroTitle")}</h1>
        <p class="text-sky-100/85 text-base max-w-2xl">${t("contactHeroSub")}</p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
          <h2 class="font-display font-extrabold text-xl text-ocean-900">${t("directChannels")}</h2>

          <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" target="_blank" rel="noopener noreferrer"
             class="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center text-2xl flex-shrink-0">
              <i class="fa-brands fa-whatsapp"></i>
            </div>
            <div>
              <span class="block text-xs font-bold uppercase text-emerald-800">WhatsApp (24/7)</span>
              <span class="font-display font-bold text-lg text-ocean-900">${SITE_CONFIG.whatsappDisplay}</span>
            </div>
          </a>

          <a href="mailto:${SITE_CONFIG.email}"
             class="flex items-center gap-4 p-4 rounded-2xl bg-sand-50 hover:bg-aqua-50 border border-slate-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-aqua-500 text-white flex items-center justify-center text-xl flex-shrink-0">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div>
              <span class="block text-xs font-bold uppercase text-aqua-700">${t("emailAddr")}</span>
              <span class="font-display font-bold text-base text-ocean-900 break-all">${SITE_CONFIG.email}</span>
            </div>
          </a>

          <a href="${SITE_CONFIG.googleMapsUrl}" target="_blank" rel="noopener noreferrer"
             class="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 hover:bg-aqua-50 border border-slate-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-ocean-900 text-aqua-400 flex items-center justify-center text-xl flex-shrink-0">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <span class="block text-xs font-bold uppercase text-aqua-700">Google Maps (5.0 ★)</span>
              <span class="font-semibold text-sm text-ocean-900 block mt-0.5">${SITE_CONFIG.address}</span>
            </div>
          </a>
        </div>

        <div class="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <h2 class="font-display font-extrabold text-xl text-ocean-900">Bluvi | speedboat hurghada — Map</h2>
              <p class="text-xs text-slate-500">El-Bahr St, Hurghada 1, Red Sea Governorate 84511, Egypt</p>
            </div>
            <a href="${SITE_CONFIG.googleMapsUrl}" target="_blank" rel="noopener noreferrer"
               class="bg-ocean-900 hover:bg-aqua-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              ${t("openMapBtn")}
            </a>
          </div>
          <div class="w-full h-[380px] rounded-2xl overflow-hidden border border-slate-200">
            <iframe title="Bluvi Speedboat Hurghada Location Map" src="https://maps.google.com/maps?q=27.2248,33.8384&hl=en&z=14&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTripDetailPage(tripId) {
  const trip = TRIPS_DATA.find(item => item.id === tripId);
  if (!trip) return renderHomePage();

  const loc = getTripLocalized(trip);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];
  const maxGuests = trip.maxGuests || (trip.isPrivateBoat ? 6 : 30);
  const hasImage = trip.image && trip.image.trim() !== "";
  const price = trip.pricePerPerson ?? trip.price ?? 0;

  return `
    <div class="bg-white border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
        <button onclick="navigateTo('${trip.category}')"
                class="inline-flex items-center gap-2 text-sm font-semibold text-ocean-900 hover:text-aqua-600 transition-colors">
          <i class="fa-solid fa-arrow-left text-aqua-500"></i>
          <span>${t("navHome")}</span>
        </button>
      </div>
    </div>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div class="lg:col-span-7 space-y-8">
          <div class="relative rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-ocean-900 via-ocean-800 to-aqua-600 h-72 sm:h-96">
            ${hasImage ? `
              <img src="${trip.image}" alt="${loc.title}"
                   onerror="this.style.display='none'"
                   class="w-full h-full object-cover" />
            ` : `
              <div class="w-full h-full flex items-center justify-center text-white/20 text-8xl">
                <i class="fa-solid fa-water"></i>
              </div>
            `}
            <div class="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2.5">
              <span class="bg-aqua-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow">${trip.badge || "Bluvi"}</span>
              <span class="bg-ocean-900/85 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/15">
                <i class="fa-regular fa-clock text-aqua-400 mr-1"></i> ${loc.duration}
              </span>
              <span class="bg-ocean-900/85 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/15">
                <i class="fa-solid fa-location-dot text-aqua-400 mr-1"></i> ${trip.location || "Hurghada"}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h1 class="font-display font-extrabold text-2xl sm:text-4xl text-ocean-900 leading-tight">${loc.title}</h1>
            <p class="text-slate-600 text-base leading-relaxed">${loc.fullDesc}</p>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
            <h2 class="font-display font-bold text-xl text-ocean-900">${t("highlightsTitle")}</h2>
            <ul class="space-y-3">
              ${(trip.highlights || []).map(item => `
                <li class="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                  <i class="fa-solid fa-circle-check text-aqua-500 mt-1 flex-shrink-0"></i>
                  <span>${item}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h2 class="font-display font-bold text-lg text-ocean-900">${t("includedTitle")}</h2>
              <div class="space-y-2.5">
                ${(trip.included || trip.includes || []).map(inc => `
                  <div class="flex items-center gap-2.5 bg-sand-50 px-3.5 py-2.5 rounded-xl border border-slate-200/60 text-xs sm:text-sm font-medium text-ocean-900">
                    <i class="fa-solid fa-check text-emerald-500"></i>
                    <span>${inc}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h2 class="font-display font-bold text-lg text-ocean-900">${t("notesTitle")}</h2>
              <div class="space-y-2.5">
                ${(trip.requirements || []).map(req => `
                  <div class="flex items-start gap-2.5 bg-sand-50 px-3.5 py-2.5 rounded-xl border border-slate-200/60 text-xs sm:text-sm font-medium text-ocean-900">
                    <i class="fa-solid fa-circle-info text-aqua-500 mt-0.5"></i>
                    <span>${req}</span>
                  </div>
                `).join("")}
                <button onclick="navigateTo('policy')" class="text-xs font-bold text-aqua-600 hover:underline pt-1 inline-block">
                  ${t("viewPolicyLink")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 lg:sticky lg:top-24">
          <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div class="bg-ocean-900 text-white p-6 sm:p-7">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-aqua-400">${t("bookingHeader")}</span>
                  <div class="flex items-baseline gap-1.5 mt-1">
                    <span class="font-display font-extrabold text-3xl text-white">${trip.currency}${price}</span>
                    <span class="text-sm text-sky-200/85">/ ${loc.unitLabel}</span>
                  </div>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-aqua-500/20 border border-aqua-400/30 flex items-center justify-center text-aqua-400 text-xl">
                  <i class="fa-solid fa-calculator"></i>
                </div>
              </div>
            </div>

            <form id="booking-form" onsubmit="handleBookingSubmit(event, '${trip.id}')" class="p-6 sm:p-7 space-y-5">
              <div>
                <label for="guest-name" class="block text-xs font-bold uppercase tracking-wider text-ocean-900 mb-1.5">
                  ${t("fullName")} <span class="text-rose-500">*</span>
                </label>
                <input type="text" id="guest-name" required placeholder="Alex Morgan"
                       class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-ocean-900 focus:outline-none focus:border-aqua-500" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="guest-email" class="block text-xs font-bold uppercase tracking-wider text-ocean-900 mb-1.5">
                    ${t("emailAddr")} <span class="text-rose-500">*</span>
                  </label>
                  <input type="email" id="guest-email" required placeholder="you@example.com"
                         class="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm text-ocean-900 focus:outline-none focus:border-aqua-500" />
                </div>
                <div>
                  <label for="guest-phone" class="block text-xs font-bold uppercase tracking-wider text-ocean-900 mb-1.5">
                    ${t("phoneLabel")} <span class="text-rose-500">*</span>
                  </label>
                  <input type="tel" id="guest-phone" required placeholder="+49 170 000000"
                         class="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm text-ocean-900 focus:outline-none focus:border-aqua-500" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="trip-date" class="block text-xs font-bold uppercase tracking-wider text-ocean-900 mb-1.5">
                    ${t("prefDate")} <span class="text-rose-500">*</span>
                  </label>
                  <input type="date" id="trip-date" required value="${defaultDate}"
                         class="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm text-ocean-900 focus:outline-none focus:border-aqua-500" />
                </div>
                <div>
                  <label for="hotel-name" class="block text-xs font-bold uppercase tracking-wider text-ocean-900 mb-1.5">
                    ${t("hotelPickup")}
                  </label>
                  <input type="text" id="hotel-name" placeholder="Hurghada Hotel"
                         class="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm text-ocean-900 focus:outline-none focus:border-aqua-500" />
                </div>
              </div>

              <div class="bg-sand-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span class="block text-sm font-bold text-ocean-900">
                    ${trip.isPrivateBoat ? `${t("guestsPrivate")} ${maxGuests})` : t("guestsRegular")}
                  </span>
                  <span id="counter-rate-hint" class="text-xs text-slate-500">
                    ${trip.isPrivateBoat ? `${trip.currency}${price} / ${loc.unitLabel}` : `${trip.currency}${price} × ${currentState.booking.guests}`}
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <button type="button" onclick="updateGuestCount(-1, '${trip.id}')"
                          aria-label="Decrease guests"
                          class="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:border-aqua-500 text-ocean-900 font-bold flex items-center justify-center shadow-sm">
                    <i class="fa-solid fa-minus text-xs"></i>
                  </button>
                  <span id="guest-count-display" class="font-display font-extrabold text-xl text-ocean-900 w-7 text-center">
                    ${currentState.booking.guests}
                  </span>
                  <button type="button" onclick="updateGuestCount(1, '${trip.id}')"
                          aria-label="Increase guests"
                          class="w-10 h-10 rounded-xl bg-ocean-900 hover:bg-aqua-500 text-white font-bold flex items-center justify-center shadow-sm">
                    <i class="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
              </div>

              <div id="calculator-breakdown" class="bg-ocean-950 text-white rounded-2xl p-5 space-y-2.5 border border-aqua-500/30"></div>

              <button type="submit"
                      class="w-full bg-aqua-500 hover:bg-aqua-600 text-white font-display font-bold text-base py-4 px-6 rounded-2xl shadow-lg shadow-aqua-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5">
                <i class="fa-brands fa-whatsapp text-xl"></i>
                <span>${t("confirmSendBtn")}</span>
              </button>

              <p class="text-[11px] text-center text-slate-400">${t("freeCancelNote")}</p>
            </form>

            <div id="booking-receipt" class="hidden p-6 sm:p-7 bg-emerald-50 border-t border-emerald-200 space-y-4">
              <div id="receipt-details" class="bg-white rounded-xl p-4 border border-emerald-200 text-xs text-slate-700 space-y-1.5 font-mono"></div>
              <div class="flex flex-col sm:flex-row gap-2.5">
                <a id="receipt-wa-link" href="#" target="_blank" rel="noopener noreferrer"
                   class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl text-center inline-flex items-center justify-center gap-2">
                  <i class="fa-brands fa-whatsapp text-base"></i> Open WhatsApp
                </a>
                <button type="button" onclick="copyBookingSummary()"
                        class="bg-ocean-900 hover:bg-ocean-800 text-white text-xs font-bold py-3 px-4 rounded-xl inline-flex items-center justify-center gap-2">
                  <i class="fa-regular fa-copy"></i> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function updateGuestCount(delta, tripId) {
  const trip = TRIPS_DATA.find(item => item.id === tripId);
  if (!trip) return;

  const loc = getTripLocalized(trip);
  const price = trip.pricePerPerson ?? trip.price ?? 0;
  const maxGuests = trip.maxGuests || (trip.isPrivateBoat ? 6 : 30);
  const newCount = Math.min(maxGuests, Math.max(1, currentState.booking.guests + delta));
  currentState.booking.guests = newCount;

  const countDisplay = document.getElementById("guest-count-display");
  if (countDisplay) countDisplay.textContent = newCount;

  const rateHint = document.getElementById("counter-rate-hint");
  if (rateHint) {
    rateHint.textContent = trip.isPrivateBoat
      ? `${trip.currency}${price} / ${loc.unitLabel}`
      : `${trip.currency}${price} × ${newCount}`;
  }

  recalculateTotal(tripId);
}

function calculateTripPricing(tripId) {
  const trip = TRIPS_DATA.find(item => item.id === tripId);
  const unitPrice = trip.pricePerPerson ?? trip.price ?? 0;
  const guests = currentState.booking.guests;
  const grandTotal = trip.isPrivateBoat ? unitPrice : unitPrice * guests;
  return { trip, unitPrice, guests, grandTotal };
}

function recalculateTotal(tripId) {
  const breakdownEl = document.getElementById("calculator-breakdown");
  if (!breakdownEl) return;

  const calc = calculateTripPricing(tripId);
  const curr = calc.trip.currency;
  const baseFormula = calc.trip.isPrivateBoat
    ? `${t("privateCharterLabel")} (${calc.guests})`
    : `${curr}${calc.unitPrice} × ${calc.guests}`;

  breakdownEl.innerHTML = `
    <div class="flex items-center justify-between text-xs text-sky-200/85">
      <span>${baseFormula}</span>
      <span class="font-semibold text-white">${curr}${calc.grandTotal}</span>
    </div>
    <div class="border-t border-white/15 pt-2.5 mt-2 flex items-center justify-between">
      <div>
        <span class="block text-xs uppercase tracking-wider text-aqua-400 font-bold">${t("totalCalcLabel")}</span>
        <span class="text-[11px] text-sky-300/70">${t("transfersIncluded")}</span>
      </div>
      <span class="font-display font-extrabold text-3xl text-aqua-400">${curr}${calc.grandTotal}</span>
    </div>
  `;
}

function handleBookingSubmit(event, tripId) {
  event.preventDefault();
  const name = document.getElementById("guest-name").value.trim();
  const email = document.getElementById("guest-email").value.trim();
  const phone = document.getElementById("guest-phone").value.trim();
  const date = document.getElementById("trip-date").value;
  const hotel = document.getElementById("hotel-name").value.trim() || "Not specified";

  const calc = calculateTripPricing(tripId);
  const loc = getTripLocalized(calc.trip);
  const curr = calc.trip.currency;

  const summaryLines = [
    `🌊 *NEW BOOKING REQUEST - ${SITE_CONFIG.brandName.toUpperCase()} (${currentState.lang.toUpperCase()})*`,
    `────────────────────`,
    `🚤 *Trip:* ${loc.title}`,
    `📅 *Date:* ${date}`,
    `👤 *Name:* ${name}`,
    `📧 *Email:* ${email}`,
    `📱 *Phone/WhatsApp:* ${phone}`,
    `🏨 *Hotel:* ${hotel}`,
    `👥 *Guests:* ${calc.guests}`,
    `────────────────────`,
    `💳 *TOTAL:* ${curr}${calc.grandTotal}`
  ];

  lastFormattedBookingText = summaryLines.join("\n");
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lastFormattedBookingText)}`;

  const receiptEl = document.getElementById("booking-receipt");
  const receiptDetailsEl = document.getElementById("receipt-details");
  const waLinkEl = document.getElementById("receipt-wa-link");

  receiptDetailsEl.innerHTML = `
    <div><strong>Trip:</strong> ${loc.title}</div>
    <div><strong>Name:</strong> ${name} (${calc.guests})</div>
    <div><strong>Date:</strong> ${date} | <strong>Hotel:</strong> ${hotel}</div>
    <div class="text-emerald-700 font-bold pt-1">Total: ${curr}${calc.grandTotal}</div>
  `;
  waLinkEl.href = whatsappUrl;
  receiptEl.classList.remove("hidden");

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

function copyBookingSummary() {
  if (!lastFormattedBookingText) return;
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = lastFormattedBookingText;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
}

function renderApp() {
  const root = document.getElementById("app-root");
  if (!root) return;

  if (currentState.route === "speedboats") {
    root.innerHTML = renderCategoryPage(
      "speedboats",
      t("catSpeedTitle"),
      t("catSpeedDesc"),
      t("catSpeedTitle"),
      "fa-gauge-high",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1800&q=80"
    );
  } else if (currentState.route === "islands") {
    root.innerHTML = renderCategoryPage(
      "islands",
      t("catIslandTitle"),
      t("catIslandDesc"),
      t("filterIslands"),
      "fa-umbrella-beach",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1800&q=80"
    );
  } else if (currentState.route === "sea") {
    root.innerHTML = renderCategoryPage(
      "sea",
      t("catSeaTitle"),
      t("catSeaDesc"),
      t("catSeaTitle"),
      "fa-ship",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80"
    );
  } else if (currentState.route === "safari") {
    root.innerHTML = renderCategoryPage(
      "safari",
      t("catSafariTitle"),
      t("catSafariDesc"),
      t("catSafariTitle"),
      "fa-sun",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1800&q=80"
    );
  } else if (currentState.route === "about") {
    root.innerHTML = renderAboutPage();
  } else if (currentState.route === "policy") {
    root.innerHTML = renderPolicyPage();
  } else if (currentState.route === "contact") {
    root.innerHTML = renderContactPage();
  } else if (currentState.route === "trip" && currentState.selectedTripId) {
    root.innerHTML = renderTripDetailPage(currentState.selectedTripId);
    recalculateTotal(currentState.selectedTripId);
  } else {
    root.innerHTML = renderHomePage();
  }
}

function initBluviApp() {
  syncGlobalContactElements();
  updateLanguageButtonsUI();
  applyCustomUserCode();
  handleHashChange();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBluviApp);
} else {
  initBluviApp();
}
