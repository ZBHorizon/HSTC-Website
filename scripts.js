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

    const loginButton = document.getElementById('discord-login');

    loginButton.addEventListener('click', () => {
        const clientId = window.env.CLIENT_ID;
        const redirectUri = 'https://test.hstc.space/oauth2-redirect.html'; // Update with your domain
        const scope = 'identify guilds guilds.members.read';
        const responseType = 'code';

        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;
        window.location.href = authUrl;
    });

    const accessToken = localStorage.getItem('discordAccessToken');
    const guildId = 'YOUR_GUILD_ID'; // Replace with your Discord server ID

    if (accessToken) {
        fetchUserRoles(accessToken);
    }

    function fetchUserRoles(accessToken) {
        fetch(`https://discord.com/api/v9/users/@me/guilds/${guildId}/member`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.roles) {
                displayRoles(data.roles);
            } else {
                console.error('Failed to fetch user roles', data);
            }
        })
        .catch(error => {
            console.error('Error fetching user roles:', error);
        });
    }

    function displayRoles(roles) {
        const rolesContainer = document.getElementById('roles-container');
        rolesContainer.innerHTML = `<ul>${roles.map(role => `<li>${role}</li>`).join('')}</ul>`;
    }

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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});