const DASHBOARD_CONFIG_KEY = typeof STORAGE_KEY_CONFIG !== "undefined" ? STORAGE_KEY_CONFIG : "bluvi_hurghada_config_v9";
const DASHBOARD_TRIPS_KEY = typeof STORAGE_KEY_TRIPS !== "undefined" ? STORAGE_KEY_TRIPS : "bluvi_hurghada_trips_v9";

function loadDashboardTrips() {
  try {
    const saved = localStorage.getItem(DASHBOARD_TRIPS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return typeof DEFAULT_TRIPS_DATA !== "undefined" ? JSON.parse(JSON.stringify(DEFAULT_TRIPS_DATA)) : [];
}

function saveDashboardTrips(trips) {
  localStorage.setItem(DASHBOARD_TRIPS_KEY, JSON.stringify(trips));
  if (typeof TRIPS_DATA !== "undefined") {
    TRIPS_DATA = trips;
  }
  if (typeof renderApp === "function") {
    renderApp();
  }
  renderDashboardUI();
}

function createEmptyTrip() {
  return {
    id: "trip-" + Date.now(),
    category: "speedboats",
    badge: "New Trip",
    title: "",
    titleDe: "",
    duration: "3 Hours",
    durationDe: "3 Stunden",
    location: "Hurghada",
    pricePerPerson: 100,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    isPrivateBoat: false,
    maxGuests: 6,
    image: "",
    shortDesc: "",
    shortDescDe: "",
    fullDesc: "",
    fullDescDe: "",
    highlights: [],
    included: [],
    requirements: []
  };
}

function openTripEditor(tripId = null) {
  const trips = loadDashboardTrips();
  const existing = tripId ? trips.find(t => t.id === tripId) : null;
  const trip = existing ? { ...existing } : createEmptyTrip();

  const formEl = document.getElementById("dash-trip-form");
  if (!formEl) return;

  formEl.classList.remove("hidden");
  formEl.dataset.mode = existing ? "edit" : "add";
  formEl.dataset.originalId = trip.id;

  document.getElementById("dash-trip-id").value = trip.id;
  document.getElementById("dash-trip-category").value = trip.category || "speedboats";
  document.getElementById("dash-trip-title").value = trip.title || "";
  document.getElementById("dash-trip-title-de").value = trip.titleDe || "";
  document.getElementById("dash-trip-price").value = trip.pricePerPerson ?? trip.price ?? 0;
  document.getElementById("dash-trip-currency").value = trip.currency || "€";
  document.getElementById("dash-trip-unit").value = trip.unitLabel || "person";
  document.getElementById("dash-trip-image").value = trip.image || "";
  document.getElementById("dash-trip-short").value = trip.shortDesc || "";

  updateImagePreview(trip.image || "");
}

function updateImagePreview(url) {
  const preview = document.getElementById("dash-image-preview");
  if (!preview) return;
  if (url && url.trim()) {
    preview.src = url.trim();
    preview.classList.remove("hidden");
  } else {
    preview.src = "";
    preview.classList.add("hidden");
  }
}

function handleSaveTripForm(event) {
  event.preventDefault();
  const formEl = document.getElementById("dash-trip-form");
  const mode = formEl.dataset.mode;
  const originalId = formEl.dataset.originalId;

  const trips = loadDashboardTrips();
  const idVal = document.getElementById("dash-trip-id").value.trim() || ("trip-" + Date.now());
  const categoryVal = document.getElementById("dash-trip-category").value;
  const titleVal = document.getElementById("dash-trip-title").value.trim();
  const titleDeVal = document.getElementById("dash-trip-title-de").value.trim() || titleVal;
  const priceVal = Number(document.getElementById("dash-trip-price").value) || 0;
  const currencyVal = document.getElementById("dash-trip-currency").value.trim() || "€";
  const unitVal = document.getElementById("dash-trip-unit").value.trim() || "person";
  const imageVal = document.getElementById("dash-trip-image").value.trim();
  const shortVal = document.getElementById("dash-trip-short").value.trim();

  if (!titleVal) return;

  if (mode === "edit") {
    const idx = trips.findIndex(t => t.id === originalId);
    if (idx !== -1) {
      trips[idx] = {
        ...trips[idx],
        id: idVal,
        category: categoryVal,
        isPrivateBoat: categoryVal === "speedboats",
        title: titleVal,
        titleDe: titleDeVal,
        pricePerPerson: priceVal,
        currency: currencyVal,
        unitLabel: unitVal,
        image: imageVal,
        shortDesc: shortVal || trips[idx].shortDesc,
        fullDesc: trips[idx].fullDesc || shortVal
      };
    }
  } else {
    trips.unshift({
      ...createEmptyTrip(),
      id: idVal,
      category: categoryVal,
      isPrivateBoat: categoryVal === "speedboats",
      title: titleVal,
      titleDe: titleDeVal,
      pricePerPerson: priceVal,
      currency: currencyVal,
      unitLabel: unitVal,
      image: imageVal,
      shortDesc: shortVal,
      fullDesc: shortVal
    });
  }

  saveDashboardTrips(trips);
  formEl.classList.add("hidden");
  showDashboardMessage("تم حفظ التعديلات بنجاح.");
}

function deleteDashboardTrip(tripId) {
  const trips = loadDashboardTrips().filter(t => t.id !== tripId);
  saveDashboardTrips(trips);
  showDashboardMessage("تم حذف الرحلة.");
}

function resetDashboardTrips() {
  if (typeof DEFAULT_TRIPS_DATA === "undefined") return;
  const fresh = JSON.parse(JSON.stringify(DEFAULT_TRIPS_DATA));
  saveDashboardTrips(fresh);
  showDashboardMessage("تمت استعادة الرحلات الافتراضية.");
}

function exportTripsArrayCode() {
  const trips = loadDashboardTrips();
  const code = `const DEFAULT_TRIPS_DATA = ${JSON.stringify(trips, null, 2)};`;
  const outputBox = document.getElementById("dash-export-box");
  if (outputBox) {
    outputBox.classList.remove("hidden");
    outputBox.value = code;
    outputBox.select();
    document.execCommand("copy");
    showDashboardMessage("تم نسخ كود DEFAULT_TRIPS_DATA لوضعه في data.js.");
  }
}

function showDashboardMessage(msg) {
  const statusEl = document.getElementById("dash-status-msg");
  if (statusEl) {
    statusEl.textContent = msg;
    setTimeout(() => { statusEl.textContent = ""; }, 3500);
  }
}

function renderDashboardUI() {
  const container = document.getElementById("bluvi-dashboard-root");
  if (!container) return;

  const trips = loadDashboardTrips();

  container.innerHTML = `
    <div style="max-width:1100px;margin:24px auto;padding:20px;font-family:sans-serif;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;">
        <div>
          <h2 style="margin:0;font-size:22px;color:#0f172a;">لوحة إدارة الرحلات (${trips.length})</h2>
          <p style="margin:4px 0 0;font-size:13px;color:#475569;">تعديل الأسماء والأسعار والصور أو إضافة رحلة جديدة بسهولة</p>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <button type="button" onclick="openTripEditor(null)" style="padding:9px 14px;background:#0284c7;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;">+ إضافة رحلة</button>
          <button type="button" onclick="exportTripsArrayCode()" style="padding:9px 14px;background:#0f172a;color:#fff;border:none;border-radius:8px;cursor:pointer;">نسخ كود data.js</button>
          <button type="button" onclick="resetDashboardTrips()" style="padding:9px 14px;background:#e2e8f0;color:#0f172a;border:none;border-radius:8px;cursor:pointer;">استعادة الافتراضي</button>
        </div>
      </div>

      <div id="dash-status-msg" style="color:#15803d;font-weight:bold;font-size:13px;margin-bottom:10px;min-height:18px;"></div>

      <form id="dash-trip-form" onsubmit="handleSaveTripForm(event)" class="hidden" style="background:#fff;padding:16px;border:1px solid #cbd5e1;border-radius:12px;margin-bottom:20px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;">
          <div>
            <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">المعرّف (ID)</label>
            <input id="dash-trip-id" type="text" required style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;" />
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">القسم</label>
            <select id="dash-trip-category" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">
              <option value="speedboats">speedboats</option>
              <option value="islands">islands</option>
              <option value="sea">sea</option>
              <option value="safari">safari</option>
            </select>
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">الاسم (EN)</label>
            <input id="dash-trip-title" type="text" required style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;" />
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">الاسم (DE)</label>
            <input id="dash-trip-title-de" type="text" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;" />
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">السعر</label>
            <input id="dash-trip-price" type="number" step="0.01" required style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;" />
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">العملة والوحدة</label>
            <div style="display:flex;gap:6px;">
              <input id="dash-trip-currency" type="text" value="€" style="width:55px;padding:8px;border:1px solid #cbd5e1;border-radius:6px;" />
              <input id="dash-trip-unit" type="text" value="person" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;" />
            </div>
          </div>
        </div>

        <div style="margin-top:12px;">
          <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">رابط الصورة (Image URL)</label>
          <input id="dash-trip-image" type="text" oninput="updateImagePreview(this.value)" placeholder="https://..." style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;" />
          <img id="dash-image-preview" class="hidden" alt="Preview" style="margin-top:8px;max-height:110px;border-radius:8px;object-fit:cover;" />
        </div>

        <div style="margin-top:12px;">
          <label style="display:block;font-size:12px;font-weight:bold;margin-bottom:4px;">وصف مختصر</label>
          <textarea id="dash-trip-short" rows="2" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;"></textarea>
        </div>

        <div style="margin-top:14px;display:flex;gap:8px;">
          <button type="submit" style="padding:9px 16px;background:#16a34a;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;">حفظ الرحلة</button>
          <button type="button" onclick="document.getElementById('dash-trip-form').classList.add('hidden')" style="padding:9px 14px;background:#e2e8f0;color:#0f172a;border:none;border-radius:8px;cursor:pointer;">إلغاء</button>
        </div>
      </form>

      <textarea id="dash-export-box" class="hidden" rows="6" readonly style="width:100%;margin-bottom:16px;padding:10px;font-family:monospace;font-size:12px;border:1px solid #cbd5e1;border-radius:8px;"></textarea>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:12px;">
        ${trips.map(trip => `
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
            <div>
              ${trip.image ? `<img src="${trip.image}" alt="${trip.title}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />` : ""}
              <div style="font-size:11px;color:#0284c7;font-weight:bold;">${trip.category} • ${trip.id}</div>
              <div style="font-size:14px;font-weight:bold;color:#0f172a;margin:4px 0;">${trip.title}</div>
              <div style="font-size:13px;color:#334155;">${trip.currency || "€"}${trip.pricePerPerson ?? trip.price ?? 0} / ${trip.unitLabel || "person"}</div>
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" onclick="openTripEditor('${trip.id}')" style="flex:1;padding:7px;background:#0f172a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px;">تعديل</button>
              <button type="button" onclick="deleteDashboardTrip('${trip.id}')" style="padding:7px 10px;background:#fee2e2;color:#b91c1c;border:none;border-radius:6px;cursor:pointer;font-size:12px;">حذف</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderDashboardUI);
} else {
  renderDashboardUI();
}