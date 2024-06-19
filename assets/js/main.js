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
        e.preventDefault();

        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
/****************************************************/

/********************** typing effect **************************/

let array = ["Crafting Digital Experiences", "Building Mobile Applications", "Designing Modern Web Interfaces", "Developing Scalable Backends"];
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
