document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('discord-login');

    loginButton.addEventListener('click', () => {
        window.location.href = '/auth/discord';
    });
});
