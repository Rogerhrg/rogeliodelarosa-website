/**
 * Friction First - Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initModal();
    initAuthTabs();
    initAuthForms();
    initScrollAnimations();
    initNavbarScroll();
    animateCounters();
});

/* ============================================
   MODAL
   ============================================ */
function initModal() {
    const overlay = document.getElementById('authModal');
    const closeBtns = overlay?.querySelectorAll('[data-close-modal]');
    const openBtns = document.querySelectorAll('[data-open-modal]');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = btn.dataset.tab || 'login';
            openModal(tab);
        });
    });

    closeBtns?.forEach(btn => {
        btn.addEventListener('click', () => closeModal());
    });

    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Open modal if ?login=1 in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === '1') {
        openModal('login');
    }
    if (params.get('register') === '1') {
        openModal('register');
    }
}

function openModal(tab = 'login') {
    const overlay = document.getElementById('authModal');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchTab(tab);
    // Focus first input
    setTimeout(() => {
        const form = document.getElementById(tab + 'Form');
        form?.querySelector('input')?.focus();
    }, 300);
}

function closeModal() {
    const overlay = document.getElementById('authModal');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    clearAlerts();
}

/* ============================================
   AUTH TABS
   ============================================ */
function initAuthTabs() {
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
}

function switchTab(tabName) {
    // Tabs
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabName);
    });
    // Forms
    document.querySelectorAll('.auth-form').forEach(f => {
        f.classList.toggle('active', f.id === tabName + 'Form');
    });
    clearAlerts();
}

/* ============================================
   AUTH FORMS (AJAX)
   ============================================ */
function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAuth(loginForm, 'login');
    });

    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAuth(registerForm, 'register');
    });
}

async function handleAuth(form, action) {
    const btn = form.querySelector('button[type="submit"]');
    const alertEl = form.querySelector('.form-alert');

    // Client-side validation for register
    if (action === 'register') {
        const pw = form.querySelector('[name="password"]').value;
        const pw2 = form.querySelector('[name="password_confirm"]').value;
        const age = parseInt(form.querySelector('[name="age"]').value);
        const terms = form.querySelector('[name="terms"]')?.checked;

        if (pw.length < 8) {
            showAlert(alertEl, 'La contraseña debe tener al menos 8 caracteres.', 'error');
            return;
        }
        if (pw !== pw2) {
            showAlert(alertEl, 'Las contraseñas no coinciden.', 'error');
            return;
        }
        if (!age || age < 13 || age > 120) {
            showAlert(alertEl, 'Ingresa una edad válida (13-120).', 'error');
            return;
        }
        if (!terms) {
            showAlert(alertEl, 'Debes aceptar los términos y condiciones.', 'error');
            return;
        }
    }

    // Show loading
    btn.classList.add('loading');
    btn.disabled = true;
    clearAlerts();

    try {
        const formData = new FormData(form);
        formData.append('action', action);

        const response = await fetch('auth.php', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            showAlert(alertEl, data.message, 'success');
            setTimeout(() => {
                window.location.href = data.redirect;
            }, 800);
        } else {
            showAlert(alertEl, data.message, 'error');
        }
    } catch (err) {
        showAlert(alertEl, 'Error de conexión. Intenta de nuevo.', 'error');
    } finally {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

function showAlert(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = 'form-alert ' + type;
}

function clearAlerts() {
    document.querySelectorAll('.form-alert').forEach(a => {
        a.className = 'form-alert';
        a.textContent = '';
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card, .quote-card-preview, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add visible styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '16px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });
}

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                animateNumber(el, 0, target, 2000, suffix);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateNumber(el, start, end, duration, suffix) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(start + (end - start) * eased);

        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}
