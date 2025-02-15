document.addEventListener('DOMContentLoaded', () => {
    const clientId = '939491899226615808';
    const redirectUri = 'https://test.hstc.space/oauth2-redirect.html'; // Update with your domain
    const scope = 'identify guilds guilds.members.read';
    const responseType = 'code';

    const loginButton = document.getElementById('discord-login');

    loginButton.addEventListener('click', () => {
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;
        window.location.href = authUrl;
    });
});
