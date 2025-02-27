// Obtiene el elemento del DOM con el id 'contenedorQR' y lo asigna a la variable contenedorQR
const contenedorQR = document.getElementById('contenedorQR');

// Obtiene el elemento del DOM con el id 'formulario' y lo asigna a la variable formulario
const formulario = document.getElementById('formulario');

// Obtiene el elemento del DOM con el id 'generarQR' y lo asigna a la variable botonGenerarQR
const botonGenerarQR = document.getElementById('generarQR');

// Crea una nueva instancia de QRCode y la asigna a la variable QR, utilizando contenedorQR como el contenedor del código QR
const QR = new QRCode(contenedorQR);

// Añade un evento 'submit' al formulario que se ejecuta cuando el formulario es enviado
formulario.addEventListener('submit', (e) => {
    // Previene el comportamiento por defecto del formulario (que recargue la página)
    e.preventDefault();
    
    // Genera un código QR con el valor del campo 'link' del formulario
    QR.makeCode(formulario.uniqueid.value);
});

// Añade un evento 'click' al botón que se ejecuta cuando el botón es clicado
botonGenerarQR.addEventListener('click', () => {
    // Genera un código QR con el valor del campo 'link' del formulario
    QR.makeCode(formulario.uniqueid.value);
});

function nuevoQR(){
  QR.makeCode(formulario.uniqueid.value);
}