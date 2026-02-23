// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true,
    offset: 100,
    duration: 800,
    easing: 'ease-out-cubic',
});

// Initialize Typed.js
const typed = new Typed('#typed-text', {
    strings: [
        'Programmer',
        'FinTech Enthusiast',
        'Problem Solver',
        'Leader'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    smartBackspace: true,
});

// Initialize Particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#00f2ff"
        },
        "shape": {
            "type": "circle",
        },
        "opacity": {
            "value": 0.3,
            "random": true,
        },
        "size": {
            "value": 3,
            "random": true,
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#4d4dff",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.8
                }
            },
            "push": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        document.body.style.overflow = 'auto';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black/80', 'shadow-lg');
        navbar.classList.remove('bg-black/30');
    } else {
        navbar.classList.remove('bg-black/80', 'shadow-lg');
        navbar.classList.add('bg-black/30');
    }
});

// GSAP Interactive Effects (Optional simple parallax or hover)
// Example: Parallax on the profile image container
const heroSection = document.getElementById('home');
const profileContainer = document.querySelector('.order-1.md\\:order-2'); // Hexagon container

if (heroSection && profileContainer) {
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.02;
        const y = (e.clientY - window.innerHeight / 2) * 0.02;

        gsap.to(profileContainer, {
            x: x,
            y: y,
            duration: 1,
            ease: "power2.out"
        });
    });
}

// WhatsApp Contact Logic
const sendBtn = document.getElementById('send-btn');

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        const phoneNumber = '8801572902196';

        // Formatting the message for WhatsApp
        // Using encodeURIComponent is better for handling special characters
        const formattedMessage = `*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
        const encodedMessage = encodeURIComponent(formattedMessage);

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    });
}

// Auto Update Copyright Year
const yearSpan = document.getElementById('copyright-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ===== CUSTOM CURSOR =====
(function () {
    const dot = document.getElementById('cursor-dot');
    const glow = document.getElementById('cursor-glow');

    if (!dot || !glow) return;

    // Skip on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    // Track mouse position instantly for the dot
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Move the small dot instantly (no lag)
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Animate the glow ring with smooth lerp (lag behind)
    function animateGlow() {
        // Linear interpolation for smooth trailing effect
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Hover effect on interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, label, [role="button"], .glass-card';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Click effect
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        glow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        glow.style.opacity = '1';
    });
})();
