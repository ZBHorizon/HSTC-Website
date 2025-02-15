document.addEventListener('DOMContentLoaded', () => {
    const clientId = '939491899226615808';
    const redirectUri = window.location.origin + '/oauth2-redirect.html';
    const scope = 'identify';
    const responseType = 'token';

    const loginButton = document.getElementById('discord-login');

    loginButton.addEventListener('click', () => {
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;
        window.location.href = authUrl;
    });
});
