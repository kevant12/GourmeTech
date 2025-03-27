// Sélection du formulaire
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('button[type="submit"]');

// Fonction de validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation en temps réel de l'email
emailInput.addEventListener('input', () => {
    const isValid = isValidEmail(emailInput.value);
    emailInput.classList.toggle('invalid', !isValid);

    // Mise à jour du message d'erreur
    const errorSpan = emailInput.nextElementSibling;
    if (!isValid && emailInput.value) {
        if (!errorSpan) {
            const span = document.createElement('span');
            span.className = 'error-message';
            span.textContent = 'Veuillez entrer une adresse email valide';
            emailInput.parentNode.insertBefore(span, emailInput.nextSibling);
        }
    } else if (errorSpan?.className === 'error-message') {
        errorSpan.remove();
    }
});

// Validation en temps réel du message
messageInput.addEventListener('input', () => {
    const isValid = messageInput.value.length >= 10;
    messageInput.classList.toggle('invalid', !isValid);

    // Mise à jour du message d'erreur
    const errorSpan = messageInput.nextElementSibling;
    if (!isValid && messageInput.value) {
        if (!errorSpan) {
            const span = document.createElement('span');
            span.className = 'error-message';
            span.textContent = 'Le message doit contenir au moins 10 caractères';
            messageInput.parentNode.insertBefore(span, messageInput.nextSibling);
        }
    } else if (errorSpan?.className === 'error-message') {
        errorSpan.remove();
    }
});

// Gestion de la soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isEmailValid = isValidEmail(emailInput.value);
    const isMessageValid = messageInput.value.length >= 10;

    if (!isEmailValid || !isMessageValid) {
        // Afficher les messages d'erreur
        if (!isEmailValid) {
            emailInput.classList.add('invalid');
        }
        if (!isMessageValid) {
            messageInput.classList.add('invalid');
        }
        return;
    }

    // Simulation d'envoi du formulaire
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';

    // Simulation d'une requête API
    setTimeout(() => {
        // Réinitialisation du formulaire
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer';

        // Message de succès
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Votre message a été envoyé avec succès !';
        form.parentNode.insertBefore(successMessage, form);

        // Suppression du message après 3 secondes
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }, 1000);
});