 document.getElementById('nav-toggle').addEventListener('click', function() {
    document.getElementById('nav-content').classList.toggle('hidden');
});

function submitForm() {
    alert('Form submitted! (This is a placeholder)');
}


document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        "A Web Dev", 
        "A Graphics Designer", 
        "A Network Engineer",
        "A Data Analysis"
    ];
    const typingElement = document.getElementById('typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            typingElement.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;
        }
        
        if (isDeleting && charIndex >= 0) {
            typingElement.textContent = currentText.slice(0, charIndex);
            charIndex--;
        }
        
        if (!isDeleting && charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
        }
        
        if (isDeleting && charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeText, speed);
    }

    typeText();

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Message successfully submitted!');
                form.reset();
            } else {
                alert('Oops! There was a problem submitting your form');
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        });
    });
});
