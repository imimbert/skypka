document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle?.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks?.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navLinks?.classList.contains('active')) {
            mobileMenuToggle?.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Navbar background opacity on scroll
    const nav = document.querySelector('.main-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (window.scrollY > lastScrollY) {
            nav?.classList.add('nav-hidden');
        } else {
            nav?.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            if (navLinks?.classList.contains('active')) {
                mobileMenuToggle?.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});