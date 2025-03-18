document.addEventListener('DOMContentLoaded', () => {
    // Scroll triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                if (!entry.target.classList.contains('keep-observing')) {
                    animationObserver.unobserve(entry.target);
                }
            } else if (entry.target.classList.contains('keep-observing')) {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe elements with scroll animations
    document.querySelectorAll('.scroll-fade-in, .scroll-slide-in').forEach(element => {
        animationObserver.observe(element);
    });

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const rect = element.getBoundingClientRect();
                    const visible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (visible) {
                        const yPos = -(window.scrollY * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Text reveal animation for headings
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        if (!heading.classList.contains('fade-in') && !heading.classList.contains('text-reveal')) {
            heading.classList.add('text-reveal');
        }
    });
});