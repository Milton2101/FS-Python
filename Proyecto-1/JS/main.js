document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function(event) {
        let valid = true;

        // Validar el campo Nombre------------------------------------
        const nombreInput = document.getElementById("nombre");
        const nombreError = document.getElementById("nombre-error");
        if (nombreInput.value.trim() === "") {
            valid = false;
            nombreError.innerText = "Por favor, ingrese su nombre.";
            nombreError.style.display = "block";
        } else {
            nombreError.style.display = "none";
        }

        // // Validar el campo Correo Electrónico------------------------------------
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value)) {
            valid = false;
            emailError.innerText = "Por favor, ingrese un correo electrónico válido.";
            emailError.style.display = "block";
        } else {
            emailError.style.display = "none";
        }

        // Validar el campo Mensaje------------------------------------
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

async function fetchDateTimeFromIP() {
    try {
        // Haciendo una petición a la API para obtener la fecha y hora basada en la IP del visitante
        const response = await fetch('http://worldtimeapi.org/api/ip');
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }

        const data = await response.json();
        const datetime = new Date(data.datetime);

        // Formatear la fecha y hora al formato que desees. Aquí, como ejemplo, se utiliza el formato "YYYY-MM-DD HH:mm:ss"
        const formattedDateTime = `${datetime.getFullYear()}-${String(datetime.getMonth() + 1).padStart(2, '0')}-${String(datetime.getDate()).padStart(2, '0')} ${String(datetime.getHours()).padStart(2, '0')}:${String(datetime.getMinutes()).padStart(2, '0')}:${String(datetime.getSeconds()).padStart(2, '0')}`;

        // Mostrar la fecha y hora en el div con id "currentDateTime"
        document.getElementById('currentDateTime').textContent = formattedDateTime;
    } catch (error) {
        console.error('Hubo un error al obtener la fecha y hora:', error);
    }
}

// Llamar a la función cuando se cargue el documento
window.onload = fetchDateTimeFromIP;
