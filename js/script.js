/**
 * script.js - Rogelio De La Rosa Landing Page
 * Funcionalidad para animaciones, navbar sticky, partículas y contadores.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. STICKY NAVBAR & MOBILE MENU
    // ==========================================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Sticky Scroll
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10));

    // Toggle Menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isActive = mobileMenu.classList.contains('active');
        // Simple animation on toggle spans
        const spans = menuToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ==========================================
    // 2. PARTICLE SYSTEM BACKGROUND
    // ==========================================
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positions
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation durations and delays
        particle.style.animationName = 'float-particle';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.animationIterationCount = 'infinite';
        particle.style.animationTimingFunction = 'ease-in-out';
        
        particlesContainer.appendChild(particle);
    }

    // ==========================================
    // 3. FLIP CARDS MOBILE BEHAVIOR (TAP)
    // ==========================================
    const flipCards = document.querySelectorAll('.service-card-flip');
    
    // For touch devices, add tap to flip
    if (window.matchMedia("(pointer: coarse)").matches) {
        flipCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove flipped from others
                flipCards.forEach(c => {
                    if (c !== this) c.classList.remove('flipped');
                });
                // Toggle current
                this.classList.toggle('flipped');
            });
        });
    }

    // ==========================================
    // 4. ANIMATED COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.metric-num');
    let hasCounted = false;

    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60fps approx
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }

    // ==========================================
    // 5. INTERSECTION OBSERVER (Scroll Anime)
    // ==========================================
    // Use obs-hide class in HTML for elements you want to fade in on scroll.
    // For elements already with fade-in-up, this is supplementary if desired.
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle Counters
                if (entry.target.classList.contains('social-proof') && !hasCounted) {
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, target);
                    });
                    hasCounted = true;
                }
            }
        });
    }, observerOptions);

    // Observe sections for counters
    const proofSection = document.querySelector('.social-proof');
    if(proofSection) scrollObserver.observe(proofSection);

    // ==========================================
    // 6. UPDATE CURRENT YEAR
    // ==========================================
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 7. CONTACT FORM AJAX SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const formResponse = document.getElementById('formResponse');
    const successState = document.getElementById('successState');
    const formWrapper = contactForm ? contactForm.closest('.form-wrapper') : null;

    if (contactForm && submitBtn && formResponse) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // 1. Estado de Carga
            submitBtn.classList.add('loading');
            const originalText = btnText.textContent;
            btnText.textContent = 'Enviando...';
            submitBtn.disabled = true;

            formResponse.style.display = 'none';
            formResponse.className = 'form-response';

            // 2. Recopilar Datos
            const formData = new FormData(contactForm);

            try {
                // 3. Enviar Petición
                const response = await fetch('contact.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.status === 'success') {
                    // 4a. ÉXITO → ocultar formulario, mostrar animación
                    contactForm.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    contactForm.style.opacity = '0';
                    contactForm.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        contactForm.style.display = 'none';
                        if (successState) {
                            successState.style.display = 'flex';
                        }
                    }, 400);
                } else {
                    // 4b. ERROR del servidor → mostrar mensaje inline
                    formResponse.style.display = 'block';
                    formResponse.textContent = result.message;
                    formResponse.classList.add('error');
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    btnText.textContent = originalText;
                }
            } catch (error) {
                // 5. Error de red
                console.error('Error enviando formulario:', error);
                formResponse.style.display = 'block';
                formResponse.className = 'form-response error';
                formResponse.textContent = 'Hubo un error de conexión. Intenta enviarnos un WhatsApp directamente.';
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                btnText.textContent = originalText;
            }
        });
    }
});

// Utility: Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}