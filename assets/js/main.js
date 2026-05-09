/************** Modern Navigation ****************************/

// Modern Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('show');
        const isOpen = navMenu.classList.contains('show');

        // Toggle aria-expanded (#20)
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (isOpen) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');

            // Reset hamburger menu + aria-expanded (#20)
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation menu');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle internal links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Navbar scroll effect — adds/removes .scrolled class so CSS handles theming
function scrollNavbar() {
    const navbar = document.getElementById('modern-nav');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Event listeners — rAF throttle prevents scroll-handler INP spikes on mobile
let scrollPending = false;
window.addEventListener('scroll', () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
        updateActiveNavLink();
        scrollNavbar();
        scrollPending = false;
    });
}, { passive: true });

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle || !navMenu) return;
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');

        // Reset hamburger menu + aria-expanded (#20)
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

/****************************************************/

/********************** Theme Toggle **************************/

(function () {
    const root = document.documentElement;
    const STORAGE_KEY = 'theme';

    // Apply saved theme on load (prefers-color-scheme is the CSS fallback)
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        root.setAttribute('data-theme', saved);
    }

    function getCurrentTheme() {
        return root.getAttribute('data-theme') ||
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;
        if (theme === 'light') {
            btn.innerHTML = '<i class="bx bxs-moon"></i>';
            btn.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            btn.innerHTML = '<i class="bx bxs-sun"></i>';
            btn.setAttribute('aria-label', 'Switch to light mode');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;

        const current = getCurrentTheme();
        updateToggleIcon(current);

        btn.addEventListener('click', () => {
            const next = getCurrentTheme() === 'light' ? 'dark' : 'light';
            applyTheme(next);
        });
    });
})();

/****************************************************/

/********************** Animated Counter **************************/

// Animate statistics numbers
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Intersection Observer for statistics animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            entry.target.textContent = '0'; // Start from 0
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

/****************************************************/

/********************** Modal Handling **************************/

// Modal functionality
const modal = document.getElementById('contactModal');
const openModalBtn = document.getElementById('openContactModal');
const closeModalBtn = document.getElementById('closeContactModal');
const cancelBtn = document.getElementById('cancelBtn');

// Open modal (#21, #22, #25)
if (openModalBtn) {
    openModalBtn.addEventListener('click', function () {
        if (modal) {
            lastFocused = document.activeElement;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            // Move focus to first focusable element inside modal
            const focusable = getFocusableElements();
            if (focusable.length > 0) focusable[0].focus();
            modal.addEventListener('keydown', trapFocus);
        }
    });
}

// Close modal functions (#21, #22, #25)
function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.removeEventListener('keydown', trapFocus);
    document.body.style.overflow = ''; // Restore scrolling
    // Restore focus to trigger (#25)
    if (lastFocused && lastFocused.focus) {
        lastFocused.focus();
    } else if (openModalBtn) {
        openModalBtn.focus();
    }
    lastFocused = null;
    // Reset form
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        // Clear aria-invalid on all inputs
        form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.style.display = 'none';
        }
    }
}

// Close modal event listeners
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Focus trap + focus restore for modal (#21, #22, #25)
let lastFocused = null;

function getFocusableElements() {
    if (!modal) return [];
    return Array.from(modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.disabled && el.offsetParent !== null);
}

function trapFocus(e) {
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (modal && e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

/********************** Form Handling **************************/

// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init("dyiFkwogR3sfUm21i");
        } catch (error) { /* EmailJS unavailable — form falls back gracefully */ }
    }
})();

// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const formMessage = document.getElementById('formMessage');

if (contactForm && submitBtn && btnText && btnLoading && formMessage) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation (#81)
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const messageEl = document.getElementById('message');
        // Clear previous invalid states
        [nameEl, emailEl, messageEl].forEach(el => { if (el) el.removeAttribute('aria-invalid'); });

        if (!name || !email || !message) {
            if (!name && nameEl) nameEl.setAttribute('aria-invalid', 'true');
            if (!email && emailEl) emailEl.setAttribute('aria-invalid', 'true');
            if (!message && messageEl) messageEl.setAttribute('aria-invalid', 'true');
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation (#81)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (emailEl) emailEl.setAttribute('aria-invalid', 'true');
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);

        // Prepare template parameters
        const templateParams = {
            to_email: 'mtnsalah@gmail.com',
            from_name: name,
            from_email: email,
            message: `**From:** ${name}\n**Email:** ${email}\n\n**Message:**\n${message}`,
            reply_to: email,
            user_name: name,
            user_email: email,
            user_message: message,
            sender_name: name,
            sender_email: email
        };

        // Send email using EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_jaceyjn', 'template_9jent4n', templateParams)
                .then(function () {
                    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    contactForm.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
                    // Close modal after 2 seconds on success
                    setTimeout(() => {
                        closeModal();
                    }, 2000);
                }, function () {
                    showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
                })
                .finally(function () {
                    setLoadingState(false);
                });
        } else {
            showMessage('Contact form not available. Please contact me directly.', 'error');
            setLoadingState(false);
        }
    });
}

// Helper function to show messages
function showMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Helper function to set loading state
function setLoadingState(isLoading) {
    if (!btnText || !btnLoading || !submitBtn) return;
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

/****************************************************/

/********************** Smooth Animations **************************/

// .fade-in / .fade-in--visible — class-based approach so CSS owns the transition
// Skipped entirely when user prefers reduced motion.
document.addEventListener('DOMContentLoaded', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length === 0) return;

    if (prefersReduced) {
        // Reveal immediately without animation
        fadeEls.forEach(el => el.classList.add('fade-in--visible'));
        return;
    }

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in--visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObserver.observe(el));

    // Legacy inline-style observer for .hero-content / .about-content on older pages
    const legacyEls = document.querySelectorAll('.hero-content, .about-content');
    if (legacyEls.length > 0) {
        const legacyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        legacyEls.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            legacyObserver.observe(el);
        });
    }
});

/****************************************************/

/********************** Blog Filtering **************************/

// Simple blog filtering functionality
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (categoryButtons.length === 0 || blogCards.length === 0) return;

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedCategory = this.getAttribute('data-category');

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                card.style.display = (selectedCategory === 'all' || cardCategory === selectedCategory) ? 'block' : 'none';
            });
        });
    });
});

/****************************************************/
