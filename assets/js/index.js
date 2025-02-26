
//crea elemento
const video = document.createElement("video");

//nuestro camvas
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

//div donde llegara nuestro canvas
const btnScanQR = document.getElementById("btn-scan-qr");

//lectura desactivada
let scanning = false;

//funcion para encender la camara
const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

//funciones para levantar las funiones de encendido de la camara
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 30);
  }
}

//apagara la camara
const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

const activarSonido = () => {
  var audio = document.getElementById('audioScaner');
  audio.play();
}

//callback cuando termina de leer el codigo QR
qrcode.callback = (respuesta) => {
  if (respuesta) {
    //console.log(respuesta);
    Swal.fire(respuesta)
    activarSonido();
    //encenderCamara();    
    cerrarCamara(); 
    mostrarFormulario(respuesta);

    document.getElementById("unique-id").innerText = respuesta;
  }
};

function mostrarFormulario(respuesta) {
  const container = document.getElementById('form-container');
  container.style.display = 'block';
  //renderInventoryForm(respuesta);

  document.getElementById("unique-id").innerText = 'respuesta';

  const qrform = document.getElementById('formularioQR');
  qrform.style.display = 'block';
  

  // Ocultar el elemento con id="qr"
  const qrElement = document.getElementById('qr');
  if (qrElement) {
    qrElement.style.display = 'none';
  }
}


//evento para mostrar la camara sin el boton 
window.addEventListener('load', (e) => {
  //encenderCamara();
})

document.addEventListener('DOMContentLoaded', function() {
  // Simulación de obtener el texto de respuesta
  const responseText = "Texto de respuesta del código QR";

  // Almacenar el texto de respuesta en localStorage para que form.js pueda acceder a él
  localStorage.setItem('responseText', responseText);
});



function mostrarQR() {
  const qrElement = document.getElementById('qr');
  qrElement.style.display = 'block';

  const options = document.getElementById('options');
  options.style.display = 'none';

}

function mostrarSalas() {
  const qrElement = document.getElementById('salas');
  qrElement.style.display = 'block';

  const options = document.getElementById('options');
  options.style.display = 'none';

  renderConferenceRoom();

}

function newInventarioShow() {
  const invent = document.getElementById('newInventarioS');
  invent.style.display = 'block';
  //Swal.fire('Nuevo Inventario');

  //const options = document.getElementById('options');
  //options.style.display = 'none';

  renderNewInventario();
  
}

function buttonHome() {
  window.location.href = 'index.html';
}