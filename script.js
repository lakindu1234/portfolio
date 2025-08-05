// script.js

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
});

// Initialize EmailJS with your public key
emailjs.init('0WQgKOw0-i0mnj4ya'); // Replace with your actual public key from EmailJS dashboard

// Get form elements
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const formMessages = document.getElementById('form-messages');
const loadingIndicator = document.getElementById('loading-indicator');

// ========================================
// MOBILE NAVIGATION FUNCTIONALITY
// ========================================

// Get navigation elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile navigation
function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('show');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile navigation
function closeMobileNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Event listener for hamburger menu
if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
}

// Close menu when clicking on navigation links (mobile)
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        // Only close on mobile (when toggle is visible)
        if (window.getComputedStyle(navToggle).display !== 'none') {
            closeMobileNav();
        }
    });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (window.getComputedStyle(navToggle).display !== 'none') {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileNav();
        }
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
        closeMobileNav();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
});

// ========================================
// BACK TO TOP BUTTON FUNCTIONALITY
// ========================================

const backToTopButton = document.getElementById('backToTop');

// Show/hide back to top button
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// Event listeners for back to top
window.addEventListener('scroll', toggleBackToTop);
if (backToTopButton) {
    backToTopButton.addEventListener('click', scrollToTop);
}

// ========================================
// SKILLS BAR ANIMATION
// ========================================

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');

                    // Add a small delay for better visual effect
                    setTimeout(() => {
                        skillBar.style.width = width + '%';
                    }, 200);

                    // Unobserve after animation
                    observer.unobserve(skillBar);
                }
            });
        },
        {
            threshold: 0.3,
        }
    );

    skillBars.forEach((bar) => {
        observer.observe(bar);
    });
}

// Initialize skill bar animation
document.addEventListener('DOMContentLoaded', animateSkillBars);

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================

// Enhanced smooth scrolling with offset for fixed header
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
});

// ========================================
// FORM HANDLING FUNCTIONS
// ========================================

// Function to show success message
function showSuccessMessage() {
    formMessages.classList.remove('hidden');
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
}

// Function to show error message
function showErrorMessage() {
    formMessages.classList.remove('hidden');
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
}

// Function to show loading indicator
function showLoadingIndicator() {
    loadingIndicator.classList.remove('hidden');
    formMessages.classList.add('hidden');
}

// Function to hide all messages
function hideAllMessages() {
    formMessages.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
}

// Function to reset form
function resetForm() {
    contactForm.reset();
}

// ========================================
// EMAIL FORM SUBMISSION
// ========================================

// Add event listener to form
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Show loading indicator
        showLoadingIndicator();

        // Send email using EmailJS
        emailjs.sendForm('service_uwzol6t', 'template_gsbrsug', this).then(
            function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showSuccessMessage();
                resetForm();

                // Hide success message after 5 seconds
                setTimeout(hideAllMessages, 5000);
            },
            function (error) {
                console.log('FAILED...', error);
                showErrorMessage();

                // Hide error message after 5 seconds
                setTimeout(hideAllMessages, 5000);
            }
        );
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

// Enhanced scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        observer.observe(section);
    });
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    toggleBackToTop();
}, 100);

// Replace the scroll event listener
window.removeEventListener('scroll', toggleBackToTop);
window.addEventListener('scroll', optimizedScrollHandler);

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Focus management for mobile menu
function manageFocus() {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// ========================================
// INITIALIZE ALL FUNCTIONS
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio loaded successfully!');

    // Initialize all functionality
    initScrollAnimations();
    manageFocus();

    // Add loading class removal after page load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when tab is visible
        document.body.classList.remove('paused');
    }
});

// ========================================
// ERROR HANDLING
// ========================================

// Global error handler
window.addEventListener('error', function (e) {
    console.error('Portfolio Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ========================================
// ADDITIONAL UTILITY FUNCTIONS
// ========================================

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Utility function for smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((reveal) => {
        if (isInViewport(reveal)) {
            reveal.classList.add('revealed');
        }
    });
}

// Throttled scroll event for reveal animations
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(revealOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
});

console.log('✅ Portfolio JavaScript loaded successfully!');
