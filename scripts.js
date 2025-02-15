document.addEventListener('DOMContentLoaded', () => {
    const onlinePlayers = document.getElementById('online-players');
    
    // Discord Widget API call with error handling and retries
    const updateOnlinePlayers = () => {
        fetch('https://discord.com/api/guilds/628996745837150211/widget.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data && typeof data.presence_count === 'number') {
                    onlinePlayers.textContent = data.presence_count;
                } else {
                    onlinePlayers.textContent = 'N/A';
                }
            })
            .catch(err => {
                console.error('Failed to fetch Discord data:', err);
                onlinePlayers.textContent = 'N/A';
            });
    };

    // Update initially and then every 60 seconds
    updateOnlinePlayers();
    setInterval(updateOnlinePlayers, 60000);

    // Event countdown functionality
    const eventCountdown = document.getElementById('event-countdown');
    const eventDate = new Date('2023-12-31T00:00:00'); // Example event date
    const updateCountdown = () => {
        const now = new Date();
        const timeLeft = eventDate - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        eventCountdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
    setInterval(updateCountdown, 1000);

    // Tab Navigation Logic
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(tc => {
                tc.style.display = (tc.id === tabId) ? 'block' : 'none';
            });
        });
    });

    // Initially nur die erste Sektion sichtbar
    document.querySelectorAll('.tab-content').forEach((tc, index) => {
        tc.style.display = index === 0 ? 'block' : 'none';
    });
});