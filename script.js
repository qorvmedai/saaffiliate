/* ===================================
   SA AFFILIATE BLUEPRINT — SCRIPTS
   Animations, Particles, Interactions
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- PARTICLE SYSTEM ---
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = particle.style.height = (2 + Math.random() * 3) + 'px';

            // Random golden hues
            const colors = ['#f59e0b', '#fbbf24', '#f97316', '#10b981', '#ef4444'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particleContainer.appendChild(particle);
        }
    }


    // --- SCROLL ANIMATIONS (Intersection Observer) ---
    const animElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(el => observer.observe(el));


    // --- FLOATING CTA ---
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.getElementById('hero');

    if (floatingCta && heroSection) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

            if (scrollY > heroBottom - 200) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }

            lastScroll = scrollY;
        }, { passive: true });
    }


    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            faqItems.forEach(faq => faq.classList.remove('open'));

            // Toggle clicked
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });


    // --- CTA BUTTON TRACKING (console log for analytics) ---
    const ctaButtons = document.querySelectorAll('[id$="CtaBtn"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnId = btn.id;
            console.log(`CTA Click: ${btnId} at ${new Date().toISOString()}`);
        });
    });


    // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // --- COUNTER ANIMATION (for trust section) ---
    function animateCounter(el, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }


    // --- HERO PARALLAX EFFECT ---
    const heroPhone = document.querySelector('.hero-phone-wrapper');
    if (heroPhone) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rate = scrollY * 0.15;
            heroPhone.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

});
