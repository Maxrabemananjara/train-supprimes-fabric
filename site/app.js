const fallbackData = {
  metadata: {
    update_label: "-",
    quality_ok: false,
    rejected_row_count: 0
  },
  kpis: {
    total_cancellations: 0,
    latest_departure_date: "",
    evolution_label: "-",
    top_departure_station: "-",
    top_departure_station_count: 0,
    top_route: "-",
    top_route_count: 0
  },
  charts: {
    daily_evolution: [],
    top_departure_stations: [],
    category_distribution: [],
    time_slot_distribution: []
  },
  tables: {
    top_routes: []
  }
};

const magentaScale = ["#d0005f", "#a00065", "#ed6fa4", "#f2a8cb", "#f7c7dc", "#6f2254"];

function numberFormat(value) {
  return new Intl.NumberFormat("fr-FR").format(value || 0);
}

function shortDate(value) {
  if (!value) return "Période en cours";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
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

function renderKpis(data) {
  const { metadata, kpis } = data;
  setText("[data-kpi='total']", numberFormat(kpis.total_cancellations));
  setText("[data-kpi='period']", shortDate(kpis.latest_departure_date));
  setText("[data-kpi='evolution']", kpis.evolution_label || "-");
  setText(
    "[data-kpi='evolution-detail']",
    kpis.previous_day_cancellations ? "Vs jour précédent" : "Historique en construction"
  );
  setText("[data-kpi='station']", kpis.top_departure_station || "-");
  setText("[data-kpi='station-count']", `${numberFormat(kpis.top_departure_station_count)} suppression(s)`);
  setText("[data-kpi='route']", kpis.top_route || "-");
  setText("[data-kpi='route-count']", `${numberFormat(kpis.top_route_count)} suppression(s)`);
  setText("[data-kpi='updated']", metadata.update_label || "-");
  setText(
    "[data-kpi='quality']",
    metadata.quality_ok ? "Données contrôlées" : "Contrôle à vérifier"
  );
  setText(
    "[data-status='quality']",
    metadata.quality_ok
      ? `Contrôles qualité OK, ${numberFormat(metadata.rejected_row_count)} rejet`
      : "Contrôles qualité à vérifier"
  );
  setText("[data-panel='daily-total']", `${numberFormat(kpis.total_cancellations)} suppression(s)`);
}

function renderLineChart(data) {
  const target = document.getElementById("daily-chart");
  const values = data.charts.daily_evolution || [];
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
  const labels = points
    .map((point) => {
      const date = new Date(`${point.date}T00:00:00`);
      const label = date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
      return `<text class="axis-label" x="${point.x}" y="${height - 12}" text-anchor="middle">${label}</text>`;
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
          <span class="bar-label" title="${item.label}">${item.label}</span>
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
          <span><span style="color:${color}">●</span> ${item.label}</span>
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
          <span>${item.label}</span>
        </div>
      `;
    })
    .join("");
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
          <td>${row.departure}</td>
          <td>${row.arrival}</td>
          <td>${row.main_type}</td>
          <td>${numberFormat(row.cancellations)}</td>
        </tr>
      `
    )
    .join("");
}

function renderDashboard(data) {
  renderKpis(data);
  renderLineChart(data);
  renderBars("station-chart", data.charts.top_departure_stations || []);
  renderDonut(data.charts.category_distribution || []);
  renderSlots(data.charts.time_slot_distribution || []);
  renderRoutes(data.tables.top_routes || []);
}

loadData().then(renderDashboard);
