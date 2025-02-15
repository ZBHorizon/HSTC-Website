document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for Discord status update
    const onlinePlayers = document.getElementById('online-players');
    onlinePlayers.textContent = '42'; // Example value, replace with actual data

    // Placeholder for event countdown
    const countdownTimer = document.getElementById('countdown-timer');
    const eventDate = new Date('2023-12-31T23:59:59'); // Example date, replace with actual event date

    function updateCountdown() {
        const now = new Date();
        const timeDifference = eventDate - now;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        countdownTimer.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateCountdown, 1000);
});
