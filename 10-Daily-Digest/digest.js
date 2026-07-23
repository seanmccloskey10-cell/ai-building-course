require('dotenv').config();
const Parser = require('rss-parser');
const Anthropic = require('@anthropic-ai/sdk');
const { Resend } = require('resend');
const fs = require('fs');

const parser = new Parser();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// The Resend client is created lazily inside sendEmail(), NOT here - so you can
// run the digest with only an Anthropic key (SEND_EMAIL=false) to generate the
// HTML, without needing a Resend key until you actually want to send email.

const RSS_FEEDS = [
    'https://feeds.arstechnica.com/arstechnica/science',
    'https://www.technologyreview.com/feed/',
    'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml'
];

async function fetchArticles() {
    console.log('📡 Fetching articles from RSS feeds...\n');
    const articles = [];

    for (const feedUrl of RSS_FEEDS) {
        try {
            const feed = await parser.parseURL(feedUrl);
            const source = feed.title || feedUrl;
            console.log(`  ✓ ${source}`);

            const feedArticles = feed.items.slice(0, 2).map(item => ({
                title: item.title,
                snippet: item.contentSnippet || item.content || 'No description available',
                link: item.link,
                source: source
            }));

            articles.push(...feedArticles);
        } catch (error) {
            console.log(`  ✗ Failed to fetch ${feedUrl}: ${error.message}`);
        }
    }

    console.log(`\n📰 Fetched ${articles.length} articles total\n`);
    return articles;
}

async function curateArticles(articles) {
    console.log('\n🎩 AI Editor-in-Chief selecting top stories...\n');

    const articleList = articles.map((a, i) =>
        `${i + 1}. "${a.title}" (${a.source})`
    ).join('\n');

    const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 20,
        system: `You are an editor-in-chief for a Science and AI news digest.
Pick the 3 most newsworthy, impactful stories from this list.
Consider: significance, broad appeal, and avoiding duplicate topics.
Return ONLY the numbers of your top 3 picks, comma-separated. Example: 1,3,5`,
        messages: [{
            role: 'user',
            content: `Today's articles:\n${articleList}`
        }]
    });

    // Claude returns a list of content blocks; join the text ones.
    const replyText = response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join(' ');

    const picks = (replyText.match(/\d+/g) || [])
        .map(n => parseInt(n) - 1)
        .filter(i => i >= 0 && i < articles.length)
        .slice(0, 3);

    // If the model didn't return usable numbers, fall back to the first 3 articles
    // so the digest still goes out instead of crashing.
    const safePicks = picks.length > 0 ? picks : [0, 1, 2].filter(i => i < articles.length);

    const curated = safePicks.map(i => articles[i]);

    console.log('📰 Selected stories:');
    curated.forEach(a => console.log(`  ✓ ${a.title.substring(0, 50)}...`));

    return curated;
}

async function summarizeArticle(article) {
    const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        system: 'You are a helpful assistant that summarizes news articles. Provide a concise 2-3 sentence summary and 3 key points as bullet points. Keep it informative but brief.',
        messages: [{
            role: 'user',
            content: `Summarize this article:\n\nTitle: ${article.title}\n\nContent: ${article.snippet}`
        }]
    });

    const content = response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

    // Parse into summary and keyPoints array
    const lines = content.split('\n').filter(line => line.trim());
    const summary = lines.filter(line => !line.startsWith('-') && !line.startsWith('•')).join(' ').trim();
    const keyPoints = lines.filter(line => line.startsWith('-') || line.startsWith('•'))
        .map(point => point.replace(/^[-•]\s*/, '').trim());

    return {
        summary: summary || content,
        keyPoints: keyPoints.length > 0 ? keyPoints : ['Key insight from this article']
    };
}

async function summarizeAllArticles(articles) {
    console.log('\n🤖 AI summarizing articles...\n');
    const summarized = [];

    for (const article of articles) {
        console.log(`  Summarizing: ${article.title.substring(0, 40)}...`);
        const { summary, keyPoints } = await summarizeArticle(article);
        summarized.push({
            ...article,
            summary,
            keyPoints
        });
    }

    console.log('  ✓ All articles summarized');
    return summarized;
}

function generateHTML(articles) {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const articleCards = articles.map(article => `
        <article class="article-card">
            <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
            <p class="source">${article.source}</p>
            <p class="summary">${article.summary}</p>
            <div class="ai-summary">
                <p class="ai-label">🤖 AI Summary</p>
                <ul class="key-points">
                    ${article.keyPoints.map(point => `<li>${point}</li>`).join('\n                    ')}
                </ul>
            </div>
            <a href="${article.link}" target="_blank" class="read-more">Read more →</a>
        </article>
    `).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily AI & Science Digest</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f0f2f5;
            color: #333;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            line-height: 1.6;
        }
        header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            letter-spacing: -0.5px;
        }
        header p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.1rem;
            font-weight: 400;
        }
        main {
            flex: 1;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            width: 100%;
        }
        .articles-section h2 {
            font-size: 1.25rem;
            color: #1a1a2e;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }
        .article-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .article-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }
        .article-card h3 {
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
        }
        .article-card h3 a {
            color: #1a1a2e;
            text-decoration: none;
        }
        .article-card h3 a:hover {
            color: #0f3460;
        }
        .source {
            color: #6b7280;
            font-size: 0.85rem;
            margin-bottom: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .summary {
            color: #374151;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        .ai-summary {
            background: linear-gradient(135deg, #e8f4f8 0%, #f0f7fa 100%);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            border-left: 4px solid #0f3460;
        }
        .ai-label {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0f3460;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .key-points {
            margin: 0;
            padding-left: 1.25rem;
            color: #374151;
        }
        .key-points li {
            margin-bottom: 0.5rem;
            line-height: 1.5;
            font-size: 0.9rem;
        }
        .read-more {
            display: inline-block;
            color: #0f3460;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border: 1px solid #0f3460;
            border-radius: 6px;
            transition: all 0.2s ease;
        }
        .read-more:hover {
            background: #0f3460;
            color: white;
        }
        footer {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            padding: 1.5rem;
            font-size: 0.875rem;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <header>
        <h1>Daily AI & Science Digest</h1>
        <p>${today}</p>
    </header>

    <main>
        <section class="articles-section">
            <h2>Today's Articles</h2>
            ${articleCards}
        </section>
    </main>

    <footer>
        <p>Daily Digest &copy; 2024</p>
    </footer>
</body>
</html>`;
}

function generateEmailHTML(articles) {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const articleRows = articles.map(article => `
        <tr>
            <td style="padding: 20px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5;">
                <h2 style="margin: 0 0 8px 0; font-size: 18px; color: #1a1a2e;">
                    <a href="${article.link}" style="color: #1a1a2e; text-decoration: none;">${article.title}</a>
                </h2>
                <p style="margin: 0 0 12px 0; font-size: 12px; color: #888888; text-transform: uppercase;">${article.source}</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #555555; line-height: 1.5;">${article.summary}</p>
                <ul style="margin: 0 0 12px 0; padding-left: 20px; color: #444444; font-size: 14px;">
                    ${article.keyPoints.map(point => `<li style="margin-bottom: 6px;">${point}</li>`).join('')}
                </ul>
                <a href="${article.link}" style="color: #0f3460; font-size: 14px;">Read more →</a>
            </td>
        </tr>`).join('');

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily AI & Science Digest - ${today}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
                    <tr>
                        <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Daily AI & Science Digest</h1>
                            <p style="margin: 10px 0 0 0; color: #aaaaaa; font-size: 14px;">${today}</p>
                        </td>
                    </tr>
                    ${articleRows}
                    <tr>
                        <td style="background-color: #1a1a2e; padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #aaaaaa; font-size: 12px;">Daily Digest © 2024</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

async function sendEmail(emailHtml) {
    if (process.env.SEND_EMAIL !== 'true') {
        console.log('📧 Email sending disabled (SEND_EMAIL is not true)');
        return;
    }

    // Past this point you've asked to actually send (SEND_EMAIL=true), so a
    // missing piece is a real error, not a quiet skip. We exit non-zero so a
    // scheduled GitHub run turns RED instead of showing a green check with no
    // email - a passing run that silently sends nothing is the worst outcome
    // for an automation you're not watching.
    const emailTo = process.env.EMAIL_TO;
    if (!emailTo) {
        console.log('\n❌ SEND_EMAIL is true but EMAIL_TO is empty - there is no address to send to.');
        console.log('   Set EMAIL_TO to your own email: in .env locally, or as a repository secret on GitHub.\n');
        process.exit(1);
    }

    if (!process.env.RESEND_API_KEY) {
        console.log('\n❌ SEND_EMAIL is true but no RESEND_API_KEY is set - cannot send the email.');
        console.log('   Add RESEND_API_KEY (free at https://resend.com): in .env locally, or as a repository secret.\n');
        process.exit(1);
    }

    // Created here, not at the top of the file, so the digest can run without a
    // Resend key when you're only generating the HTML.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    try {
        console.log(`\n📧 Sending email to ${emailTo}...`);

        const { data, error } = await resend.emails.send({
            from: 'Daily Digest <onboarding@resend.dev>',
            to: emailTo,
            subject: `Your Daily AI & Science Digest - ${today}`,
            html: emailHtml
        });

        if (error) {
            console.log(`  ✗ Failed to send email: ${error.message}`);
            process.exit(1);
        }

        console.log(`  ✓ Email sent successfully! (ID: ${data.id})`);
    } catch (error) {
        console.log(`  ✗ Failed to send email: ${error.message}`);
        process.exit(1);
    }
}

async function main() {
    // Friendly check before we do anything that needs the AI.
    if (!process.env.ANTHROPIC_API_KEY) {
        console.log('\n❌ No ANTHROPIC_API_KEY found.');
        console.log('   Copy .env.example to .env and paste your key in, then run again.');
        console.log('   Get a key at https://console.anthropic.com (add a few $ of credit under Billing).\n');
        process.exit(1);
    }

    const articles = await fetchArticles();
    const curated = await curateArticles(articles);
    const summarized = await summarizeAllArticles(curated);

    const html = generateHTML(summarized);
    fs.writeFileSync('index.html', html);
    console.log('\n✅ Generated index.html');

    const emailHtml = generateEmailHTML(summarized);
    fs.writeFileSync('email.html', emailHtml);
    console.log('✅ Generated email.html');

    await sendEmail(emailHtml);
}

main();
