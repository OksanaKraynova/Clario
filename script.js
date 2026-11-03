const baseChart = {
  7: {
    revenue:[32,38,35,42,48,51,55], users:[6.2,6.8,6.5,7.1,7.4,7.8,8.1], orders:[420,460,440,510,540,580,610],
    labels:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
    kpis:{revenue:'₽ 6,2 млн',revenueCh:'+9,2%',users:'12 840',usersCh:'+5,1%',conv:'8,1%',convCh:'+0,8%',profit:'₽ 1,9 млн',profitCh:'+11,3%'},
    traffic:[42,31,18,9]
  },
  30: {
    revenue:[18,22,19,25,28,24,30,32,29,35,38,36,40,42,39,45,48,46,50,52,49,55,58,56,60,62,59,65,68,70],
    users:[3.1,3.4,3.2,3.6,3.8,3.5,4.0,4.2,3.9,4.5,4.7,4.4,4.9,5.1,4.8,5.3,5.5,5.2,5.7,5.9,5.6,6.1,6.3,6.0,6.5,6.7,6.4,6.9,7.1,7.2],
    orders:[180,210,195,240,260,230,280,300,270,320,340,310,360,380,350,400,420,390,440,460,430,480,500,470,520,540,510,560,580,600],
    labels:Array.from({length:30},(_,i)=>(i+1)+''),
    kpis:{revenue:'₽ 28,4 млн',revenueCh:'+18,4%',users:'48 291',usersCh:'+12,7%',conv:'8,42%',convCh:'+2,1%',profit:'₽ 9,1 млн',profitCh:'+24,8%'},
    traffic:[42,31,18,9]
  },
  90: {
    revenue:[12,14,13,16,18,17,20,22,19,24,26,25,28,30,27,32,34,33,36,38,37,40,42,41,44,46,45,48,50,49,52,54,53,56,58,57,60,62,61,64,66,65,68,70,69,72,74,73,76,78,77,80,82,81,84,86,85,88,90,89,92,94,93,96,98,97,100,102,101,104,106,105,108,110,109,112,114,113,116,118,117,120,122,121,124,126,125,128,130,129],
    users:[2.0,2.2,2.1,2.4,2.6,2.5,2.8,3.0,2.9,3.2,3.4,3.3,3.6,3.8,3.7,4.0,4.2,4.1,4.4,4.6,4.5,4.8,5.0,4.9,5.2,5.4,5.3,5.6,5.8,5.7,6.0,6.2,6.1,6.4,6.6,6.5,6.8,7.0,6.9,7.2,7.4,7.3,7.6,7.8,7.7,8.0,8.2,8.1,8.4,8.6,8.5,8.8,9.0,8.9,9.2,9.4,9.3,9.6,9.8,9.7,10.0,10.2,10.1,10.4,10.6,10.5,10.8,11.0,10.9,11.2,11.4,11.3,11.6,11.8,11.7,12.0,12.2,12.1,12.4,12.6,12.5,12.8,13.0,12.9,13.2,13.4,13.3,13.6,13.8,13.7],
    orders:[100,110,105,120,130,125,140,150,145,160,170,165,180,190,185,200,210,205,220,230,225,240,250,245,260,270,265,280,290,285,300,310,305,320,330,325,340,350,345,360,370,365,380,390,385,400,410,405,420,430,425,440,450,445,460,470,465,480,490,485,500,510,505,520,530,525,540,550,545,560,570,565,580,590,585,600,610,605,620,630,625,640,650,645,660,670,665,680,690,685],
    labels:Array.from({length:90},(_,i)=>(i+1)+''),
    kpis:{revenue:'₽ 81,2 млн',revenueCh:'+31,2%',users:'132 400',usersCh:'+22,5%',conv:'8,9%',convCh:'+3,4%',profit:'₽ 26,8 млн',profitCh:'+38,1%'},
    traffic:[38,34,20,8]
  }
};

/* Multipliers for country / product filters */
const countryMul = { all:1, ru:0.72, kz:0.15, by:0.13 };
const productMul = { all:1, pro:0.44, start:0.24, ent:0.32 };
const countryLabels = { all:'Все страны', ru:'Россия', kz:'Казахстан', by:'Беларусь' };
const productLabels = { all:'Все продукты', pro:'Clario Pro', start:'Clario Start', ent:'Enterprise' };

const tableData = [
  { name:'Clario Pro', revenue:124500, orders:1840, status:'Рост', badge:'badge-green', product:'pro' },
  { name:'Clario Start', revenue:68200, orders:2105, status:'Рост', badge:'badge-green', product:'start' },
  { name:'Enterprise', revenue:91820, orders:312, status:'Стабильно', badge:'badge-yellow', product:'ent' },
  { name:'Доп. аналитика', revenue:24100, orders:890, status:'Рост', badge:'badge-green', product:'pro' },
  { name:'Старый тариф', revenue:8900, orders:145, status:'Спад', badge:'badge-red', product:'start' }
];

const insightsByView = {
  overview: [
    { icon:'up', text:'Выручка выросла на <strong>18,4%</strong> за месяц — в основном за счёт органики и повторных покупок.' },
    { icon:'bolt', text:'Самый сильный канал — <strong>органический поиск</strong>. ROAS в 4,2 раза выше, чем у платной рекламы.' },
    { icon:'warn', text:'Конверсия на мобильных упала на <strong>4%</strong>. Стоит проверить UX оформления заказа.' }
  ],
  revenue: [
    { icon:'up', text:'Пик выручки пришёлся на 2-ю половину месяца (+22% к первой).' },
    { icon:'bolt', text:'Средний чек вырос на <strong>8%</strong> после запуска пакетов Pro.' },
    { icon:'warn', text:'В выходные выручка на <strong>15%</strong> ниже будних — проверьте расписание кампаний.' }
  ],
  users: [
    { icon:'up', text:'Новые пользователи: <strong>+12,7%</strong>. Органика даёт 48% регистраций.' },
    { icon:'bolt', text:'Возвращаемость за 7 дней — <strong>34%</strong>, выше среднего по рынку.' },
    { icon:'warn', text:'Отток в сегменте Start вырос на 3 п.п. — стоит усилить onboarding.' }
  ],
  orders: [
    { icon:'up', text:'Число заказов выросло на <strong>14%</strong> при том же трафике.' },
    { icon:'bolt', text:'Повторные заказы составляют уже <strong>28%</strong> от всех.' },
    { icon:'warn', text:'Среднее время до первого заказа — 4,2 дня. Можно сократить промо.' }
  ],
  insights: [
    { icon:'bolt', text:'AI рекомендует перераспределить <strong>12%</strong> бюджета с Paid на Organic.' },
    { icon:'up', text:'Сегмент Enterprise показывает лучший LTV: <strong>₽ 186 тыс.</strong>' },
    { icon:'warn', text:'Аномалия: всплеск отказов на checkout 3 дня назад — уже нормализовался.' }
  ]
};

let currentPeriod = 30;
let currentMetric = 'revenue';
let currentView = 'overview';
let currentCountry = 'all';
let currentProduct = 'all';
let sortCol = -1, sortAsc = true;

const canvas = document.getElementById('mainChart');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('chartTooltip');

function mul() { return countryMul[currentCountry] * productMul[currentProduct]; }

function fmtMoney(v) {
  if (v >= 1e6) return '₽ ' + (v/1e6).toFixed(1).replace('.', ',') + ' млн';
  if (v >= 1e3) return '₽ ' + Math.round(v/1e3) + ' тыс.';
  return '₽ ' + Math.round(v);
}

function getScaledSeries(key) {
  const base = baseChart[currentPeriod][key];
  const m = mul();
  return base.map(v => +(v * m).toFixed(2));
}

function getScaledKpis() {
  const k = baseChart[currentPeriod].kpis;
  const m = mul();
  // Parse approximate numbers from display strings for scaling feel
  const scaleStr = (s, isPct) => {
    if (isPct) return s; // keep change %
    // rough scale of main number
    return s;
  };
  // Build nicer scaled display
  const factors = { all:1, ru:0.72, kz:0.15, by:0.13 };
  const pf = { all:1, pro:0.44, start:0.24, ent:0.32 };
  const f = factors[currentCountry] * pf[currentProduct];
  const revMap = {7:6.2, 30:28.4, 90:81.2};
  const usrMap = {7:12840, 30:48291, 90:132400};
  const prfMap = {7:1.9, 30:9.1, 90:26.8};
  const rev = revMap[currentPeriod] * f;
  const usr = Math.round(usrMap[currentPeriod] * f);
  const prf = prfMap[currentPeriod] * f;
  return {
    revenue: '₽ ' + rev.toFixed(1).replace('.', ',') + ' млн',
    revenueCh: k.revenueCh,
    users: usr.toLocaleString('ru-RU'),
    usersCh: k.usersCh,
    conv: k.conv,
    convCh: k.convCh,
    profit: '₽ ' + prf.toFixed(1).replace('.', ',') + ' млн',
    profitCh: k.profitCh
  };
}

/* ========== CHART ========== */
function resizeCanvas() {
  const wrap = canvas.parentElement;
  if (!wrap) return;
  const w = wrap.clientWidth || 600;
  const h = wrap.clientHeight || 220;
  canvas.width = w * 2;
  canvas.height = h * 2;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(1,0,0,1,0,0);
  ctx.scale(2, 2);
  drawChart();
}

function drawChart() {
  const data = getScaledSeries(currentMetric);
  const labels = baseChart[currentPeriod].labels;
  const w = canvas.width / 2;
  const h = canvas.height / 2;
  if (w < 10 || h < 10) return;
  const pad = { t:16, r:16, b:28, l:40 };
  const cw = w - pad.l - pad.r;
  const ch = h - pad.t - pad.b;
  const max = Math.max(...data, 0.01) * 1.15;

  ctx.clearRect(0, 0, w, h);
  const grid = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim() || 'rgba(255,255,255,0.04)';
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (ch / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
  }

  const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
  grad.addColorStop(0, 'rgba(0,245,255,0.28)');
  grad.addColorStop(1, 'rgba(0,245,255,0)');

  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad.l + (cw / Math.max(data.length - 1, 1)) * i;
    const y = pad.t + ch - (v / max) * ch;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.lineTo(pad.l + cw, h - pad.b);
  ctx.lineTo(pad.l, h - pad.b);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad.l + (cw / Math.max(data.length - 1, 1)) * i;
    const y = pad.t + ch - (v / max) * ch;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#00f5ff';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  if (data.length <= 30) {
    data.forEach((v, i) => {
      const x = pad.l + (cw / Math.max(data.length - 1, 1)) * i;
      const y = pad.t + ch - (v / max) * ch;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00f5ff'; ctx.fill();
    });
  }

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#9a9ab0';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  const step = data.length > 30 ? Math.floor(data.length / 6) : (data.length > 10 ? 4 : 1);
  for (let i = 0; i < data.length; i += step) {
    const x = pad.l + (cw / Math.max(data.length - 1, 1)) * i;
    ctx.fillText(labels[i], x, h - 8);
  }
}

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const data = getScaledSeries(currentMetric);
  const labels = baseChart[currentPeriod].labels;
  const cw = rect.width - 56;
  const idx = Math.round(((x - 40) / cw) * (data.length - 1));
  if (idx >= 0 && idx < data.length) {
    tooltip.style.opacity = '1';
    tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
    tooltip.style.top = (e.clientY - rect.top - 36) + 'px';
    const unit = currentMetric === 'revenue' ? data[idx].toFixed(1) + ' млн'
      : currentMetric === 'users' ? data[idx].toFixed(1) + ' тыс.'
      : Math.round(data[idx]);
    tooltip.textContent = labels[idx] + ': ' + unit;
  }
});
canvas.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });

/* ========== UPDATE UI ========== */
function updateKPIs() {
  const k = getScaledKpis();
  document.getElementById('kpiRevenue').textContent = k.revenue;
  document.getElementById('kpiRevenueCh').innerHTML = '<i class="fas fa-arrow-up"></i> ' + k.revenueCh;
  document.getElementById('kpiUsers').textContent = k.users;
  document.getElementById('kpiUsersCh').innerHTML = '<i class="fas fa-arrow-up"></i> ' + k.usersCh;
  document.getElementById('kpiConv').textContent = k.conv;
  document.getElementById('kpiConvCh').innerHTML = '<i class="fas fa-arrow-up"></i> ' + k.convCh;
  document.getElementById('kpiProfit').textContent = k.profit;
  document.getElementById('kpiProfitCh').innerHTML = '<i class="fas fa-arrow-up"></i> ' + k.profitCh;
}

function updateTraffic() {
  const base = baseChart[currentPeriod].traffic.slice();
  // slight shuffle by country
  if (currentCountry === 'ru') { base[0] = 48; base[1] = 28; base[2] = 16; base[3] = 8; }
  else if (currentCountry === 'kz') { base[0] = 30; base[1] = 40; base[2] = 22; base[3] = 8; }
  else if (currentCountry === 'by') { base[0] = 35; base[1] = 33; base[2] = 20; base[3] = 12; }
  const colors = ['#00f5ff','#9d4edd','#ff2d95','#666'];
  const names = ['Органика','Реклама','Соцсети','Прочее'];
  const list = document.querySelector('.sources-list');
  if (!list) return;
  list.innerHTML = names.map((n,i) =>
    `<div class="source-row"><span class="source-name">${n}</span><div class="source-bar-bg"><div class="source-bar" style="width:${base[i]}%;background:${colors[i]}"></div></div><span class="source-pct">${base[i]}%</span></div>`
  ).join('');
}

function updateInsights() {
  const items = insightsByView[currentView] || insightsByView.overview;
  const box = document.querySelector('.ai-insights');
  if (!box) return;
  const iconClass = { up:'up', bolt:'bolt', warn:'warn' };
  const iconFa = { up:'fa-arrow-up', bolt:'fa-bolt', warn:'fa-exclamation' };
  box.innerHTML = `<h4><i class="fas fa-sparkles" style="color:var(--cyan)"></i> AI-инсайты</h4>` +
    items.map(it => `<div class="insight-item"><div class="insight-icon ${iconClass[it.icon]}"><i class="fas ${iconFa[it.icon]}"></i></div><div>${it.text}</div></div>`).join('');
}

function updateTable() {
  const tbody = document.getElementById('tableBody');
  let rows = tableData.slice();
  if (currentProduct !== 'all') {
    rows = rows.filter(r => r.product === currentProduct);
  }
  const f = countryMul[currentCountry];
  rows = rows.map(r => ({
    ...r,
    revenue: Math.round(r.revenue * f),
    orders: Math.round(r.orders * f)
  }));
  // apply current sort
  if (sortCol >= 0) {
    rows.sort((a, b) => {
      let av, bv;
      if (sortCol === 0) { av = a.name; bv = b.name; }
      else if (sortCol === 1) { av = a.revenue; bv = b.revenue; }
      else if (sortCol === 2) { av = a.orders; bv = b.orders; }
      else { av = a.status; bv = b.status; }
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ? 1 : -1;
      return 0;
    });
  }
  tbody.innerHTML = rows.map(r =>
    `<tr><td>${r.name}</td><td data-val="${r.revenue}">${fmtMoney(r.revenue)}</td><td data-val="${r.orders}">${r.orders.toLocaleString('ru-RU')}</td><td><span class="badge ${r.badge}">${r.status}</span></td></tr>`
  ).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:24px">Нет данных по выбранным фильтрам</td></tr>';
}

function refreshAll() {
  updateKPIs();
  drawChart();
  updateTraffic();
  updateInsights();
  updateTable();
}

/* ========== SIDEBAR ========== */
document.querySelectorAll('.sb-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sb-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view || 'overview';
    const titles = {
      overview: 'Обзор',
      revenue: 'Выручка',
      users: 'Пользователи',
      orders: 'Заказы',
      insights: 'AI-инсайты'
    };
    document.querySelector('.dash-title-row h2').textContent = titles[currentView] || 'Обзор';

    // Sync metric when sidebar chooses a metric view
    if (currentView === 'revenue' || currentView === 'users' || currentView === 'orders') {
      currentMetric = currentView;
      document.querySelectorAll('.metric-btn').forEach(b => b.classList.toggle('active', b.dataset.m === currentMetric));
      document.querySelectorAll('.kpi-card').forEach(c => c.classList.toggle('active', c.dataset.metric === currentMetric));
      const chartTitles = { revenue:'Динамика выручки', users:'Динамика пользователей', orders:'Динамика заказов' };
      document.getElementById('chartTitle').textContent = chartTitles[currentMetric];
    }
    refreshAll();
  });
});

/* ========== PERIOD ========== */
document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPeriod = +btn.dataset.period;
    refreshAll();
  });
});

/* ========== METRIC SWITCH ========== */
document.querySelectorAll('.metric-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.metric-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMetric = btn.dataset.m;
    const titles = { revenue:'Динамика выручки', users:'Динамика пользователей', orders:'Динамика заказов' };
    document.getElementById('chartTitle').textContent = titles[currentMetric];
    document.querySelectorAll('.kpi-card').forEach(c => c.classList.toggle('active', c.dataset.metric === currentMetric));
    drawChart();
  });
});

/* ========== KPI CARDS ========== */
document.querySelectorAll('.kpi-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.kpi-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const m = card.dataset.metric;
    if (m === 'revenue' || m === 'users') {
      currentMetric = m;
      document.querySelectorAll('.metric-btn').forEach(b => b.classList.toggle('active', b.dataset.m === m));
      document.getElementById('chartTitle').textContent = m === 'revenue' ? 'Динамика выручки' : 'Динамика пользователей';
      drawChart();
    }
  });
});

/* ========== FILTERS ========== */
document.getElementById('countryFilter').addEventListener('change', function() {
  currentCountry = this.value;
  refreshAll();
});
document.getElementById('productFilter').addEventListener('change', function() {
  currentProduct = this.value;
  refreshAll();
});

/* ========== TABLE SORT ========== */
document.querySelectorAll('#dataTable th').forEach(th => {
  th.addEventListener('click', () => {
    const col = +th.dataset.col;
    if (sortCol === col) sortAsc = !sortAsc;
    else { sortCol = col; sortAsc = true; }
    // visual hint on headers
    document.querySelectorAll('#dataTable th .sort-icon').forEach(i => { i.className = 'fas fa-sort sort-icon'; });
    const icon = th.querySelector('.sort-icon');
    if (icon) icon.className = 'fas ' + (sortAsc ? 'fa-sort-up' : 'fa-sort-down') + ' sort-icon';
    updateTable();
  });
});

/* ========== SIDEBAR COLLAPSE ========== */
document.getElementById('sbCollapse').addEventListener('click', () => {
  document.getElementById('dashSidebar').classList.toggle('collapsed');
  const icon = document.getElementById('sbCollapse').querySelector('i');
  icon.classList.toggle('fa-angles-left');
  icon.classList.toggle('fa-angles-right');
  setTimeout(resizeCanvas, 350);
});

/* ========== THEME ========== */
document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') !== 'light';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  setTimeout(drawChart, 50);
});

/* ========== NOTIFICATIONS ========== */
document.getElementById('notifBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('notifDrop').classList.toggle('open');
});
document.addEventListener('click', () => document.getElementById('notifDrop').classList.remove('open'));

/* ========== AI ASSISTANT ========== */
const aiAnswers = {
  'что произошло с выручкой': 'Выручка выросла на 18,4% за месяц. Основной вклад — органический трафик (+24%) и повторные покупки (+31%).',
  'что с выручкой': 'Выручка выросла на 18,4% за месяц — в основном за счёт органики и возвращающихся клиентов.',
  'какой канал самый': 'Самый эффективный канал — органический поиск. ROAS в 4,2 раза выше, чем у платной рекламы.',
  'сильный канал': 'Самый эффективный канал — органический поиск. ROAS в 4,2 раза выше платной рекламы.',
  'почему упала конверсия': 'Конверсия на мобильных снизилась на 4%. Вероятные причины: рост времени загрузки оформления заказа и отказы на шаге оплаты.',
  'конверсия mobile': 'Конверсия на мобильных упала на 4%. Стоит проверить скорость загрузки и удобство формы оплаты.'
};
function addAiMsg(text, who) {
  const div = document.createElement('div');
  div.className = 'ai-msg ' + who;
  div.textContent = text;
  document.getElementById('aiMessages').appendChild(div);
  document.getElementById('aiMessages').scrollTop = 99999;
}
function askAI(q) {
  addAiMsg(q, 'user');
  const key = q.toLowerCase();
  let answer = 'По данным за 30 дней: выручка ₽ 28,4 млн (+18,4%), пользователи 48 291 (+12,7%). Органика — лидер по эффективности.';
  for (const [k, v] of Object.entries(aiAnswers)) {
    if (key.includes(k)) { answer = v; break; }
  }
  setTimeout(() => addAiMsg(answer, 'bot'), 600);
}
document.getElementById('aiTrigger').addEventListener('click', () => {
  document.getElementById('aiPanel').classList.add('open');
  document.body.classList.add('ai-open');
  document.getElementById('overlay').classList.add('open');
});
document.getElementById('aiClose').addEventListener('click', closeAI);
document.getElementById('overlay').addEventListener('click', () => { closeAI(); closeMenu(); });
function closeAI() {
  document.getElementById('aiPanel').classList.remove('open');
  document.body.classList.remove('ai-open');
  if (!document.getElementById('mobileNav').classList.contains('open'))
    document.getElementById('overlay').classList.remove('open');
}
document.getElementById('aiSend').addEventListener('click', () => {
  const input = document.getElementById('aiInput');
  if (input.value.trim()) { askAI(input.value.trim()); input.value = ''; }
});
document.getElementById('aiInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.value.trim()) { askAI(e.target.value.trim()); e.target.value = ''; }
});
document.querySelectorAll('.ai-sug').forEach(btn => btn.addEventListener('click', () => askAI(btn.dataset.q)));

/* ========== MINI CHART + COUNTERS ========== */
function buildMiniChart() {
  const el = document.getElementById('miniChart');
  if (!el) return;
  el.innerHTML = [40,55,48,70,62,85,78,90,72,95].map(h => `<div class="mini-bar" style="height:${h}%"></div>`).join('');
  setInterval(() => {
    document.querySelectorAll('.mini-bar').forEach(b => { b.style.height = (30 + Math.random() * 65) + '%'; });
  }, 2800);
}
buildMiniChart();
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let cur = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { el.textContent = target.toLocaleString('ru'); clearInterval(timer); }
      else el.textContent = Math.floor(cur).toLocaleString('ru');
    }, 25);
  });
}

/* ========== MENU / FAQ / SCROLL ========== */
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
  document.body.classList.toggle('menu-open');
});
function closeMenu() {
  burger.classList.remove('open');
  mobileNav.classList.remove('open');
  if (!document.getElementById('aiPanel').classList.contains('open'))
    document.getElementById('overlay').classList.remove('open');
  document.body.classList.remove('menu-open');
}
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));

document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
    }
  });
});

/* ========== INIT ========== */
window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', () => {
  resizeCanvas();
  refreshAll();
  animateCounters();
});
setTimeout(() => { resizeCanvas(); refreshAll(); }, 200);