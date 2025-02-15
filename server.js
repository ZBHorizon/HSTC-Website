const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/auth/discord', (req, res) => {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = 'https://test.hstc.space/oauth2-redirect.html'; // Update with your domain
    const scope = 'identify guilds guilds.members.read';
    const responseType = 'code';

    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;
    res.redirect(authUrl);
});

app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = 'https://test.hstc.space/oauth2-redirect.html'; // Update with your domain

    if (!code) {
        return res.status(400).send('No authorization code provided');
    }

    try {
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            })
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.access_token) {
            res.cookie('discordAccessToken', tokenData.access_token, { httpOnly: true });
            res.redirect('/');
        } else {
            res.status(400).send('Failed to obtain access token');
        }
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
