function Reg_JSON() {
    var usuario = document.getElementById("usuario").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var mail = document.getElementById("mail").value;
    var telefono = document.getElementById("telefono").value;
    var direccion = document.getElementById("direccion").value;
    var consulta = document.getElementById("consulta").value;

    var formData = {
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        mail: mail,
        telefono: telefono,
        direccion: direccion,
        consulta: consulta
    };

    var jsonData = JSON.stringify(formData);

    console.log(jsonData);
 
    var urlServidorBase = 'http://127.0.0.1:5000/registros';

    fetch(urlServidorBase, {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
    });
}
function Act_JSON() {
    var usuario = document.getElementById("usuario").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var mail = document.getElementById("mail").value;
    var telefono = document.getElementById("telefono").value;
    var direccion = document.getElementById("direccion").value;
    var consulta = document.getElementById("consulta").value;

    var formData = {
        nombre: nombre,
        apellido: apellido,
        mail: mail,
        telefono: telefono,
        direccion: direccion,
        consulta: consulta
    };

    var jsonData = JSON.stringify(formData);

    console.log(jsonData);

    var urlServidorBase = 'http://127.0.0.1:5000/registros';
    var urlServidor = `${urlServidorBase}/${encodeURIComponent(usuario)}`;

    fetch(urlServidor, {
        method: 'PUT',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
    });
}
function Vis_JSON() {
    var usuario = document.getElementById("usuario").value;

    var urlServidorBase = 'http://127.0.0.1:5000/registros';
    var urlServidor = `${urlServidorBase}/${encodeURIComponent(usuario)}`;

    fetch(urlServidor, {
        method: 'GET',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
    });
}
function Del_JSON() {
    var usuario = document.getElementById("usuario").value;

    var urlServidorBase = 'http://127.0.0.1:5000/registros';
    var urlServidor = `${urlServidorBase}/${encodeURIComponent(usuario)}`;

    fetch(urlServidor, {
        method: 'DELETE',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
    });
}