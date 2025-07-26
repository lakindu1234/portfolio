// script.js

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
});

// EmailJS form submission handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this).then(
        function () {
            alert('✅ Message sent successfully!');
            document.getElementById('contactForm').reset();
        },
        function (error) {
            console.error('❌ Failed to send message:', error);
            alert('⚠️ Failed to send message. Please try again later.');
        }
    );
});
