let currentFilter = "all";
let selectedTrip = null;

function initSiteData() {
  document.getElementById("heroTitle").textContent = DEFAULT_SITE_DATA.brand.heroTitle;
  document.getElementById("heroSubtitle").textContent = DEFAULT_SITE_DATA.brand.heroSubtitle;
  document.getElementById("aboutTitle").textContent = DEFAULT_SITE_DATA.about.title;
  document.getElementById("aboutText").textContent = DEFAULT_SITE_DATA.about.text;
  document.getElementById("aboutImage").src = DEFAULT_SITE_DATA.about.image;
  document.getElementById("ownerName").textContent = DEFAULT_SITE_DATA.about.ownerName;
  document.getElementById("ownerRole").textContent = DEFAULT_SITE_DATA.about.ownerRole;
  document.getElementById("ownerPhoto").src = DEFAULT_SITE_DATA.about.ownerPhoto;
  document.getElementById("mapsLink").href = DEFAULT_SITE_DATA.about.mapsUrl;

  const waUrl = `https://wa.me/${DEFAULT_SITE_DATA.brand.whatsapp}`;
  const mailUrl = `mailto:${DEFAULT_SITE_DATA.brand.email}`;
  document.getElementById("wmWhatsapp").href = waUrl;
  document.getElementById("wmEmail").href = mailUrl;
  document.getElementById("footerWhatsapp").href = waUrl;
  document.getElementById("footerWhatsapp").textContent = DEFAULT_SITE_DATA.brand.whatsappDisplay;
  document.getElementById("footerEmail").href = mailUrl;
  document.getElementById("footerEmail").textContent = DEFAULT_SITE_DATA.brand.email;
}

function showView(viewName, filterCat = "all") {
  document.getElementById("homeView").classList.add("hidden");
  document.getElementById("bookingView").classList.add("hidden");
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

  if (viewName === "home") {
    document.getElementById("homeView").classList.remove("hidden");
    currentFilter = filterCat;
    renderCards();
    const activeNav = document.querySelector(`.nav-btn[data-cat="${filterCat}"]`);
    if (activeNav) activeNav.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "booking") {
    document.getElementById("bookingView").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function renderCards() {
  const grid = document.getElementById("tripsGrid");
  const filtered = currentFilter === "all"
    ? DEFAULT_SITE_DATA.packages
    : DEFAULT_SITE_DATA.packages.filter(p => p.category === currentFilter);

  document.querySelectorAll(".filter-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.filter === currentFilter);
  });

  grid.innerHTML = filtered.map(pkg => `
    <article class="trip-card" onclick="openTripBooking('${pkg.id}')">
      <div class="card-img-wrap">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <span class="card-badge">${pkg.categoryLabel}</span>
        <span class="card-duration">${pkg.duration}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${pkg.title}</h3>
        <p class="card-desc">${pkg.shortDesc}</p>
        <div class="card-footer">
          <div class="price-tag">
            <small>From</small>
            ${pkg.price} ${pkg.currency}
          </div>
          <button type="button" class="btn-book">Details & Book</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openTripBooking(id) {
  selectedTrip = DEFAULT_SITE_DATA.packages.find(p => p.id === id);
  if (!selectedTrip) return;

  document.getElementById("detailImg").src = selectedTrip.image;
  document.getElementById("detailBadge").textContent = `${selectedTrip.categoryLabel} • ${selectedTrip.duration}`;
  document.getElementById("detailTitle").textContent = selectedTrip.title;
  document.getElementById("detailFullDesc").textContent = selectedTrip.fullDesc;
  document.getElementById("detailIncludes").innerHTML = selectedTrip.includes
    .map(item => `<li>✔ ${item}</li>`).join("");

  document.getElementById("calcUnitPrice").textContent = `${selectedTrip.price} ${selectedTrip.currency}`;
  document.getElementById("guestCount").value = 1;
  document.getElementById("gearAddon").value = 0;
  updateBookingCalculator();
  showView("booking");
}

function updateBookingCalculator() {
  if (!selectedTrip) return;
  const guests = Math.max(1, parseInt(document.getElementById("guestCount").value) || 1);
  const addonPerPerson = parseFloat(document.getElementById("gearAddon").value) || 0;
  const subtotal = (selectedTrip.price + addonPerPerson) * guests;

  document.getElementById("calcGuestsDisplay").textContent = `${guests} Person(s)`;
  document.getElementById("calcAddonDisplay").textContent = `${addonPerPerson * guests} ${selectedTrip.currency}`;
  document.getElementById("calcTotalDisplay").textContent = `${subtotal} ${selectedTrip.currency}`;
}

function submitBookingWhatsApp(e) {
  e.preventDefault();
  if (!selectedTrip) return;

  const name = document.getElementById("guestName").value.trim();
  const phone = document.getElementById("guestPhone").value.trim();
  const date = document.getElementById("tripDate").value;
  const hotel = document.getElementById("guestHotel").value.trim();
  const guests = Math.max(1, parseInt(document.getElementById("guestCount").value) || 1);
  const addonPerPerson = parseFloat(document.getElementById("gearAddon").value) || 0;
  const total = (selectedTrip.price + addonPerPerson) * guests;

  const msg = `Hello BLUVI Trips! I would like to book:\n` +
    `• Package: ${selectedTrip.title}\n` +
    `• Name: ${name}\n` +
    `• Phone/WhatsApp: ${phone}\n` +
    `• Date: ${date}\n` +
    `• Hotel/Pickup: ${hotel || "Hurghada"}\n` +
    `• Guests: ${guests}\n` +
    `• Total Price: ${total} ${selectedTrip.currency}`;

  window.open(`https://wa.me/${DEFAULT_SITE_DATA.brand.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

window.addEventListener("DOMContentLoaded", () => {
  initSiteData();
  renderCards();
});