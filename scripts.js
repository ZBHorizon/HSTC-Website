document.addEventListener('DOMContentLoaded', () => {
    const onlinePlayers = document.getElementById('online-players');
    
    // Discord Widget API call zur Anzeige der Online-Spieler
    const updateOnlinePlayers = () => {
        fetch('https://discord.com/api/guilds/628996745837150211/widget.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                onlinePlayers.textContent = (data && typeof data.presence_count === 'number') ? data.presence_count : 'N/A';
            })
            .catch(err => {
                console.error('Failed to fetch Discord data:', err);
                onlinePlayers.textContent = 'N/A';
            });
    };
    updateOnlinePlayers();

    // Nav Login Button: führt zur Discord-OAuth2-Anmeldung
    const navLogin = document.getElementById('nav-login');
    navLogin.addEventListener('click', () => {
        const clientId = window.env.CLIENT_ID;
        const redirectUri = 'https://test.hstc.space/oauth2-redirect.html'; // Update mit Deiner Domain
        const scope = 'identify guilds guilds.members.read';
        const responseType = 'code';
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;
        window.location.href = authUrl;
    });

    // Entfernt nicht funktionierenden Tab-Code
    // ...eventuell vorhandener Tab-Code wurde entfernt...

    // Prüfe Login-Status und zeige ggf. den Bearbeitungsbereich für Schiffe
    const accessToken = localStorage.getItem('discordAccessToken');
    if (accessToken) {
        // (Optional) Zusätzliche Prüfung von Nutzerrollen könnte hier erfolgen.
        const shipEditDiv = document.getElementById('ship-edit');
        if (shipEditDiv) {
            shipEditDiv.style.display = 'block';
        }
    }

    // Schiff-Management: Formularverarbeitung
    const shipForm = document.getElementById('ship-management-form');
    if (shipForm) {
        shipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(shipForm);
            const ships = formData.getAll('ships[]');
            // Platzhalter: AJAX-Request zur Aktualisierung der Schiffsdaten an das Backend
            alert('Schiffe gespeichert: ' + ships.join(', '));
        });
    }

    // Event-Handling für Kalender-Aktionen
    document.querySelectorAll('.event-signup').forEach(button => {
        button.addEventListener('click', () => {
            alert('Du hast dich für dieses Event angemeldet!');
        });
    });
    document.querySelectorAll('.event-feedback').forEach(button => {
        button.addEventListener('click', () => {
            alert('Feedback-Funktion kommt bald!');
        });
    });
});