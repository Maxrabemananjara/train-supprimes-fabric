const fallbackData = {
  metadata: {
    update_label: "-",
    quality_ok: false,
    rejected_row_count: 0
  },
  model: {
    dimensions: {
      dates: [],
      stations: [],
      routes: [],
      train_types: [],
      time_slots: []
    },
    facts: []
  }
};

const magentaScale = ["#d0005f", "#a00065", "#ed6fa4", "#f2a8cb", "#f7c7dc", "#6f2254"];
const stationPositions = {
  "abancourt": { lat: 49.6903, lon: 1.7744 },
  "agen": { lat: 44.2031, lon: 0.6206 },
  "amiens": { lat: 49.8902, lon: 2.3089 },
  "aurillac": { lat: 44.9309, lon: 2.4446 },
  "avignon centre": { lat: 43.9419, lon: 4.8053 },
  "bas monistrol": { lat: 45.2904, lon: 4.1396 },
  "bayonne": { lat: 43.4969, lon: -1.4706 },
  "bedous": { lat: 42.9983, lon: -0.6031 },
  "bidos": { lat: 43.1799, lon: -0.6072 },
  "bordeaux saint jean": { lat: 44.8259, lon: -0.5567 },
  "brioude": { lat: 45.2945, lon: 3.3841 },
  "brive la gaillarde": { lat: 45.1508, lon: 1.528 },
  "clermont ferrand": { lat: 45.7786, lon: 3.1007 },
  "dax": { lat: 43.7205, lon: -1.0507 },
  "foix": { lat: 42.9653, lon: 1.6078 },
  "grenoble": { lat: 45.1915, lon: 5.7145 },
  "hendaye": { lat: 43.352, lon: -1.7811 },
  "hirson": { lat: 49.9221, lon: 4.0837 },
  "l arbresle": { lat: 45.8334, lon: 4.6167 },
  "le puy en velay": { lat: 45.0437, lon: 3.8852 },
  "lille flandres": { lat: 50.6362, lon: 3.0718 },
  "lyon part dieu": { lat: 45.7606, lon: 4.8594 },
  "lyon perrache": { lat: 45.7485, lon: 4.8257 },
  "lyon saint paul": { lat: 45.7665, lon: 4.8278 },
  "marseille saint charles": { lat: 43.3027, lon: 5.3806 },
  "nancy": { lat: 48.6898, lon: 6.1745 },
  "nantes": { lat: 47.2173, lon: -1.5428 },
  "narbonne": { lat: 43.1911, lon: 3.0056 },
  "nimes centre": { lat: 43.8322, lon: 4.3653 },
  "oloron sainte marie": { lat: 43.1948, lon: -0.6063 },
  "paris austerlitz": { lat: 48.8423, lon: 2.3658 },
  "paris gare de lyon": { lat: 48.8443, lon: 2.3744 },
  "paris montparnasse": { lat: 48.8412, lon: 2.3205 },
  "paris nord": { lat: 48.8809, lon: 2.3553 },
  "pau": { lat: 43.2911, lon: -0.3698 },
  "perpignan": { lat: 42.6964, lon: 2.8796 },
  "pont saint esprit": { lat: 44.254, lon: 4.647 },
  "reims": { lat: 49.2594, lon: 4.0242 },
  "rennes": { lat: 48.1035, lon: -1.6722 },
  "rodez": { lat: 44.3626, lon: 2.5802 },
  "saint etienne chateaucreux": { lat: 45.4436, lon: 4.3993 },
  "saint jean pied de port": { lat: 43.1636, lon: -1.2389 },
  "saint quentin": { lat: 49.8471, lon: 3.2874 },
  "strasbourg": { lat: 48.5851, lon: 7.7349 },
  "tarbes": { lat: 43.2397, lon: 0.0694 },
  "tergnier": { lat: 49.6575, lon: 3.2974 },
  "toulouse matabiau": { lat: 43.6112, lon: 1.4539 },
  "tours": { lat: 47.3898, lon: 0.6939 },
  "valenciennes": { lat: 50.3632, lon: 3.5175 },
  "wissembourg": { lat: 49.0371, lon: 7.9445 }
};
const franceBounds = { minLon: -5.5, maxLon: 9.7, minLat: 41.1, maxLat: 51.2 };
const franceOutline = [
  [-4.8, 48.4],
  [-3.1, 48.9],
  [-1.6, 49.6],
  [1.8, 50.9],
  [3.4, 50.5],
  [5.8, 49.7],
  [7.5, 48.4],
  [7.9, 47.2],
  [6.3, 46.1],
  [7.4, 44.6],
  [6.0, 43.1],
  [4.7, 43.3],
  [3.1, 42.7],
  [1.4, 42.8],
  [-0.4, 43.1],
  [-1.6, 43.5],
  [-1.8, 44.4],
  [-1.2, 45.0],
  [-1.4, 46.0],
  [-2.2, 47.0],
  [-4.1, 47.4],
  [-4.8, 48.4]
];
const corsicaOutline = [
  [8.6, 43.0],
  [9.1, 42.8],
  [9.4, 42.2],
  [9.2, 41.5],
  [8.8, 41.4],
  [8.5, 42.2],
  [8.6, 43.0]
];
const state = {
  period: "30",
  stationId: "",
  trainTypeId: ""
};

let dashboardData = fallbackData;
let lookups = createLookups(fallbackData);

function numberFormat(value) {
  return new Intl.NumberFormat("fr-FR").format(value || 0);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeStationName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, " ")
    .replace(/&/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function stationPosition(label) {
  const key = normalizeStationName(label);
  if (stationPositions[key]) return stationPositions[key];

  if (key.includes("montparnasse")) return stationPositions["paris montparnasse"];
  if (key.includes("austerlitz")) return stationPositions["paris austerlitz"];
  if (key.includes("paris nord")) return stationPositions["paris nord"];
  if (key.includes("gare de lyon")) return stationPositions["paris gare de lyon"];
  if (key.includes("marseille") && key.includes("saint charles")) return stationPositions["marseille saint charles"];
  if (key.includes("bordeaux") && key.includes("saint jean")) return stationPositions["bordeaux saint jean"];
  if (key.includes("lyon") && key.includes("part dieu")) return stationPositions["lyon part dieu"];
  if (key.includes("lyon") && key.includes("perrache")) return stationPositions["lyon perrache"];
  if (key.includes("nimes")) return stationPositions["nimes centre"];
  if (key.includes("saint etienne")) return stationPositions["saint etienne chateaucreux"];

  return null;
}

function parseDate(value) {
  return new Date(`${value}T00:00:00`);
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function shortDate(value) {
  if (!value) return "Période en cours";
  return parseDate(value).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

function compactDate(value) {
  return parseDate(value).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

function periodLabel(startDate, endDate) {
  if (!startDate || !endDate) return "Période en cours";
  if (startDate === endDate) return shortDate(endDate);
  return `Du ${compactDate(startDate)} au ${compactDate(endDate)}`;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

async function loadData() {
  try {
    const response = await fetch(`data/dashboard.json?v=${Date.now()}`);
    if (!response.ok) throw new Error("data unavailable");
    return await response.json();
  } catch (error) {
    return fallbackData;
  }
}

function createMap(rows, idKey) {
  return new Map((rows || []).map((row) => [row[idKey], row]));
}

function createLookups(data) {
  const dimensions = data.model?.dimensions || {};
  return {
    dates: createMap(dimensions.dates, "date_id"),
    stations: createMap(dimensions.stations, "station_id"),
    routes: createMap(dimensions.routes, "route_id"),
    trainTypes: createMap(dimensions.train_types, "train_type_id"),
    timeSlots: createMap(dimensions.time_slots, "time_slot_id")
  };
}

function availableFacts(data) {
  return data.model?.facts || [];
}

function factCount(fact) {
  return Number(fact.cancellations || 0);
}

function dateBounds(facts) {
  const dates = facts.map((fact) => fact.date_id).filter(Boolean).sort();
  return {
    first: dates[0] || "",
    latest: dates[dates.length - 1] || ""
  };
}

function selectedRange(facts) {
  const bounds = dateBounds(facts);
  if (!bounds.latest) return { start: "", end: "", days: 0 };
  if (state.period === "all") {
    return {
      start: bounds.first,
      end: bounds.latest,
      days: Math.max(1, Math.round((parseDate(bounds.latest) - parseDate(bounds.first)) / 86400000) + 1)
    };
  }

  const days = Number(state.period);
  const start = dateKey(addDays(parseDate(bounds.latest), -(days - 1)));
  return { start, end: bounds.latest, days };
}

function previousRange(range) {
  if (!range.start || !range.end || state.period === "all") return null;
  const previousEnd = dateKey(addDays(parseDate(range.start), -1));
  const previousStart = dateKey(addDays(parseDate(previousEnd), -(range.days - 1)));
  return { start: previousStart, end: previousEnd, days: range.days };
}

function inRange(fact, range) {
  if (!range?.start || !range?.end) return false;
  return fact.date_id >= range.start && fact.date_id <= range.end;
}

function applyFilters(data, range) {
  return availableFacts(data).filter((fact) => {
    if (!inRange(fact, range)) return false;
    if (state.trainTypeId && fact.train_type_id !== state.trainTypeId) return false;
    if (
      state.stationId &&
      fact.departure_station_id !== state.stationId &&
      fact.arrival_station_id !== state.stationId
    ) {
      return false;
    }
    return true;
  });
}

function completeDailySeries(facts, range) {
  const byDate = new Map();
  facts.forEach((fact) => byDate.set(fact.date_id, (byDate.get(fact.date_id) || 0) + factCount(fact)));
  const series = [];
  if (!range.start || !range.end) return series;

  for (let current = parseDate(range.start); dateKey(current) <= range.end; current = addDays(current, 1)) {
    const key = dateKey(current);
    series.push({ date: key, value: byDate.get(key) || 0 });
  }
  return series;
}

function topItems(counter, limit = 8) {
  return [...counter.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "fr"))
    .slice(0, limit);
}

function summarize(data) {
  const range = selectedRange(availableFacts(data));
  const facts = applyFilters(data, range);
  const previous = previousRange(range);
  const previousFacts = previous ? applyFilters(data, previous) : [];
  const total = facts.reduce((sum, fact) => sum + factCount(fact), 0);
  const previousTotal = previousFacts.reduce((sum, fact) => sum + factCount(fact), 0);

  const stationCounter = new Map();
  const routeCounter = new Map();
  const typeCounter = new Map();
  const slotCounter = new Map();

  facts.forEach((fact) => {
    const count = factCount(fact);
    const departure = lookups.stations.get(fact.departure_station_id)?.name;
    const arrival = lookups.stations.get(fact.arrival_station_id)?.name;
    const route = lookups.routes.get(fact.route_id);
    const type = lookups.trainTypes.get(fact.train_type_id)?.label || "Non précisé";
    const slot = lookups.timeSlots.get(fact.time_slot_id)?.label || "Non précisé";

    if (departure) stationCounter.set(departure, (stationCounter.get(departure) || 0) + count);
    if (arrival && arrival !== departure) stationCounter.set(arrival, (stationCounter.get(arrival) || 0) + count);
    if (route) routeCounter.set(route.route_id, (routeCounter.get(route.route_id) || 0) + count);
    typeCounter.set(type, (typeCounter.get(type) || 0) + count);
    slotCounter.set(slot, (slotCounter.get(slot) || 0) + count);
  });

  const stationRows = topItems(stationCounter);
  const mapRows = topItems(stationCounter, 24)
    .map((item) => ({ ...item, position: stationPosition(item.label) }))
    .filter((item) => item.position)
    .slice(0, 16);
  const typeRows = topItems(typeCounter, 10);
  const slotRows = [...lookups.timeSlots.values()]
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
    .filter((slot) => slot.label !== "Non precise")
    .map((slot) => ({ label: slot.label, value: slotCounter.get(slot.label) || 0 }));
  const routeRows = [...routeCounter.entries()]
    .map(([routeId, value]) => {
      const route = lookups.routes.get(routeId);
      return {
        departure: route?.departure || "",
        arrival: route?.arrival || "",
        main_type: mainTypeForRoute(facts, routeId),
        cancellations: value
      };
    })
    .sort((a, b) => b.cancellations - a.cancellations)
    .slice(0, 10);
  const topRoute = routeRows[0];

  let evolutionLabel = "-";
  let evolutionDetail = "Comparaison indisponible";
  if (previousTotal > 0) {
    const evolution = ((total - previousTotal) / previousTotal) * 100;
    evolutionLabel = `${evolution >= 0 ? "+" : ""}${evolution.toFixed(1)}%`;
    evolutionDetail = state.period === "1" ? "Vs jour précédent" : "Vs période précédente";
  }

  return {
    range,
    total,
    period_label: periodLabel(range.start, range.end),
    evolution_label: evolutionLabel,
    evolution_detail: evolutionDetail,
    top_station: stationRows[0] || { label: "-", value: 0 },
    top_route: topRoute
      ? { label: `${topRoute.departure} -> ${topRoute.arrival}`, value: topRoute.cancellations }
      : { label: "-", value: 0 },
    daily_evolution: completeDailySeries(facts, range),
    top_stations: stationRows,
    map_stations: mapRows,
    category_distribution: typeRows,
    time_slot_distribution: slotRows,
    top_routes: routeRows
  };
}

function mainTypeForRoute(facts, routeId) {
  const counter = new Map();
  facts
    .filter((fact) => fact.route_id === routeId)
    .forEach((fact) => {
      const label = lookups.trainTypes.get(fact.train_type_id)?.label || "Non précisé";
      counter.set(label, (counter.get(label) || 0) + factCount(fact));
    });
  return topItems(counter, 1)[0]?.label || "Non précisé";
}

function renderKpis(data, summary) {
  const { metadata } = data;
  setText("[data-kpi='total']", numberFormat(summary.total));
  setText("[data-kpi='period']", summary.period_label);
  setText("[data-kpi='evolution']", summary.evolution_label);
  setText("[data-kpi='evolution-detail']", summary.evolution_detail);
  setText("[data-kpi='station']", summary.top_station.label);
  setText("[data-kpi='station-count']", `${numberFormat(summary.top_station.value)} suppression(s)`);
  setText("[data-kpi='route']", summary.top_route.label);
  setText("[data-kpi='route-count']", `${numberFormat(summary.top_route.value)} suppression(s)`);
  setText("[data-kpi='updated']", metadata.update_label || "-");
  setText("[data-kpi='quality']", metadata.quality_ok ? "Données contrôlées" : "Contrôle à vérifier");
  setText(
    "[data-status='quality']",
    metadata.quality_ok
      ? `Contrôles qualité OK, ${numberFormat(metadata.rejected_row_count)} rejet`
      : "Contrôles qualité à vérifier"
  );
  setText("[data-panel='daily-total']", `${numberFormat(summary.total)} suppression(s)`);
}

function renderLineChart(rows) {
  const target = document.getElementById("daily-chart");
  const values = rows || [];
  if (!target) return;
  if (!values.length) {
    target.innerHTML = '<div class="empty-state">Aucune donnée disponible.</div>';
    return;
  }

  const width = 920;
  const height = 260;
  const padding = { top: 22, right: 24, bottom: 40, left: 46 };
  const maxValue = Math.max(...values.map((item) => item.value), 1);
  const xStep = values.length > 1 ? (width - padding.left - padding.right) / (values.length - 1) : 0;
  const points = values.map((item, index) => {
    const x = padding.left + index * xStep;
    const y = height - padding.bottom - (item.value / maxValue) * (height - padding.top - padding.bottom);
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${path} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;
  const labelEvery = Math.max(1, Math.ceil(points.length / 9));
  const labels = points
    .map((point, index) => {
      if (index % labelEvery !== 0 && index !== points.length - 1) return "";
      return `<text class="axis-label" x="${point.x}" y="${height - 12}" text-anchor="middle">${compactDate(point.date)}</text>`;
    })
    .join("");

  target.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <defs>
        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#d0005f" stop-opacity="0.34"></stop>
          <stop offset="100%" stop-color="#d0005f" stop-opacity="0.03"></stop>
        </linearGradient>
      </defs>
      <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#eceef3"></line>
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#eceef3"></line>
      <path d="${area}" fill="url(#areaGradient)"></path>
      <path d="${path}" fill="none" stroke="#d0005f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
      ${points
        .map((point) => `<circle cx="${point.x}" cy="${point.y}" r="5" fill="#d0005f"></circle>`)
        .join("")}
      ${labels}
    </svg>
  `;
}

function renderBars(containerId, rows) {
  const target = document.getElementById(containerId);
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = '<div class="empty-state">Aucune donnée disponible.</div>';
    return;
  }
  const maxValue = Math.max(...rows.map((item) => item.value), 1);
  target.innerHTML = rows
    .map((item) => {
      const width = Math.max(5, Math.round((item.value / maxValue) * 100));
      return `
        <div class="bar-row">
          <span class="bar-label" title="${escapeHtml(item.label)}">${escapeHtml(item.label)}</span>
          <span class="bar-track"><span class="bar-fill" style="width: ${width}%"></span></span>
          <span class="bar-value">${numberFormat(item.value)}</span>
        </div>
      `;
    })
    .join("");
}

function renderDonut(rows) {
  const donut = document.getElementById("category-donut");
  const legend = document.getElementById("category-legend");
  if (!donut || !legend) return;
  const total = rows.reduce((sum, item) => sum + item.value, 0);
  if (!rows.length || !total) {
    donut.style.background = "conic-gradient(#f2d8e4 0deg, #f2d8e4 360deg)";
    legend.innerHTML = '<div class="empty-state">Aucune donnée disponible.</div>';
    return;
  }
  let cursor = 0;
  const gradients = rows.map((item, index) => {
    const start = cursor;
    const angle = (item.value / total) * 360;
    cursor += angle;
    const color = magentaScale[index % magentaScale.length];
    return `${color} ${start}deg ${cursor}deg`;
  });
  donut.style.background = `conic-gradient(${gradients.join(", ")})`;
  legend.innerHTML = rows
    .map((item, index) => {
      const color = magentaScale[index % magentaScale.length];
      return `
        <div class="legend-item">
          <span><span style="color:${color}">●</span> ${escapeHtml(item.label)}</span>
          <strong>${numberFormat(item.value)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderSlots(rows) {
  const target = document.getElementById("slot-chart");
  if (!target) return;
  const maxValue = Math.max(...rows.map((item) => item.value), 1);
  target.innerHTML = rows
    .map((item) => {
      const height = Math.max(8, Math.round((item.value / maxValue) * 190));
      return `
        <div class="slot">
          <div class="slot-bar" style="height: ${height}px"></div>
          <strong>${numberFormat(item.value)}</strong>
          <span>${escapeHtml(item.label)}</span>
        </div>
      `;
    })
    .join("");
}

function projectFrancePoint(position) {
  const width = 360;
  const height = 300;
  const x = ((position.lon - franceBounds.minLon) / (franceBounds.maxLon - franceBounds.minLon)) * width;
  const y = ((franceBounds.maxLat - position.lat) / (franceBounds.maxLat - franceBounds.minLat)) * height;
  return { x: Math.round(x), y: Math.round(y) };
}

function outlinePoints(points) {
  return points
    .map(([lon, lat]) => {
      const point = projectFrancePoint({ lon, lat });
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

function mapColor(value, maxValue) {
  const ratio = maxValue ? value / maxValue : 0;
  if (ratio >= 0.75) return "#d0005f";
  if (ratio >= 0.45) return "#b00062";
  if (ratio >= 0.2) return "#ed6fa4";
  return "#f2a8cb";
}

function renderFranceMap(rows) {
  const target = document.getElementById("france-map");
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = '<div class="empty-state">Carte indisponible pour cette sélection.</div>';
    return;
  }

  const maxValue = Math.max(...rows.map((item) => item.value), 1);
  const bubbles = rows
    .map((item, index) => {
      const point = projectFrancePoint(item.position);
      const ratio = item.value / maxValue;
      const radius = Math.round(7 + Math.sqrt(ratio) * 16);
      const color = mapColor(item.value, maxValue);
      return `
        <g class="map-point">
          <circle cx="${point.x}" cy="${point.y}" r="${radius + 4}" fill="${color}" opacity="0.16"></circle>
          <circle cx="${point.x}" cy="${point.y}" r="${radius}" fill="${color}" opacity="0.88"></circle>
          <title>${escapeHtml(item.label)} : ${numberFormat(item.value)} suppression(s)</title>
        </g>
      `;
    })
    .join("");
  const legendRows = rows
    .slice(0, 3)
    .map(
      (item) => `
        <div class="map-legend-row">
          <span>${escapeHtml(item.label)}</span>
          <strong>${numberFormat(item.value)}</strong>
        </div>
      `
    )
    .join("");

  target.innerHTML = `
    <div class="map-layout">
      <svg class="map-svg" viewBox="0 0 360 300" role="img">
        <polygon class="map-shape" points="${outlinePoints(franceOutline)}"></polygon>
        <polygon class="map-shape corsica" points="${outlinePoints(corsicaOutline)}"></polygon>
        ${bubbles}
      </svg>
      <div class="map-legend">
        <div class="map-scale">
          <span>Faible</span>
          <span>Fort</span>
        </div>
        <div class="map-scale-bar"></div>
        ${legendRows}
      </div>
    </div>
  `;
}

function renderRoutes(rows) {
  const target = document.getElementById("routes-table");
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = '<tr><td colspan="4">Aucune donnée disponible.</td></tr>';
    return;
  }
  target.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.departure)}</td>
          <td>${escapeHtml(row.arrival)}</td>
          <td>${escapeHtml(row.main_type)}</td>
          <td>${numberFormat(row.cancellations)}</td>
        </tr>
      `
    )
    .join("");
}

function renderDashboard() {
  const summary = summarize(dashboardData);
  renderKpis(dashboardData, summary);
  renderLineChart(summary.daily_evolution);
  renderBars("station-chart", summary.top_stations);
  renderDonut(summary.category_distribution);
  renderSlots(summary.time_slot_distribution);
  renderFranceMap(summary.map_stations);
  renderRoutes(summary.top_routes);
}

function populateSelect(select, rows, valueKey, labelKey, emptyLabel) {
  if (!select) return;
  select.innerHTML = `<option value="">${emptyLabel}</option>`;
  rows.forEach((row) => {
    const option = document.createElement("option");
    option.value = row[valueKey];
    option.textContent = row[labelKey];
    select.appendChild(option);
  });
}

function setupControls(data) {
  const dimensions = data.model?.dimensions || {};
  populateSelect(
    document.getElementById("station-filter"),
    [...(dimensions.stations || [])].sort((a, b) => a.name.localeCompare(b.name, "fr")),
    "station_id",
    "name",
    "Toutes"
  );
  populateSelect(
    document.getElementById("train-type-filter"),
    [...(dimensions.train_types || [])].sort((a, b) => a.label.localeCompare(b.label, "fr")),
    "train_type_id",
    "label",
    "Tous"
  );

  document.querySelectorAll("[data-period]").forEach((button) => {
    button.addEventListener("click", () => {
      state.period = button.dataset.period || "30";
      document.querySelectorAll("[data-period]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderDashboard();
    });
  });

  document.getElementById("station-filter")?.addEventListener("change", (event) => {
    state.stationId = event.target.value;
    renderDashboard();
  });
  document.getElementById("train-type-filter")?.addEventListener("change", (event) => {
    state.trainTypeId = event.target.value;
    renderDashboard();
  });
}

loadData().then((data) => {
  dashboardData = data;
  lookups = createLookups(data);
  setupControls(data);
  renderDashboard();
});
