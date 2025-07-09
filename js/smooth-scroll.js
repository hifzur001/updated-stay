// Enhanced smooth scrolling functionality for the website

// Smooth scroll to services section
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = servicesSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }
}

// Smooth scroll to about section
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = aboutSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }
}

// Enhanced scroll functionality for "Learn More" button
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just a hash or modal trigger
            if (href === '#' || this.hasAttribute('data-bs-toggle')) {
                return;
            }

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const offset = 20; // Additional offset

                const targetPosition =
                    targetElement.offsetTop - navbarHeight - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    // Smooth scroll for "Explore Services" and "Learn More" buttons
    const exploreBtn = document.getElementById('exploreServicesBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', e => {
            e.preventDefault();
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition =
                    servicesSection.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', e => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition =
                    aboutSection.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    }

    // Add scroll spy functionality
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll(
        ".navbar-nav .nav-link[href^='#']"
    );

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle scroll events for better performance
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .destination-card, .step-card, .stat-card'
    );
    animateElements.forEach(el => observer.observe(el));
});
