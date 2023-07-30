const historyObj = new CookieHistory();

document.addEventListener('DOMContentLoaded', () => {
    let stats = historyObj.getTodayStats();

    for (const [emotion, count] of Object.entries(stats)) {
        document.querySelector(`#${emotion}`).innerHTML = count;
    }
});
