/************** Spotlight ****************************/

const spotlight = document.querySelector('#spotlight');
let spotXpos = 0;

window.addEventListener('mousemove', e => {
    spotlight.style.left = e.pageX + spotXpos + 'px';
    spotlight.style.top = e.pageY + 'px';
});
/****************************************************/


/********   Header and scrolling effect *************/

const headerToggle = document.getElementById('header-toggle'),
    main = document.getElementById('main'),
    navClose = document.getElementById('nav-close')

if (headerToggle) {
    headerToggle.addEventListener('click', function () {
        spotXpos = -600;
        main.classList.add('show-menu');
    })
}

if (navClose) {
    navClose.addEventListener('click', function () {
        spotXpos = 0;
        main.classList.remove('show-menu');
    })
}

const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const main = document.getElementById('main')
    main.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

function scrollHeader() {
    const header = document.getElementById('header')
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

navLink.forEach(link => {
    link.addEventListener('click', (e) => {
        // Check if the link is an external page (not a section)
        if (!link.getAttribute('href').startsWith('#')) {
            return; // Allow default behavior for external links
        }
        
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
/****************************************************/

/********************** typing effect **************************/

let array = [
    "Interactive Lessons",
    "Visualizing Math",
    "Coding Concepts",
    "Tech Meets Algebra",
    "Logic Through Code",
    "Equations in Action",
    "Math Made Engaging"
  ];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let letter = '';
let forward = true;
let isWaiting = false;

function type() {
    currentWord = array[wordIndex];
    if (isWaiting) return;
    if (forward) {
        if (letterIndex < currentWord.length) {
            letter = currentWord.charAt(letterIndex);
            document.getElementById('typed-text').innerText += letter;
            letterIndex++;
        } else {
            // Wait for 3 seconds before start deleting
            setTimeout(() => {
                forward = false;
                isWaiting = false;
                type();
            }, 1500);
            isWaiting = true;
        }
    } else {
        if (letterIndex >= 0) {
            document.getElementById('typed-text').innerText = currentWord.substring(0, letterIndex);
            letterIndex--;
        } else {
            // Move to next word
            if (wordIndex == array.length - 1) {
                wordIndex = 0;
            } else {
                wordIndex++;
            }
            letterIndex = 0;
            forward = true;
        }
    }
    setTimeout(type, 175);
}

type();



/****************************************************/

/********************** skills bar **************************/

// Function to start progress bar animation
function startProgressBarAnimation(progressBar, level) {
    let width = 0;
    let id = setInterval(frame, 10);

    function frame() {
        if (width >= level) {
            clearInterval(id);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }
}

let progressBars = document.querySelectorAll('.progress-bar');

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let level = entry.target.getAttribute('data-level');
            startProgressBarAnimation(entry.target, level);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

progressBars.forEach(progressBar => {
    observer.observe(progressBar);
});


/************************************************************************ */

/********************** projects **************************/

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            portfolioItems.forEach(item => {
                // Add fade out animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                        // Add fade in animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
});
