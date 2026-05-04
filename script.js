document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       LANGUAGE TOGGLE — Click anywhere to switch
       ============================================ */
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'id'; // Default: Indonesian (circle on left = ID)

    langToggle.addEventListener('click', () => {
        if (currentLang === 'id') {
            currentLang = 'en';
            langToggle.classList.add('en');
        } else {
            currentLang = 'id';
            langToggle.classList.remove('en');
        }
        updateLanguage(currentLang);
    });

    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-id][data-en]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) el.textContent = text;
        });
    }


    /* ============================================
       NAVBAR SCROLL EFFECT
       ============================================ */
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    /* ============================================
       ACTIVE NAV LINK ON SCROLL
       ============================================ */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('header[id], section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scroll for nav clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const top = targetSection.offsetTop - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }

            // Close mobile nav if open
            closeMobileNav();
        });
    });


    /* ============================================
       MOBILE NAVIGATION
       ============================================ */
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', () => {
        const isOpen = navLinksContainer.classList.contains('open');
        if (isOpen) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    overlay.addEventListener('click', closeMobileNav);

    function openMobileNav() {
        hamburger.classList.add('open');
        navLinksContainer.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        hamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }


    /* ============================================
       SERVICE CARD TOGGLE
       ============================================ */
    window.toggleCard = function(btn) {
        const card = btn.closest('.service-card');
        const isExpanded = card.classList.contains('expanded');

        // Close all other expanded cards
        document.querySelectorAll('.service-card.expanded').forEach(c => {
            if (c !== card) c.classList.remove('expanded');
        });

        // Toggle current
        card.classList.toggle('expanded');
    };


    /* ============================================
       SCROLL REVEAL ANIMATIONS
       ============================================ */
    function setupRevealAnimations() {
        // Add reveal classes
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(h => h.classList.add('reveal'));

        const serviceCards = document.querySelectorAll('.services-grid');
        serviceCards.forEach(g => g.classList.add('reveal-stagger'));

        const portfolioShowcase = document.querySelectorAll('.portfolio-showcase');
        portfolioShowcase.forEach(g => g.classList.add('reveal-stagger'));

        const contactInner = document.querySelectorAll('.contact-inner');
        contactInner.forEach(c => c.classList.add('reveal'));

        // Observe
        const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    setupRevealAnimations();


    /* ============================================
       SMOOTH HOVER TILT FOR PORTFOLIO CARDS
       ============================================ */
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
