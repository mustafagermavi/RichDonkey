// 1. فەنکشنی سەرەکی بۆ بارکردنی هەموو فایلەکان
async function loadAllComponents() {
    const components = [
        { id: 'navbar-placeholder', file: 'navbar.html' },
        { id: 'sidebar-placeholder', file: 'sidebar.html' },
        { id: 'wallet-placeholder', file: 'wallet-card.html' },
        { id: 'foundry-placeholder', file: 'token-foundry.html' },
        { id: 'market-placeholder', file: 'market-feed.html' },
        { id: 'swap-placeholder', file: 'swap-engine.html' }
    ];

    for (const comp of components) {
        try {
            const response = await fetch(comp.file);
            const html = await response.text();
            document.getElementById(comp.id).innerHTML = html;
        } catch (err) {
            console.error("Error loading " + comp.file, err);
        }
    }
    // دوای بارکردنی هەموویان، ئایکۆنەکان چالاک دەکەین
    lucide.createIcons();
    setupLogic(); // چالاککردنی فرمانەکان
}

// 2. فەرمانەکانی نێوان بەشەکان (Logic Connection)
function setupLogic() {
    // ئەگەر کلیک لە دوگمەی دروستکردن کرا
    const launchBtn = document.querySelector('.btn-launch');
    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            const tokenName = document.querySelector('.premium-input').value;
            if(tokenName) {
                alert("🚀 Token " + tokenName + " is being deployed!");
                addNewTokenToMarket(tokenName); // ناردنی بۆ لیستی بازاڕ
            }
        });
    }
}

// 3. فەنکشن بۆ گواستنەوەی زانیاری بۆ بەشی بازاڕ
function addNewTokenToMarket(name) {
    const marketList = document.querySelector('#market-list-container');
    if (marketList) {
        const newRow = `
            <div class="new-coin-row animate-new">
                <div class="coin-meta">
                    <div class="token-avatar">#</div>
                    <div class="token-details">
                        <span class="t-name">${name}</span>
                        <span class="t-status">Newly Minted</span>
                    </div>
                </div>
                <div class="token-value">
                    <span class="t-price">$0.00001</span>
                </div>
            </div>
        `;
        marketList.insertAdjacentHTML('afterbegin', newRow);
    }
}

// دەستپێکردنی هەموو شتێک
window.addEventListener('DOMContentLoaded', loadAllComponents);
