//Form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous errors
            restErrors();

            //Validate form
            const isValid = validateForm();

            if (isValid) {
                // Form is valid - submit data or show success message
                showSuccessMesssage();
            }
        });

        // Add input event listeners for real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
        });
    }
});

function validateForm() {
    let isValid = true;

    // Validate name
    const name =document.getElementById('name');
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Invalid email format');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError('messageError', "Please enter your message");
        isValid = false;
    } else if (message.value.length < 10) {
        showError('messageError', "Message must be at least 10 characters long");
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);

    // Clear error if field is valid
    if (field.checkValidity()) {
        errorElement.style.visibility = 'hidden';
        field.setAttribute('aria-invalid', 'false');
    }
}

function showError(elementId, message) {
    const errorELement = document.getElementById(elementId);
    if (errorELement) {
        errorELement.textContent = message;
        errorELement.style.visibility = 'visible';

        // Set aria-invalid on the corresponding input
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById
        if (inputElement) {
            inputElement.setAttribute('aria-invalid', 'true');
            inputElement.focus();
        }
    }
}

function resetErrors() {
    const errorMessage = document.querySelectorAll('.error-message');
    errorMessage.forEach(error => {
        error.style.visibility = 'hidden';
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.setAttribute('aria-invalid', 'false');
    });
}

function showSuccessMessage() {
    // In a real application, you would submit the form here
    // For demo purposes, we'll just show an alert
    alert('Thank you for your message! I will get back to you soon.');

    // Reset the form
    document.getElementById('contactForm').reset();
}