const app = Vue.createApp({
    data() {
      return {
        usuario: '',
        nombre: '',
        apellido: '',
        mail: '',
        telefono: '',
        direccion: '',
        consulta: '',
        cajaRespuesta: '', // Para almacenar mensajes de respuesta
      };
    },
    methods: {
        Reg_JSON() {
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
                //console.log('Respuesta del servidor:', data);
                mostrarConfirmacionEnCaja();
            })
            .catch(error => {
                console.error('Error al enviar datos al servidor:', error);
            });
            
            function mostrarConfirmacionEnCaja() {
                var caja = document.getElementById('cajaRespuesta');
        
                if (caja) {
                    var mensajeConfirmacion = '¡Registro exitoso!';
        
                    caja.textContent = mensajeConfirmacion;
                } else {
                    console.error('No se encontró la caja de respuesta en el DOM.');
                }
            }
        },
        Act_JSON() {
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
                //console.log('Respuesta del servidor:', data);
                mostrarConfirmacionEnCaja();
            })
            .catch(error => {
                console.error('Error al enviar datos al servidor:', error);
            });
            
            function mostrarConfirmacionEnCaja() {
                var caja = document.getElementById('cajaRespuesta');
        
                if (caja) {
                    var mensajeConfirmacion = '¡Actualización exitosa!';
        
                    caja.textContent = mensajeConfirmacion;
                } else {
                    console.error('No se encontró la caja de respuesta en el DOM.');
                }
            }
        },
        Vis_JSON() {
            var usuario = document.getElementById("usuario2").value;
        
            var urlServidorBase = 'http://127.0.0.1:5000/registros';
            var urlServidor = `${urlServidorBase}/${encodeURIComponent(usuario)}`;
        
            fetch(urlServidor, {
                method: 'GET',
                //mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            })
            .then(response => response.json())
            .then(data => {
                //console.log('Respuesta del servidor:', data);
                mostrarRespuestaEnCaja(data);
            })
            .catch(error => {
                console.error('Error al enviar datos al servidor:', error);
            });
            
            function mostrarRespuestaEnCaja(data) {
                
                var caja = document.getElementById('cajaRespuesta');
        
                if (caja) {
                    if (data.registro) {
                        var registro = data.registro;
            
                        var cadenaFormateada = `Usuario: ${registro.usuario}\nTiempo: ${registro.tiempo}\nConsulta: ${registro.consulta}`;
                
                        caja.textContent = cadenaFormateada;
                    } else {
                        console.error('La propiedad "registro" no está presente en la respuesta del servidor.');
                    }
                } else {
                    console.error('No se encontró la caja de respuesta en el DOM.');
                }
            }
        },
        Del_JSON() {
            var usuario = document.getElementById("usuario2").value;
        
            var urlServidorBase = 'http://127.0.0.1:5000/registros';
            var urlServidor = `${urlServidorBase}/${encodeURIComponent(usuario)}`;
        
            fetch(urlServidor, {
                method: 'DELETE',
                //mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            })
            .then(response => response.json())
            .then(data => {
                //console.log('Respuesta del servidor:', data);
                mostrarConfirmacionEnCaja();
            })
            .catch(error => {
                console.error('Error al enviar datos al servidor:', error);
            });
            
            function mostrarConfirmacionEnCaja() {
                var caja = document.getElementById('cajaRespuesta');
        
                if (caja) {
                    var mensajeConfirmacion = '¡Eliminación exitosa!';
        
                    caja.textContent = mensajeConfirmacion;
                } else {
                    console.error('No se encontró la caja de respuesta en el DOM.');
                }
            }
        }
    },
});
  
app.mount('#app');