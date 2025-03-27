const fetch = require("node-fetch");

async function generateShortUrl(longUrl) {
    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
            "Authorization": "Bearer YOUR_BITLY_ACCESS_TOKEN",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ long_url: longUrl }),
    });

    const data = await response.json();
    return data.link || longUrl;
}

module.exports = { generateShortUrl };
