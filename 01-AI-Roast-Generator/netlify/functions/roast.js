// This code runs on the SERVER (Netlify), not in the browser.
// That is the whole point of this file: your API key stays PRIVATE.
//
// The browser sends a picture here. This file adds the secret key and talks to
// Claude. The key never leaves the server, so nobody visiting your live site
// can read it - not even with the browser's developer tools open.

const Anthropic = require('@anthropic-ai/sdk');

// Claude can read these image formats. Anything else gets a friendly error.
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

exports.handler = async (event) => {
    // Only allow POST requests (someone submitting an image)
    if (event.httpMethod !== 'POST') {
        return json(405, { error: 'Method not allowed. Use POST.' });
    }

    try {
        const { image } = JSON.parse(event.body || '{}');

        if (!image) {
            return json(400, { error: 'No image provided.' });
        }

        // Get the API key from the environment (SECURE!).
        // Locally this comes from your .env file; on a deployed site it comes
        // from Netlify's environment variables. Either way it lives on the
        // server, never in the code you share.
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey) {
            return json(500, {
                error: 'No API key found.',
                details:
                    'Create a file called .env next to package.json containing ' +
                    'ANTHROPIC_API_KEY=sk-ant-your-key-here, then restart the server.'
            });
        }

        // The browser sends a "data URL" that looks like:
        //   data:image/jpeg;base64,/9j/4AAQSkZJRg...
        // Claude wants those two parts separately: the media type, and the
        // raw base64 on its own. So we split it.
        const match = /^data:([^;]+);base64,(.+)$/s.exec(image);

        if (!match) {
            return json(400, { error: 'That image was not in a format we could read.' });
        }

        const [, mediaType, base64Data] = match;

        if (!SUPPORTED_TYPES.includes(mediaType)) {
            return json(400, {
                error: `Claude cannot read ${mediaType} images.`,
                details: 'Try a JPG, PNG, GIF or WebP.'
            });
        }

        const anthropic = new Anthropic({ apiKey });

        console.log('Sending image to Claude...');

        const response = await anthropic.messages.create({
            model: 'claude-haiku-4-5', // Fast, cheap, and it can see images
            max_tokens: 150,           // Keep the roast short
            temperature: 1,            // Highest Claude allows - maximum spice
            system:
                'You are a theatrical stand-up roast comedian performing a friendly ' +
                'celebrity-roast bit. Roast whatever you are shown: over-the-top, ' +
                'absurd, delighted with your own jokes. Punch at objects and ' +
                'situations, never at how a real person looks. Reply with EXACTLY ' +
                'one sentence and nothing else - no preamble, no quote marks.',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: mediaType,
                                data: base64Data
                            }
                        },
                        { type: 'text', text: 'Roast this.' }
                    ]
                }
            ]
        });

        // Claude replies with a list of content blocks. We want the text one.
        const roast = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join(' ')
            .trim();

        if (!roast) {
            return json(502, {
                error: 'Claude had nothing to say about that image. Try another one.'
            });
        }

        console.log('Roast generated.');
        return json(200, { roast });

    } catch (error) {
        console.error('Error:', error);
        return json(error.status || 500, friendlyError(error));
    }
};

// Turn whatever went wrong into something a beginner can actually act on.
function friendlyError(error) {
    const raw = error?.error?.error?.message || error?.message || 'Unknown error';

    if (error?.status === 401) {
        return {
            error: 'Your API key was rejected.',
            details:
                'Check .env for typos, stray quotes or spaces. The key should ' +
                'start with sk-ant- and sit on one line. Restart the server after editing.'
        };
    }

    if (error?.status === 400 && /credit balance/i.test(raw)) {
        return {
            error: 'Your Anthropic account has no credit.',
            details:
                'A Claude.ai subscription does NOT include API credit - they are ' +
                'separate. Add a few dollars at console.anthropic.com under Billing.'
        };
    }

    if (error?.status === 429) {
        return {
            error: 'Too many requests in a row.',
            details: 'Wait about a minute and try again.'
        };
    }

    return { error: 'Failed to generate roast.', details: raw };
}

function json(statusCode, body) {
    return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
}
