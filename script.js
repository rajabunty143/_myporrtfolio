// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const skillBars = document.querySelectorAll('.skill-progress');

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skill Bars Animation
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillValue = skillBar.getAttribute('data-skill');
                skillBar.style.width = skillValue + '%';
                skillBar.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Contact Form Validation
function validateForm() {
    const form = contactForm;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    
    const nameError = form.querySelector('#nameError');
    const emailError = form.querySelector('#emailError');
    const messageError = form.querySelector('#messageError');
    const formSuccess = form.querySelector('#formSuccess');

    // Clear previous errors
    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formSuccess.style.display = 'none';
    }

    // Validate name
    function validateName(name) {
        if (name.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        }
        if (name.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        }
        nameError.textContent = '';
        return true;
    }

    // Validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            emailError.textContent = 'Email is required';
            return false;
        }
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    // Validate message
    function validateMessage(message) {
        if (message.trim() === '') {
            messageError.textContent = 'Message is required';
            return false;
        }
        if (message.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        }
        messageError.textContent = '';
        return true;
    }

    // Real-time validation
    nameInput.addEventListener('input', () => validateName(nameInput.value));
    emailInput.addEventListener('input', () => validateEmail(emailInput.value));
    messageInput.addEventListener('input', () => validateMessage(messageInput.value));

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isMessageValid = validateMessage(messageInput.value);

        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            formSuccess.style.display = 'block';
            formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });
}

// Smooth scroll for navigation links
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

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    animateSkillBars();
    validateForm();
});

// Typing animation for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add typing effect to hero title (uncomment if desired)
// const heroTitle = document.querySelector('.hero-title');
// const originalText = heroTitle.textContent;
// typeWriter(heroTitle, originalText, 150);

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation to elements
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => {
        el.classList.add('fade-in-up');
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    animateSkillBars();
    validateForm();
    addLoadingAnimation();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Export functions for testing (if needed)
window.Portfolio = {
    initTheme,
    validateForm,
    animateSkillBars
};
