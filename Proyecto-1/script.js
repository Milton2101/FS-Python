document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function(event) {
        let valid = true;

        const nombreInput = document.getElementById("nombre");
        const nombreError = document.getElementById("nombre-error");
        if (nombreInput.value.trim() === "") {
            valid = false;
            nombreError.innerText = "Por favor, ingrese su nombre.";
            nombreError.style.display = "block";
        } else {
            nombreError.style.display = "none";
        }

        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value)) {
            valid = false;
            emailError.innerText = "Por favor, ingrese un email válido.";
            emailError.style.display = "block";
        } else {
            emailError.style.display = "none";
        }

        const mensajeInput = document.getElementById("mensaje");
        const mensajeError = document.getElementById("mensaje-error");
        if (mensajeInput.value.trim() === "") {
            valid = false;
            mensajeError.innerText = "Por favor, ingrese un mensaje.";
            mensajeError.style.display = "block";
        } else {
            mensajeError.style.display = "none";
        }

        if (!valid) {
            event.preventDefault();
        }
    });
});
