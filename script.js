/**
 * MEMECORP - Core Terminal Logic
 * مێشکی پڕۆژەکە: بەستنەوەی پارچەکان و بەڕێوەبردنی داتاکان
 */

// ١. فەنکشنی سەرەکی بۆ بارکردنی پێکهاتەکان (Components)
async function injectHTML(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        // دوای بارکردنی هەر بەشێک، ئایکۆنەکان نوێ دەکرێنەوە
        if (window.lucide) {
            window.lucide.createIcons();
        }
    } catch (error) {
        console.error('Component load error:', error);
    }
}

// ٢. فەنکشنی چالاککردنی "سێ خەتەکە" (Sidebar)
// ئەم فەنکشنە لەناو navbar و sidebar بانگ دەکرێت
window.toggleSide = function() {
    const sidebar = document.getElementById('side-menu');
    if (sidebar) {
        sidebar.classList.toggle('open');
    } else {
        // ئەگەر لە شوێنێکی تر بوو وەک dashboard
        const mainSidebar = document.getElementById('sidebar');
        if (mainSidebar) mainSidebar.classList.toggle('open');
    }
};

// ٣. مەکینەی نوێکردنەوەی لیستەکە (Market Logic)
// کاتێک لە Foundry کۆینێک دروست دەکرێت، ئەمە بانگ دەکرێت
window.addNewTokenToMarket = function(name, sym) {
    const list = document.getElementById('mList');
    if (list) {
        // ئەگەر لیستەکە خاڵی بوو، نووسینە بنەڕەتییەکە لاببە
        if (list.innerHTML.includes("Waiting")) {
            list.innerHTML = '';
        }

        // دروستکردنی ڕیزێکی نوێ بۆ مارکێت
        const item = document.createElement('div');
        item.className = 'market-item';
        item.innerHTML = `
            <div>
                <strong style="display:block;">${name.toUpperCase()}</strong>
                <small style="color:var(--dim)">${sym.toUpperCase()} / ETH</small>
            </div>
            <div style="text-align:right;">
                <div style="color:var(--accent); font-weight:800; font-size:0.9rem;">$0.00001</div>
                <div style="font-size:0.6rem; color:var(--dim)">Just Deployed</div>
            </div>
        `;

        // زیادکردنی بۆ سەرەوەی لیستەکە بە ئەنیمەیشنەوە
        list.prepend(item);
    }
};

// ٤. مەکینەی هەژمارکردنی گۆڕینەوە (Swap Calculation)
// دەتوانیت ئەمە بەکاربهێنیت بۆ ئەوەی نرخەکان بە شێوەی زیندوو بگۆڕێن
window.calculateSwap = function() {
    const ethInput = document.getElementById('swapIn');
    const tokenOutput = document.getElementById('swapOut');
    const rate = 1250000; // هەر ١ ئیشەریۆم یەکسانە بە ملیۆنێک و ٢٥٠ هەزار کۆین

    if (ethInput && tokenOutput) {
        ethInput.addEventListener('input', (e) => {
            const val = e.target.value;
            tokenOutput.value = val ? (val * rate).toLocaleString() : "";
        });
    }
};

// ٥. دەستپێکردنی هەموو شتێک کاتێک لاپەڕەکە بار دەبێت
window.addEventListener('DOMContentLoaded', () => {
    // بارکردنی پارچەکان بۆ ناو index.html
    injectHTML('navbar-placeholder', 'navbar.html');
    injectHTML('sidebar-placeholder', 'sidebar.html');
    injectHTML('wallet-placeholder', 'wallet-card.html');
    injectHTML('foundry-placeholder', 'token-foundry.html');
    injectHTML('swap-placeholder', 'swap-engine.html');
    injectHTML('market-placeholder', 'market-feed.html');

    // چالاککردنی مەکینەی گۆڕینەوە دوای کەمێک (تا فایلەکە بار دەبێت)
    setTimeout(() => {
        window.calculateSwap();
    }, 1000);
});
