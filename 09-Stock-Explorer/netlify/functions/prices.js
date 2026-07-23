// This code runs on the SERVER (Netlify), not in the browser.
// The browser asks this file for a stock's price history; this file adds your
// secret Alpha Vantage key and fetches the data. The key never leaves the
// server, so nobody visiting your live site can read it - the Project 01 lesson,
// applied to a data key instead of an AI key.

exports.handler = async (event) => {
    const symbol = (event.queryStringParameters?.symbol || '').trim().toUpperCase();

    if (!symbol) {
        return json(400, { error: 'No stock symbol provided.' });
    }
    if (!/^[A-Z.\-]{1,10}$/.test(symbol)) {
        return json(400, { error: `"${symbol}" doesn't look like a stock symbol. Try something like AAPL.` });
    }

    const apiKey = process.env.ALPHA_VANTAGE_KEY;
    if (!apiKey) {
        return json(500, {
            error: 'No Alpha Vantage key found.',
            details:
                'Create a file called .env next to package.json containing ' +
                'ALPHA_VANTAGE_KEY=your-key-here, then restart the server. ' +
                'Get a free key at https://www.alphavantage.co/support/#api-key'
        });
    }

    try {
        // outputsize defaults to "compact" (the latest ~100 days), which is all
        // the chart needs - so we don't pass it explicitly.
        const url =
            'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY' +
            `&symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        // Alpha Vantage always returns 200; the trouble is in the body.
        // "Error Message" = bad symbol. "Note"/"Information" = rate limit or a
        // demo/invalid key.
        if (data['Error Message']) {
            return json(404, {
                error: `No data for "${symbol}".`,
                details: 'Check the ticker symbol - US stocks like AAPL, NVDA, TSLA work best.'
            });
        }
        if (data['Note'] || data['Information']) {
            return json(429, {
                error: 'Hit the Alpha Vantage rate limit (or the demo key).',
                details:
                    'The free tier allows about 25 lookups a day and 5 a minute. Wait a moment, ' +
                    'or make sure ALPHA_VANTAGE_KEY in .env is your own free key, not "demo".'
            });
        }

        const daily = data['Time Series (Daily)'];
        if (!daily) {
            return json(502, { error: 'Alpha Vantage sent data in a shape we did not expect. Try again.' });
        }

        // Turn the object into a clean, oldest-first array the chart can use.
        // Drop any day whose close didn't parse to a real number, so the chart
        // never has to plot a NaN.
        const series = Object.entries(daily)
            .map(([date, v]) => ({
                date,
                close: parseFloat(v['4. close']),
                high: parseFloat(v['2. high']),
                low: parseFloat(v['3. low']),
                volume: parseInt(v['5. volume'], 10)
            }))
            .filter((p) => Number.isFinite(p.close))
            .sort((a, b) => a.date.localeCompare(b.date));

        return json(200, { symbol, series });

    } catch (error) {
        console.error('prices error:', error);
        return json(500, { error: 'Could not reach the stock service.', details: error.message });
    }
};

function json(statusCode, body) {
    return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
}
