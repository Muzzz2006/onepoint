// components.js

// 1. Core Component Async Loader
async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(file);
            element.innerHTML = await response.text();
            
            // Re-bind click event hooks upon successful insertion
            if (file.includes('header.html')) {
                initMobileMenu();
            }
        } catch (error) { 
            console.error(`Error loading ${file}:`, error); 
        }
    }
}

function initMobileMenu() {
    const toggleBtn = document.getElementById('opMenuToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const menu = document.getElementById('mobile-menu');
        const l1 = document.getElementById('opLine1');
        const l2 = document.getElementById('opLine2');
        const l3 = document.getElementById('opLine3');
        
        if (!menu) return;

        const isClosed = menu.classList.contains('invisible');

        if (isClosed) {
            // OPEN DROP PANEL
            menu.classList.remove('invisible', 'opacity-0', '-translate-y-2', 'pointer-events-none');
            menu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            
            // FLAWLESS "X" SYMMETRY FOR FLUSH POSITIONING
            if (l1) l1.style.transform = "translateY(5px) rotate(45deg)";
            if (l2) { l2.style.opacity = "0"; l2.style.transform = "scale(0)"; }
            if (l3) l3.style.transform = "translateY(-5px) rotate(-45deg)";
        } else {
            // CLOSE DROP PANEL
            menu.classList.add('invisible', 'opacity-0', '-translate-y-2', 'pointer-events-none');
            menu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            
            // RETURN CLEANLY TO THREE BARS
            if (l1) l1.style.transform = "none";
            if (l2) { l2.style.opacity = "1"; l2.style.transform = "none"; }
            if (l3) l3.style.transform = "none";
        }
    });
}

// 3. Mobile Accordion Expansion Paths
function toggleMobileAccordion(id) {
    const segment = document.getElementById(id);
    const arrow = document.getElementById('arrow-' + id);
    if (!segment) return;

    const isOpen = !segment.classList.contains('hidden');
    const trackIds = ['mobile-home', 'mobile-features', 'mobile-templates', 'mobile-about', 'mobile-contact'];

    trackIds.forEach(trackId => {
        const el = document.getElementById(trackId);
        const ar = document.getElementById('arrow-' + trackId);
        if (el) el.classList.add('hidden');
        if (ar) ar.classList.remove('rotate-180', 'text-[#4F46E5]');
    });

    if (!isOpen) {
        segment.classList.remove('hidden');
        if (arrow) arrow.classList.add('rotate-180', 'text-[#4F46E5]');
    }
}

// 4. Active Page Route Highlighter Highlights
function highlightActiveNavigation() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const hash = window.location.hash;

    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('text-[#4F46E5]', 'border-[#4F46E5]'));
    document.querySelectorAll('.drop-link, .mob-link').forEach(el => el.classList.remove('text-[#4F46E5]', 'bg-slate-800', 'font-bold'));

    if (page === 'vision.html') {
        const h = document.getElementById('nav-home');
        if (h) h.classList.add('text-[#4F46E5]', 'border-[#4F46E5]');
        const ids = ['drop-vision', 'mob-vision'];
        ids.forEach(id => { if(document.getElementById(id)) document.getElementById(id).classList.add('text-[#4F46E5]', 'bg-slate-800', 'font-bold'); });
    } else if (page === 'catalog.html') {
        const t = document.getElementById('nav-templates');
        if (t) t.classList.add('text-[#4F46E5]', 'border-[#4F46E5]');
        let sub = hash === '#ecommerce' ? 'drop-ecommerce' : hash === '#landing' ? 'drop-landing' : 'drop-catalog';
        const dEl = document.getElementById(sub);
        const mEl = document.getElementById(sub.replace('drop-', 'mob-'));
        if (dEl) dEl.classList.add('text-[#4F46E5]', 'bg-slate-800', 'font-bold');
        if (mEl) mEl.classList.add('text-[#4F46E5]', 'bg-slate-800', 'font-bold');
    } else if (page === 'about.html') {
        const a = document.getElementById('nav-about');
        if (a) a.classList.add('text-[#4F46E5]', 'border-[#4F46E5]');
        let sub = hash === '#founder' ? 'drop-founder' : 'drop-blueprint';
        const dEl = document.getElementById(sub);
        const mEl = document.getElementById(sub.replace('drop-', 'mob-'));
        if (dEl) dEl.classList.add('text-[#4F46E5]', 'bg-slate-800', 'font-bold');
        if (mEl) mEl.classList.add('text-[#4F46E5]', 'bg-slate-800', 'font-bold');
    } else if (page === 'contact.html') {
        const c = document.getElementById('nav-contact');
        if (c) c.classList.add('text-[#4F46E5]', 'border-[#4F46E5]');
        ['drop-contract', 'mob-contract'].forEach(id => { if(document.getElementById(id)) document.getElementById(id).classList.add('text-[#4F46E5]', 'bg-slate-800', 'font-bold'); });
    } else {
        const h = document.getElementById('nav-home');
        if (h && !hash) h.classList.add('text-[#4F46E5]', 'border-[#4F46E5]');
    }
}

// Global Core Asynchronous Bootstrap Chain
document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent('header-placeholder', 'header.html');
    await loadComponent('footer-placeholder', 'footer.html');
    highlightActiveNavigation();
    window.addEventListener('hashchange', highlightActiveNavigation);
});