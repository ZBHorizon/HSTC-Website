document.addEventListener('DOMContentLoaded', () => {
    const onlinePlayers = document.getElementById('online-players');tById('online-players');
    // Discord Widget API-Aufruf: https://discord.com/api/guilds/628996745837150211/widget.json996745837150211/widget.json
    fetch('https://discord.com/api/guilds/628996745837150211/widget.json')
        .then(res => res.json())        .then(res => res.json())
        .then(data => {
            if (data && data.presence_count) {
                onlinePlayers.textContent = data.presence_count;
            }
        })
        .catch(err => console.error(err));;

    // Event countdown functionality
    const eventCountdown = document.getElementById('event-countdown');
    const eventDate = new Date('2023-12-31T00:00:00'); // Example event dateent date
    const updateCountdown = () => {
        const now = new Date();  const now = new Date();
        const timeLeft = eventDate - now;w;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);1000 * 60)) / 1000);
        eventCountdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;{minutes}m ${seconds}s`;
    };
    setInterval(updateCountdown, 1000);

    // Tab Navigation LogicNavigation Logic
    document.querySelectorAll('.tab-button').forEach(button => {ument.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');data-tab');
            document.querySelectorAll('.tab-content').forEach(tc => {
                tc.style.display = (tc.id === tabId) ? 'block' : 'none';ock' : 'none';
            });     });
        });     });
    });    });








});
});    });
    });        tc.style.display = index === 0 ? 'block' : 'none';
        tc.style.display = index === 0 ? 'block' : 'none';    document.querySelectorAll('.tab-content').forEach((tc, index) => {
    document.querySelectorAll('.tab-content').forEach((tc, index) => {    // Initially nur die erste Sektion sichtbar
    // Initially nur die erste Sektion sichtbar