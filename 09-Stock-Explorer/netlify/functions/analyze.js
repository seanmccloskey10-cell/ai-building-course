// This code runs on the SERVER (Netlify), not in the browser.
// The browser sends the price numbers it's showing; this file adds your secret
// Anthropic key and asks Claude to describe them in plain English. The key
// stays on the server - the same pattern as Project 01's roast function.

const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return json(405, { error: 'Method not allowed. Use POST.' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return json(500, {
            error: 'No Anthropic key found.',
            details:
                'Create a file called .env next to package.json containing ' +
                'ANTHROPIC_API_KEY=sk-ant-your-key-here, then restart the server. ' +
                'Get a key at https://console.anthropic.com'
        });
    }

    try {
        const { symbol, points } = JSON.parse(event.body || '{}');

        if (!Array.isArray(points) || points.length < 2) {
            return json(400, { error: 'Not enough price data to analyze.' });
        }

        // Summarize the series into a few numbers so the prompt stays small and
        // cheap - the AI narrates the story, it doesn't need every data point.
        const closes = points.map((p) => p.close);
        const first = closes[0];
        const last = closes[closes.length - 1];
        const pct = (((last - first) / first) * 100).toFixed(1);
        const high = Math.max(...closes).toFixed(2);
        const low = Math.min(...closes).toFixed(2);
        const days = points.length;
        const startDate = points[0].date;
        const endDate = points[points.length - 1].date;

        // We only receive closing prices, so label these as close-based highs
        // and lows - the page's Stats card shows the true intraday high/low.
        const facts =
            `Stock: ${symbol}\n` +
            `Window: ${days} trading days (${startDate} to ${endDate})\n` +
            `Start close: $${first.toFixed(2)}\n` +
            `End close: $${last.toFixed(2)}\n` +
            `Change over window: ${pct}%\n` +
            `Highest close: $${high}   Lowest close: $${low}`;

        const anthropic = new Anthropic({ apiKey });

        const response = await anthropic.messages.create({
            model: 'claude-haiku-4-5',
            max_tokens: 220,
            temperature: 0.7,
            system:
                'You are a market-data narrator for a learning tool. Given summary ' +
                'numbers for one stock over a window, describe what the numbers show in ' +
                'plain, friendly English: the overall trend, how choppy or steady it was, ' +
                'and any standout move. Keep it to 3-4 short sentences. Be strictly ' +
                'OBSERVATIONAL - describe what happened. Do NOT predict, do NOT give ' +
                'buy/sell/hold advice or price targets, and never imply what someone ' +
                'should do. No preamble, just the description.',
            messages: [{ role: 'user', content: `Describe this price action:\n\n${facts}` }]
        });

        const analysis = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join(' ')
            .trim();

        if (!analysis) {
            return json(502, { error: 'Claude had nothing to say about that. Try again.' });
        }

        return json(200, { analysis });

    } catch (error) {
        console.error('analyze error:', error);
        return json(error.status || 500, friendlyError(error));
    }
};

// Turn whatever went wrong into something a beginner can act on. Same shape as
// Project 01's roast function.
function friendlyError(error) {
    const raw = error?.error?.error?.message || error?.message || 'Unknown error';

    if (error?.status === 401) {
        return {
            error: 'Your Anthropic key was rejected.',
            details:
                'Check .env for typos, stray quotes or spaces. The key should start ' +
                'with sk-ant- and sit on one line. Restart the server after editing.'
        };
    }
    if (error?.status === 400 && /credit balance/i.test(raw)) {
        return {
            error: 'Your Anthropic account has no credit.',
            details:
                'A Claude.ai subscription does NOT include API credit - they are separate. ' +
                'Add a few dollars at console.anthropic.com under Billing.'
        };
    }
    if (error?.status === 429) {
        return { error: 'Too many requests in a row.', details: 'Wait about a minute and try again.' };
    }
    return { error: 'Failed to analyze the data.', details: raw };
}

function json(statusCode, body) {
    return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
}
