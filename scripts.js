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