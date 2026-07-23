// This dashboard pulls live cryptocurrency prices from CoinGecko.
//
// Notice what is NOT here: an API key. CoinGecko's basic price data is a PUBLIC
// api - anyone can ask for it, no sign-up, no secret. That is the whole lesson
// of this project, and it's the opposite of the roast generator in Project 01.
// Because there's no secret to protect, this code can run straight in the
// browser - no server-side function needed.
//
// The trade-off: a free public api limits how OFTEN it will answer. Ask too
// fast and it politely says "slow down" (HTTP 429). So most of the code below
// is not about fetching - it's about handling the times the answer doesn't
// come, and telling you plainly why.

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin,ripple,cardano,dogecoin,polkadot&order=market_cap_desc';

async function fetchPrices() {
    try {
        const response = await fetch(API_URL);

        // 429 = "Too Many Requests". The free CoinGecko api shares one speed
        // limit across everyone using it from your network, so this can happen
        // even if YOU only asked once - it is not a bug and nothing is broken.
        if (response.status === 429) {
            showNotice("⏳ The free price data is busy right now (it limits how often it can be asked). Nothing's broken — wait a minute and the dashboard will fill in on its own.");
            return;
        }

        // Any other non-OK response (500, 503, etc.): the service had a problem.
        if (!response.ok) {
            showNotice(`⚠️ The price service returned an error (${response.status}). The dashboard will try again automatically in 30 seconds.`);
            return;
        }

        const data = await response.json();

        // Open your browser's DevTools console to see the raw data the api sent
        // back — this is the actual "live data" this project is about.
        console.log('API Response:', data);

        // A healthy response is an array of coins. If we got something else
        // (an error object, say), don't crash trying to loop over it.
        if (!Array.isArray(data)) {
            showNotice("⚠️ Got an unexpected response from the price service. The dashboard will try again automatically in 30 seconds.");
            return;
        }

        // An empty array is valid JSON but means NO coins matched. This is what
        // happens if a coin id in the API_URL is mistyped or has been renamed -
        // so instead of a silent blank page, say so out loud.
        if (data.length === 0) {
            showNotice("🔎 No coins came back. Check the coin ids in the API_URL near the top of script.js — a typo or a renamed id will drop coins.");
            return;
        }

        clearNotice();
        displayPrices(data);

    } catch (error) {
        // We only land here if the request never completed at all — usually no
        // internet, or a network/firewall block.
        console.error('Fetch failed:', error);
        showNotice("📡 Couldn't reach the internet to load prices. Check your connection — the dashboard keeps trying every 30 seconds.");
    }
}

function displayPrices(coins) {
    const container = document.getElementById('crypto-container');
    container.innerHTML = '';

    coins.forEach(coin => {
        const change24h = coin.price_change_percentage_24h;
        const changeClass = change24h >= 0 ? 'positive' : 'negative';
        const arrow = change24h >= 0 ? '↑' : '↓';

        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${coin.image}" alt="${coin.name}" class="coin-icon">
                <div>
                    <div class="coin-name">${coin.name}</div>
                    <div class="coin-symbol">${coin.symbol}</div>
                </div>
            </div>
            <div class="price">$${coin.current_price.toLocaleString()}</div>
            <div class="stats">
                <div class="stat">
                    <div class="stat-label">24h Change</div>
                    <div class="stat-value ${changeClass}">${arrow} ${Math.abs(change24h).toFixed(2)}%</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Market Cap</div>
                    <div class="stat-value">$${formatNumber(coin.market_cap)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">24h Volume</div>
                    <div class="stat-value">$${formatNumber(coin.total_volume)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">24h High</div>
                    <div class="stat-value">$${coin.high_24h.toLocaleString()}</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
}

// Shows a friendly message above the price cards. It never wipes prices that
// are already on screen, so a failed refresh doesn't blank out good data.
function showNotice(message) {
    const notice = document.getElementById('notice');
    notice.textContent = message;
    notice.style.display = 'block';
}

function clearNotice() {
    const notice = document.getElementById('notice');
    notice.textContent = '';
    notice.style.display = 'none';
}

// Auto-refresh every 30 seconds
setInterval(fetchPrices, 30000);

// Load on startup
fetchPrices();
