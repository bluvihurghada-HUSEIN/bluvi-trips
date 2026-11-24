let currentLang = "en";
let currentRoute = "home";
let activeTripId = null;

function setLanguage(lang) {
  currentLang = lang === "de" ? "de" : "en";
  document.getElementById("lang-btn-en")?.classList.toggle("active-lang", currentLang === "en");
  document.getElementById("lang-btn-de")?.classList.toggle("active-lang", currentLang === "de");
  renderCurrentRoute();
}

function navigateTo(route) {
  currentRoute = route;
  activeTripId = null;
  document.querySelectorAll(".nav-link").forEach(btn => {
    const isActive = btn.dataset.nav === route;
    btn.classList.toggle("bg-aqua-500", isActive);
    btn.classList.toggle("text-white", isActive);
    btn.classList.toggle("text-sky-100", !isActive);
  });
  renderCurrentRoute();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openTripDetail(tripId) {
  activeTripId = tripId;
  currentRoute = "detail";
  renderCurrentRoute();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("mobile-menu-icon");
  if (!menu) return;
  const isHidden = menu.classList.toggle("hidden");
  if (icon) {
    icon.classList.toggle("fa-bars", isHidden);
    icon.classList.toggle("fa-xmark", !isHidden);
  }
}

function getFilteredTrips() {
  if (currentRoute === "home") return BLUVI_TRIPS;
  return BLUVI_TRIPS.filter(trip => trip.category === currentRoute);
}

function renderTripCards(trips) {
  if (!trips.length) {
    return `<div class="bg-white rounded-2xl p-8 text-center border border-sky-100 text-ocean-800">
      ${currentLang === "de" ? "Keine Ausflüge in dieser Kategorie gefunden." : "No excursions found in this category."}
    </div>`;
  }

  return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    ${trips.map(trip => {
      const title = currentLang === "de" ? (trip.titleDe || trip.title) : trip.title;
      const desc = currentLang === "de" ? (trip.shortDescDe || trip.shortDesc) : trip.shortDesc;
      const cat = currentLang === "de" ? (trip.categoryLabelDe || trip.categoryLabel) : trip.categoryLabel;
      const dur = currentLang === "de" ? (trip.durationDe || trip.duration) : trip.duration;
      const cta = currentLang === "de" ? "Details & Buchen" : "Details & Book";
      return `
        <article onclick="openTripDetail('${trip.id}')" class="trip-card bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-sm flex flex-col cursor-pointer">
          <div class="relative h-52 bg-ocean-900">
            <img src="${trip.image}" alt="${title}" loading="lazy" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 bg-ocean-950/85 text-aqua-400 text-xs font-bold px-3 py-1 rounded-full">${cat}</span>
            <span class="absolute bottom-3 right-3 bg-aqua-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">${dur}</span>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="font-display font-bold text-lg text-ocean-900 mb-2">${title}</h3>
            <p class="text-sm text-slate-600 mb-4 flex-1">${desc}</p>
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span class="block text-[11px] text-slate-400">${currentLang === "de" ? "Ab" : "From"}</span>
                <span class="font-display font-extrabold text-xl text-aqua-600">${trip.price} ${trip.currency}</span>
              </div>
              <button type="button" class="px-4 py-2 rounded-xl bg-ocean-900 hover:bg-aqua-600 text-white text-xs font-bold transition-colors">${cta}</button>
            </div>
          </div>
        </article>
      `;
    }).join("")}
  </div>`;
}

function renderTripDetailView(trip) {
  if (!trip) return "";
  const title = currentLang === "de" ? (trip.titleDe || trip.title) : trip.title;
  const fullDesc = currentLang === "de" ? (trip.fullDescDe || trip.fullDesc) : trip.fullDesc;
  const includes = currentLang === "de" ? (trip.includesDe || trip.includes) : trip.includes;

  return `<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <button onclick="navigateTo('home')" class="mb-6 inline-flex items-center gap-2 text-sm font-bold text-ocean-800 hover:text-aqua-600">
      <i class="fa-solid fa-arrow-left"></i>
      <span>${currentLang === "de" ? "Zurück zu allen Ausflügen" : "Back to All Excursions"}</span>
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-7 bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">
        <img src="${trip.image}" alt="${title}" class="w-full h-72 object-cover rounded-xl mb-5">
        <h1 class="font-display font-extrabold text-2xl sm:text-3xl text-ocean-950 mb-3">${title}</h1>
        <p class="text-slate-600 leading-relaxed mb-6">${fullDesc}</p>
        <h2 class="font-display font-bold text-base text-ocean-900 mb-3">${currentLang === "de" ? "Inklusivleistungen" : "Included in This Trip"}</h2>
        <ul class="space-y-2 text-sm text-slate-700">
          ${includes.map(item => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-aqua-500"></i><span>${item}</span></li>`).join("")}
        </ul>
      </div>

      <form onsubmit="submitTripBooking(event, '${trip.id}')" class="lg:col-span-5 bg-white rounded-2xl p-6 border border-sky-100 shadow-sm space-y-4">
        <h2 class="font-display font-bold text-xl text-ocean-950">${currentLang === "de" ? "Anfrage über WhatsApp" : "Book via WhatsApp"}</h2>
        <div>
          <label class="block text-xs font-bold text-ocean-900 mb-1">${currentLang === "de" ? "Vollständiger Name" : "Full Name"}</label>
          <input id="book-name" type="text" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm">
        </div>
        <div>
          <label class="block text-xs font-bold text-ocean-900 mb-1">${currentLang === "de" ? "WhatsApp / Telefon" : "WhatsApp / Phone"}</label>
          <input id="book-phone" type="text" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-ocean-900 mb-1">${currentLang === "de" ? "Datum" : "Preferred Date"}</label>
            <input id="book-date" type="date" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-ocean-900 mb-1">${currentLang === "de" ? "Personen / Boote" : "Guests / Units"}</label>
            <input id="book-guests" type="number" min="1" value="1" onchange="recalcTripTotal(${trip.price}, '${trip.currency}')" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-ocean-900 mb-1">${currentLang === "de" ? "Hotel in Hurghada" : "Hotel Name in Hurghada"}</label>
          <input id="book-hotel" type="text" placeholder="Hurghada" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm">
        </div>
        <div class="bg-sky-50 rounded-xl p-4 flex items-center justify-between border border-sky-100">
          <span class="text-sm font-semibold text-ocean-900">${currentLang === "de" ? "Geschätzter Gesamtpreis" : "Estimated Total"}</span>
          <span id="book-total" class="font-display font-extrabold text-xl text-aqua-600">${trip.price} ${trip.currency}</span>
        </div>
        <button type="submit" class="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm transition-colors">
          <i class="fa-brands fa-whatsapp mr-1.5"></i>
          ${currentLang === "de" ? "Anfrage auf WhatsApp senden" : "Send Booking Request on WhatsApp"}
        </button>
      </form>
    </div>
  </section>`;
}

function recalcTripTotal(unitPrice, currency) {
  const count = Math.max(1, parseInt(document.getElementById("book-guests")?.value || "1", 10));
  const totalEl = document.getElementById("book-total");
  if (totalEl) totalEl.textContent = `${unitPrice * count} ${currency}`;
}

function submitTripBooking(e, tripId) {
  e.preventDefault();
  const trip = BLUVI_TRIPS.find(t => t.id === tripId);
  if (!trip) return;
  const name = document.getElementById("book-name").value.trim();
  const phone = document.getElementById("book-phone").value.trim();
  const date = document.getElementById("book-date").value;
  const guests = Math.max(1, parseInt(document.getElementById("book-guests").value || "1", 10));
  const hotel = document.getElementById("book-hotel").value.trim() || "Hurghada";
  const total = trip.price * guests;

  const lines = [
    `Hello ${DEFAULT_SITE_CONFIG.brandName}, I would like to request a booking:`,
    `• Trip: ${trip.title}`,
    `• Name: ${name}`,
    `• Phone/WhatsApp: ${phone}`,
    `• Date: ${date}`,
    `• Hotel: ${hotel}`,
    `• Guests/Units: ${guests}`,
    `• Estimated Total: ${total} ${trip.currency}`
  ];
  window.open(`https://wa.me/${DEFAULT_SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
}

function renderCurrentRoute() {
  const root = document.getElementById("app-root");
  if (!root) return;

  if (currentRoute === "detail") {
    const trip = BLUVI_TRIPS.find(t => t.id === activeTripId);
    root.innerHTML = renderTripDetailView(trip);
    return;
  }

  if (currentRoute === "about") {
    const story = currentLang === "de" ? DEFAULT_SITE_CONFIG.aboutStoryDe : DEFAULT_SITE_CONFIG.aboutStory;
    const role = currentLang === "de" ? DEFAULT_SITE_CONFIG.ownerTitleDe : DEFAULT_SITE_CONFIG.ownerTitle;
    root.innerHTML = `<section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl p-8 border border-sky-100 shadow-sm space-y-6">
        <h1 class="font-display font-extrabold text-3xl text-ocean-950">${currentLang === "de" ? "Über Bluvi Hurghada" : "About Bluvi Hurghada"}</h1>
        <p class="text-slate-700 leading-relaxed">${story}</p>
        <div class="p-4 rounded-xl bg-sky-50 border border-sky-100">
          <p class="font-display font-bold text-ocean-950">${DEFAULT_SITE_CONFIG.ownerName}</p>
          <p class="text-xs text-slate-600">${role} • ${DEFAULT_SITE_CONFIG.ownerSubtitle}</p>
        </div>
      </div>
    </section>`;
    return;
  }

  if (currentRoute === "policy") {
    const pay = currentLang === "de" ? DEFAULT_SITE_CONFIG.paymentPolicyDe : DEFAULT_SITE_CONFIG.paymentPolicy;
    const ref = (currentLang === "de" ? DEFAULT_SITE_CONFIG.refundPolicyDe : DEFAULT_SITE_CONFIG.refundPolicy).replace(/\n/g, "<br>");
    root.innerHTML = `<section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div class="bg-white rounded-2xl p-8 border border-sky-100 shadow-sm">
        <h1 class="font-display font-extrabold text-2xl text-ocean-950 mb-3">${currentLang === "de" ? "Zahlungsbedingungen" : "Payment Policy"}</h1>
        <p class="text-slate-700 leading-relaxed">${pay}</p>
      </div>
      <div class="bg-white rounded-2xl p-8 border border-sky-100 shadow-sm">
        <h2 class="font-display font-bold text-xl text-ocean-950 mb-3">${currentLang === "de" ? "Stornierungs- & Rückerstattungsrichtlinie" : "Cancellation & Refund Policy"}</h2>
        <p class="text-slate-700 leading-relaxed">${ref}</p>
      </div>
    </section>`;
    return;
  }

  if (currentRoute === "contact") {
    root.innerHTML = `<section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl p-8 border border-sky-100 shadow-sm space-y-5">
        <h1 class="font-display font-extrabold text-3xl text-ocean-950">${currentLang === "de" ? "Kontakt & Standort" : "Contact Us & Location"}</h1>
        <p class="text-slate-700"><i class="fa-solid fa-location-dot text-aqua-600 mr-2"></i>${DEFAULT_SITE_CONFIG.address}</p>
        <p class="text-slate-700"><i class="fa-brands fa-whatsapp text-[#25D366] mr-2"></i>${DEFAULT_SITE_CONFIG.whatsappDisplay}</p>
        <p class="text-slate-700"><i class="fa-regular fa-envelope text-aqua-600 mr-2"></i>${DEFAULT_SITE_CONFIG.email}</p>
        <a href="${DEFAULT_SITE_CONFIG.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ocean-900 text-white text-sm font-bold hover:bg-aqua-600 transition-colors">
          <i class="fa-solid fa-map-location-dot"></i>
          <span>${currentLang === "de" ? "Auf Google Maps öffnen" : "Open on Google Maps"}</span>
        </a>
      </div>
    </section>`;
    return;
  }

  const heroTitle = currentLang === "de" ? DEFAULT_SITE_CONFIG.heroTitleDe : DEFAULT_SITE_CONFIG.heroTitle;
  const heroSub = currentLang === "de" ? DEFAULT_SITE_CONFIG.heroSubDe : DEFAULT_SITE_CONFIG.heroSub;
  const badge = currentLang === "de" ? DEFAULT_SITE_CONFIG.heroBadgeDe : DEFAULT_SITE_CONFIG.heroBadge;
  const trips = getFilteredTrips();

  root.innerHTML = `
    <section class="relative bg-ocean-950 text-white overflow-hidden">
      <img src="${DEFAULT_SITE_CONFIG.heroBgImage}" alt="${DEFAULT_SITE_CONFIG.brandName}" class="w-full h-[420px] object-cover opacity-40">
      <div class="hero-overlay absolute inset-0 flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <span class="inline-block px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-aqua-400 text-xs font-bold tracking-wide mb-4">${badge}</span>
          <h1 class="font-display font-extrabold text-3xl sm:text-5xl max-w-3xl leading-tight mb-4">${heroTitle}</h1>
          <p class="text-sky-100/90 max-w-2xl text-base sm:text-lg mb-6">${heroSub}</p>
          <div class="flex flex-wrap gap-3">
            <button onclick="navigateTo('speedboats')" class="px-5 py-3 rounded-xl bg-aqua-500 hover:bg-aqua-600 text-white font-bold text-sm transition-colors">
              ${currentLang === "de" ? "Schnellboote ansehen" : "Explore Speedboats"}
            </button>
            <a href="https://wa.me/${DEFAULT_SITE_CONFIG.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors">
              <i class="fa-brands fa-whatsapp mr-1.5 text-[#25D366]"></i>WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-ocean-950">
          ${currentLang === "de" ? "Ausgewählte Ausflüge & Charter" : "Featured Excursions & Charters"}
        </h2>
        <div class="flex flex-wrap gap-2">
          <button onclick="navigateTo('home')" class="px-3.5 py-1.5 rounded-full text-xs font-bold ${currentRoute === 'home' ? 'bg-ocean-900 text-white' : 'bg-white text-ocean-900 border border-sky-100'}">${currentLang === "de" ? "Alle" : "All"}</button>
          <button onclick="navigateTo('speedboats')" class="px-3.5 py-1.5 rounded-full text-xs font-bold ${currentRoute === 'speedboats' ? 'bg-ocean-900 text-white' : 'bg-white text-ocean-900 border border-sky-100'}">${currentLang === "de" ? "Schnellboote" : "Speedboats"}</button>
          <button onclick="navigateTo('islands')" class="px-3.5 py-1.5 rounded-full text-xs font-bold ${currentRoute === 'islands' ? 'bg-ocean-900 text-white' : 'bg-white text-ocean-900 border border-sky-100'}">${currentLang === "de" ? "Inseln" : "Islands"}</button>
          <button onclick="navigateTo('sea')" class="px-3.5 py-1.5 rounded-full text-xs font-bold ${currentRoute === 'sea' ? 'bg-ocean-900 text-white' : 'bg-white text-ocean-900 border border-sky-100'}">${currentLang === "de" ? "Meer & Intro Dive" : "Sea & Intro Dive"}</button>
          <button onclick="navigateTo('safari')" class="px-3.5 py-1.5 rounded-full text-xs font-bold ${currentRoute === 'safari' ? 'bg-ocean-900 text-white' : 'bg-white text-ocean-900 border border-sky-100'}">${currentLang === "de" ? "Wüste" : "Desert"}</button>
        </div>
      </div>
      ${renderTripCards(trips)}
    </section>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  renderCurrentRoute();
});