// script.js

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
});

// Initialize EmailJS
emailjs.init('0WQgKOw0-i0mnj4ya'); // Replace with your Public Key

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

    emailjs.send('service_uwzol6t', 'template_gsbrsug', templateParams).then(
        function (response) {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        },
        function (error) {
            alert('Failed to send message. Please try again.');
        }
    );
});
