// components.js

// 1. Inject components
async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(file);
            element.innerHTML = await response.text();
        } catch (error) { console.error(`Error loading ${file}:`, error); }
    }
}

// 2. Mobile Menu Logic (Global)
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('opLine1');
    const line2 = document.getElementById('opLine2');
    const line3 = document.getElementById('opLine3');
    if (!menu) return;

    const isClosed = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    
    if (line1) line1.classList.toggle('rotate-45', isClosed);
    if (line1) line1.classList.toggle('translate-y-1.5', isClosed);
    if (line2) line2.classList.toggle('opacity-0', isClosed);
    if (line3) line3.classList.toggle('-rotate-45', isClosed);
    if (line3) line3.classList.toggle('-translate-y-1.5', isClosed);
}

function toggleMobileAccordion(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.toggle('hidden');
}

// Initialize on load
document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent('header-placeholder', 'header.html');
    await loadComponent('footer-placeholder', 'footer.html');
});