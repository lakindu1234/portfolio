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

// Add event listener to form
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

// Alternative method using emailjs.send() for more control
// Uncomment this section if you prefer to use emailjs.send() instead of emailjs.sendForm()
/*
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading indicator
    showLoadingIndicator();

    // Get form data
    const templateParams = {
        user_name: document.getElementById('name').value,
        user_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
            resetForm();

            // Hide success message after 5 seconds
            setTimeout(hideAllMessages, 5000);
        }, function(error) {
            console.log('FAILED...', error);
            showErrorMessage();

            // Hide error message after 5 seconds
            setTimeout(hideAllMessages, 5000);
        });
});
*/
