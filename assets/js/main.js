/************** Modern Navigation ****************************/

// Modern Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('show');

        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('show')) {
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
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');

            // Reset hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle internal links
        if (href.startsWith('#')) {
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

// Navbar scroll effect
function scrollNavbar() {
    const navbar = document.getElementById('modern-nav');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    scrollNavbar();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');

        // Reset hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

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

// Open modal
if (openModalBtn) {
    openModalBtn.addEventListener('click', function () {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
}

// Close modal functions
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
    // Reset form
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
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

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

/********************** Project Modal **************************/

// Project modal elements
const projectModal = document.getElementById('projectModal');
const closeProjectModalBtn = document.getElementById('closeProjectModal');
const projectDetailsBtns = document.querySelectorAll('.project-details-btn');

// Project data
const projectData = {
    mathlogame: {
        title: 'MathLogame Platform',
        subtitle: 'Revolutionary Mathematics Learning Platform',
        description: 'My flagship educational platform that combines modern web development with innovative teaching methods. Built with cutting-edge technologies, MathLogame transforms how students experience mathematics through interactive, gamified learning experiences. The platform features responsive design, real-time interactions, and advanced analytics to optimize learning outcomes.',
        image: './assets/images/Projects/math-booklet.png',
        tags: ['Education', 'Mathematics', 'Interactive Learning', 'Web Development', 'Gamification'],
        links: [
            { text: 'Visit Platform', url: 'mathlogame.html', icon: 'bx bx-link-external' },
            { text: 'Preview PDF', url: './assets/pdf/mathlogame-preview.pdf', icon: 'bx bx-file-pdf' },
        ]
    },
    kidlogame: {
        title: 'KIDLOGAME',
        subtitle: 'Educational Gaming for Children',
        description: 'A comprehensive educational gaming app designed specifically for children. Built with Flutter, this mobile application combines learning with fun through interactive games and activities. The app features age-appropriate content, engaging animations, and progress tracking to make learning enjoyable for young minds.',
        image: './assets/images/Projects/KidloGame.png',
        tags: ['Flutter', 'Mobile App', 'Education', 'Children', 'Gaming'],
        links: []
    },
    'python-book': {
        title: 'Python Fundamentals for Kids',
        subtitle: 'Comprehensive Python Learning Resource',
        description: 'A complete Python learning resource designed to make coding accessible and enjoyable for young learners. This comprehensive guide covers fundamental programming concepts through interactive examples, exercises, and projects. Perfect for beginners and educators looking to introduce programming to children.',
        image: './assets/images/Projects/Python-book.png',
        tags: ['Python', 'Education', 'Content Creation', 'Programming', 'Beginner-Friendly'],
        links: [
            { text: 'Download PDF', url: './assets/pdf/Learnprogrammingwithpython-1.pdf', icon: 'bx bx-file-pdf' },
        ]
    },
    'web-course': {
        title: 'Arabic Web Course',
        subtitle: 'Complete Web Development Course in Arabic',
        description: 'A comprehensive web development course in Arabic, covering both front-end and back-end technologies. This course is designed for Arabic-speaking learners who want to master modern web development. Includes practical projects, real-world examples, and step-by-step tutorials.',
        image: './assets/images/Projects/Book-design-web.png',
        tags: ['Web Development', 'Education', 'Arabic', 'Frontend', 'Backend'],
        links: [
            { text: 'Download Course', url: './assets/pdf/Easy WEB.pdf', icon: 'bx bx-file-pdf' },
        ]
    },
    routiney: {
        title: 'Routiney App',
        subtitle: 'Productive Daily Routines & Habit Tracking',
        description: 'A mobile application designed to help users create and maintain productive daily routines and habits. Features include habit tracking, progress visualization, reminders, and community support. Built with modern mobile development practices for optimal performance and user experience.',
        image: './assets/images/Projects/Routiney.png',
        tags: ['Mobile App', 'Productivity', 'Habit Tracking', 'User Experience', 'Health'],
        links: []
    },
    coachninja: {
        title: 'CoachNinja Platform',
        subtitle: 'Comprehensive Coaching & Mentoring Platform',
        description: 'A comprehensive coaching and mentoring platform that connects coaches with students for personalized learning experiences. Features include video conferencing, progress tracking, payment processing, and community features. Designed to facilitate meaningful mentor-student relationships.',
        image: './assets/images/Projects/coachninja.jpeg',
        tags: ['Coaching', 'Platform', 'Mentoring', 'Video Conferencing', 'E-learning'],
        links: [
            { text: 'Visit Platform', url: 'https://abdurrahmanninja.github.io/coach-abdualrhman-33/', icon: 'bx bx-link-external' }
        ]
    }
};

// Open project modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Update modal content
    document.getElementById('projectModalTitle').textContent = project.title;
    document.getElementById('projectModalSubtitle').textContent = project.subtitle;
    document.getElementById('projectModalDescription').textContent = project.description;
    document.getElementById('projectModalImage').src = project.image;
    document.getElementById('projectModalImage').alt = project.title;

    // Update tags
    const tagsContainer = document.getElementById('projectModalTags');
    tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // Update links
    const linksContainer = document.getElementById('projectModalLinks');
    linksContainer.innerHTML = project.links.map(link =>
        `<a href="${link.url}" target="_blank" rel="noopener">
            <i class="${link.icon}"></i>
            ${link.text}
        </a>`
    ).join('');

    // Show modal
    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Event listeners for project modal
if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', closeProjectModal);
}

// Project details button click handlers
projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Close project modal when clicking outside
if (projectModal) {
    projectModal.addEventListener('click', function (e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// Close project modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModal.classList.contains('show')) {
        closeProjectModal();
    }
});

/********************** Form Handling **************************/

// Initialize EmailJS
(function () {
    emailjs.init("dyiFkwogR3sfUm21i");
})();

// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
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
            // Alternative parameters that might work with your template
            user_name: name,
            user_email: email,
            user_message: message,
            sender_name: name,
            sender_email: email
        };

        // Send email using EmailJS
        emailjs.send('service_jaceyjn', 'template_9jent4n', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                // Close modal after 2 seconds on success
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }, function (error) {
                console.log('FAILED...', error);
                showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
            })
            .finally(function () {
                setLoadingState(false);
            });
    });
}

// Helper function to show messages
function showMessage(message, type) {
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-content, .about-content, .mathlogame-content, .portfolio-card, .contact-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

/****************************************************/
