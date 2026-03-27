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
  // 7. UPDATE CURRENT YEAR
  // ==========================================
  const yearSpan = document.getElementById('year');
  if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
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