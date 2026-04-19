const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const defaultLabel = submitButton ? submitButton.textContent : '';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://formsubmit.co/ajax/juliuspex5@gmail.com', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Form submission failed.');
            }

            window.location.href = 'thank-you.html';
        } catch (error) {
            window.alert('Message could not be sent right now. Please try again.');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = defaultLabel;
            }
        }
    });
}
