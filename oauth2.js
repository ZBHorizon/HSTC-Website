document.addEventListener('DOMContentLoaded', () => {
    const clientId = window.env.CLIENT_ID;
    const redirectUri = window.env.REDIRECT_URI; // Update with your domain
    const scope = window.env.SCOPE;
    const responseType = window.env.RESPONSE_TYPE;

    const loginButton = document.getElementById('discord-login');

    loginButton.addEventListener('click', () => {
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;
        window.location.href = authUrl;
    });
});
