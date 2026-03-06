async function injectComponent(placeholderId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(placeholderId).innerHTML = html;
        lucide.createIcons(); 
    } catch (err) { console.error("Error loading:", filePath); }
}

window.addEventListener('DOMContentLoaded', () => {
    injectComponent('navbar-placeholder', 'navbar.html');
    injectComponent('sidebar-placeholder', 'sidebar.html');
    injectComponent('wallet-placeholder', 'wallet-card.html');
    injectComponent('foundry-placeholder', 'token-foundry.html');
    // لێرەدا دەتوانیت مارکێتیش زیاد بکەیت کە فایلی بۆ دروست کرد
});
