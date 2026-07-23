// Talks to our own server-side functions, never to Alpha Vantage or Anthropic
// directly - so the API keys stay on the server (the Project 01 lesson).

const symbolInput = document.getElementById('symbolInput');
const tickerForm = document.getElementById('tickerForm');
const presets = document.getElementById('presets');
const ranges = document.getElementById('ranges');
const statusEl = document.getElementById('status');
const chartEl = document.getElementById('chart');
const chartTitle = document.getElementById('chartTitle');
const analyzeBtn = document.getElementById('analyzeBtn');
const analysisEl = document.getElementById('analysis');

// What we're currently showing.
let fullSeries = [];      // everything the API returned (oldest first)
let currentPoints = [];   // the slice the chosen range shows
let currentSymbol = '';
let rangeDays = 30;       // 0 means "all"

// --- Load a symbol -------------------------------------------------------

async function loadSymbol(symbol) {
    symbol = symbol.trim().toUpperCase();
    if (!symbol) return;

    currentSymbol = symbol;
    setStatus(`Loading ${symbol}…`);
    analyzeBtn.disabled = true;
    analysisEl.innerHTML = '';

    try {
        const res = await fetch(`/.netlify/functions/prices?symbol=${encodeURIComponent(symbol)}`);
        const data = await res.json();

        if (!res.ok) {
            // Our function sends { error, details } on failure.
            showError(data.error, data.details);
            return;
        }

        fullSeries = data.series || [];
        if (fullSeries.length === 0) {
            showError(`No price data came back for ${symbol}.`);
            return;
        }

        setStatus('');
        render();
    } catch (err) {
        showError('Could not reach the server.', 'Is `netlify dev` still running?');
    }
}

// --- Render chart + stats for the chosen range ---------------------------

function render() {
    currentPoints = rangeDays > 0 ? fullSeries.slice(-rangeDays) : fullSeries.slice();
    chartTitle.textContent = `${currentSymbol} — ${currentPoints.length} trading days`;
    drawChart(currentPoints);
    renderStats(currentPoints);
    analyzeBtn.disabled = currentPoints.length < 2;
}

// A hand-drawn SVG line chart - no chart library. We map each closing price to
// an (x, y) point and connect them. That's all a line chart is.
function drawChart(points) {
    const W = 680, H = 280;
    const padL = 52, padR = 16, padT = 16, padB = 28;

    const closes = points.map((p) => p.close);
    const min = Math.min(...closes);
    const max = Math.max(...closes);
    const span = max - min || 1; // avoid divide-by-zero on a flat line

    const x = (i) => padL + (i / (points.length - 1 || 1)) * (W - padL - padR);
    const y = (v) => padT + (1 - (v - min) / span) * (H - padT - padB);

    const line = points.map((p, i) => `${x(i).toFixed(1)},${y(p.close).toFixed(1)}`).join(' ');
    // A filled area under the line, for a bit of polish.
    const area =
        `${padL},${(H - padB).toFixed(1)} ` +
        line +
        ` ${(W - padR).toFixed(1)},${(H - padB).toFixed(1)}`;

    const up = closes[closes.length - 1] >= closes[0];
    const stroke = up ? '#4ade80' : '#f87171';
    const fill = up ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)';

    const firstDate = points[0].date;
    const lastDate = points[points.length - 1].date;

    chartEl.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" width="100%" role="img"
             aria-label="Line chart of ${escapeHtml(currentSymbol)} closing price">
            <!-- price gridlines: max, middle, min -->
            <line x1="${padL}" y1="${y(max).toFixed(1)}" x2="${W - padR}" y2="${y(max).toFixed(1)}" class="grid"/>
            <line x1="${padL}" y1="${y((max + min) / 2).toFixed(1)}" x2="${W - padR}" y2="${y((max + min) / 2).toFixed(1)}" class="grid"/>
            <line x1="${padL}" y1="${y(min).toFixed(1)}" x2="${W - padR}" y2="${y(min).toFixed(1)}" class="grid"/>
            <text x="8" y="${(y(max) + 4).toFixed(1)}" class="axis">$${max.toFixed(0)}</text>
            <text x="8" y="${(y(min) + 4).toFixed(1)}" class="axis">$${min.toFixed(0)}</text>
            <polygon points="${area}" fill="${fill}"/>
            <polyline points="${line}" fill="none" stroke="${stroke}" stroke-width="2"
                      stroke-linejoin="round" stroke-linecap="round"/>
            <text x="${padL}" y="${H - 8}" class="axis">${firstDate}</text>
            <text x="${W - padR}" y="${H - 8}" class="axis" text-anchor="end">${lastDate}</text>
        </svg>`;
}

function renderStats(points) {
    const closes = points.map((p) => p.close);
    const first = closes[0];
    const last = closes[closes.length - 1];
    const pct = ((last - first) / first) * 100;
    const high = Math.max(...points.map((p) => p.high));
    const low = Math.min(...points.map((p) => p.low));
    const avgVol = points.reduce((s, p) => s + p.volume, 0) / points.length;

    setText('statPrice', `$${last.toFixed(2)}`);
    const changeEl = document.getElementById('statChange');
    changeEl.textContent = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
    changeEl.className = pct >= 0 ? 'up' : 'down';
    setText('statHigh', `$${high.toFixed(2)}`);
    setText('statLow', `$${low.toFixed(2)}`);
    setText('statVolume', formatVolume(avgVol));
}

// --- AI analysis ---------------------------------------------------------

async function analyze() {
    if (currentPoints.length < 2) return;

    analyzeBtn.disabled = true;
    analysisEl.innerHTML = '<span class="thinking">Reading the chart…</span>';

    try {
        const res = await fetch('/.netlify/functions/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                symbol: currentSymbol,
                points: currentPoints.map((p) => ({ date: p.date, close: p.close }))
            })
        });
        const data = await res.json();

        if (!res.ok) {
            analysisEl.innerHTML = `<span class="error">${escapeHtml(data.error || 'AI analysis failed.')}` +
                (data.details ? `<br><small>${escapeHtml(data.details)}</small>` : '') + '</span>';
        } else {
            analysisEl.textContent = data.analysis;
        }
    } catch (err) {
        analysisEl.innerHTML = '<span class="error">Could not reach the server for analysis.</span>';
    } finally {
        analyzeBtn.disabled = false;
    }
}

// --- Helpers -------------------------------------------------------------

function setStatus(msg) {
    statusEl.textContent = msg;
    statusEl.className = 'status';
}

function showError(msg, details) {
    statusEl.className = 'status error';
    statusEl.innerHTML = escapeHtml(msg || 'Something went wrong.') +
        (details ? `<br><small>${escapeHtml(details)}</small>` : '');
    chartEl.innerHTML = '';
    ['statPrice', 'statChange', 'statHigh', 'statLow', 'statVolume'].forEach((id) => setText(id, '—'));
    analyzeBtn.disabled = true;
}

function setText(id, text) {
    document.getElementById(id).textContent = text;
}

function formatVolume(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.round(n).toString();
}

function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
}

// --- Wire up the controls ------------------------------------------------

tickerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loadSymbol(symbolInput.value);
});

presets.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-symbol]');
    if (!btn) return;
    symbolInput.value = btn.dataset.symbol;
    loadSymbol(btn.dataset.symbol);
});

ranges.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-days]');
    if (!btn) return;
    rangeDays = parseInt(btn.dataset.days, 10);
    [...ranges.children].forEach((b) => b.classList.toggle('active', b === btn));
    if (fullSeries.length) render();
});

analyzeBtn.addEventListener('click', analyze);

// Start with something on screen.
loadSymbol('AAPL');
