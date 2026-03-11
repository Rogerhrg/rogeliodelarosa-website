const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
hamburger.classList.toggle('open');
mobileMenu.classList.toggle('open');
});
function closeMenu() {
hamburger.classList.remove('open');
mobileMenu.classList.remove('open');
}
document.addEventListener('click', e => {
if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
});

const observer = new IntersectionObserver(entries => {
entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
});
}, {threshold: 0.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));