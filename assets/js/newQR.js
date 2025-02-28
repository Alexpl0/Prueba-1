$(document).ready(function () {
  // Cuando el documento esté listo, se ejecutará esta función

  $('#generate-button').on('click', function () {
      // Cuando se haga clic en el botón de generar, se ejecutará esta función

      var text = $('#uniqueid').val();
      // Obtiene el texto ingresado por el usuario en el campo de entrada con id "uniqueid"

      if (!text) {
          alert("Please enter text for the QR code.");
          // Si no se ha ingresado texto, muestra una alerta y detiene la ejecución
          return;
      }

      // Limpia cualquier código QR previo en el contenedor
      $('#qrcode-container').empty();

      // Crea un nuevo código QR en el contenedor con el texto ingresado
      var qrcode = new QRCode(document.getElementById('qrcode-container'), {
          text: text,
          width: 256,
          height: 256
      });

      // Crea una nueva imagen para el logo
      var logo = new Image();
      logo.src= "../media/images.png"; // Actualiza la ruta a tu logo.png

      // Espera a que el logo se cargue, luego lo superpone en el código QR
      logo.onload = function () {
          var qrcodeContainer = $('#qrcode-container');
          var canvas = qrcodeContainer.find('canvas')[0];
          // Obtiene el canvas del código QR generado

          // Crea un nuevo canvas para combinar el código QR y el logo
          var combinedCanvas = document.createElement('canvas');
          combinedCanvas.width = canvas.width;
          combinedCanvas.height = canvas.height;

          // Dibuja el código QR en el nuevo canvas
          var ctx = combinedCanvas.getContext('2d');
          ctx.drawImage(canvas, 0, 0);

          // Calcula la posición del logo
          var logoSize = 80; // Ajusta el tamaño del logo según sea necesario
          var x = (canvas.width - logoSize) / 2;
          var y = (canvas.height - logoSize) / 2;

          // Dibuja el logo en el nuevo canvas
          ctx.drawImage(logo, x, y, logoSize, logoSize);

          // Reemplaza el código QR anterior con el canvas combinado
          qrcodeContainer.html('');
          qrcodeContainer.append(combinedCanvas);

          // Muestra el botón de descarga
          $('#download-button').show();
      };
  });

  $('#download-button').on('click', function () {
      // Cuando se haga clic en el botón de descarga, se ejecutará esta función

      html2canvas(document.getElementById('qrcode-container')).then(function (canvas) {
          // Convierte el contenedor del código QR a un canvas usando html2canvas

          var qrCodeImage = canvas.toDataURL('image/png');
          // Convierte el canvas a una URL de datos en formato PNG

          var a = document.createElement('a');
          a.href = qrCodeImage;
          a.download = 'qrcode_with_logo.png';
          // Crea un enlace de descarga con la imagen del código QR

          a.click();
          // Simula un clic en el enlace para iniciar la descarga
      });
  });
});

/*
// Añade un evento 'submit' al formulario que se ejecuta cuando el formulario es enviado
formulario.addEventListener('submit', (e) => {
    // Previene el comportamiento por defecto del formulario (que recargue la página)
    e.preventDefault();
    
    // Genera un código QR con el valor del campo 'link' del formulario
    QR.makeCode(formulario.uniqueid.value);
});


$(document).ready(function () {
    // Cuando el documento esté listo, se ejecutará esta función
  
    formulario.addEventListener('submit', (e) => {
        // Añade un evento 'submit' al formulario que se ejecuta cuando el formulario es enviado
  
        var text = $('#uniqueid').val();
        // Obtiene el texto ingresado por el usuario en el campo de entrada con id "uniqueid"
  
        if (!text) {
            alert("Please enter text for the QR code.");
            // Si no se ha ingresado texto, muestra una alerta y detiene la ejecución
            return;
        }
  
        // Limpia cualquier código QR previo en el contenedor
        $('#qrcode-container').empty();
  
        // Crea un nuevo código QR en el contenedor con el texto ingresado
        var qrcode = new QRCode(document.getElementById('qrcode-container'), {
            text: text,
            width: 256,
            height: 256
        });
  
        // Crea una nueva imagen para el logo
        var logo = new Image();
        logo.src= "../media/images.png"; // Actualiza la ruta a tu logo.png
  
        // Espera a que el logo se cargue, luego lo superpone en el código QR
        logo.onload = function () {
            var qrcodeContainer = $('#qrcode-container');
            var canvas = qrcodeContainer.find('canvas')[0];
            // Obtiene el canvas del código QR generado
  
            // Crea un nuevo canvas para combinar el código QR y el logo
            var combinedCanvas = document.createElement('canvas');
            combinedCanvas.width = canvas.width;
            combinedCanvas.height = canvas.height;
  
            // Dibuja el código QR en el nuevo canvas
            var ctx = combinedCanvas.getContext('2d');
            ctx.drawImage(canvas, 0, 0);
  
            // Calcula la posición del logo
            var logoSize = 80; // Ajusta el tamaño del logo según sea necesario
            var x = (canvas.width - logoSize) / 2;
            var y = (canvas.height - logoSize) / 2;
  
            // Dibuja el logo en el nuevo canvas
            ctx.drawImage(logo, x, y, logoSize, logoSize);
  
            // Reemplaza el código QR anterior con el canvas combinado
            qrcodeContainer.html('');
            qrcodeContainer.append(combinedCanvas);
  
            // Muestra el botón de descarga
            $('#download-button').show();
        };
    });
  
    $('#download-button').on('click', function () {
        // Cuando se haga clic en el botón de descarga, se ejecutará esta función
  
        html2canvas(document.getElementById('qrcode-container')).then(function (canvas) {
            // Convierte el contenedor del código QR a un canvas usando html2canvas
  
            var qrCodeImage = canvas.toDataURL('image/png');
            // Convierte el canvas a una URL de datos en formato PNG
  
            var a = document.createElement('a');
            a.href = qrCodeImage;
            a.download = 'qrcode_with_logo.png';
            // Crea un enlace de descarga con la imagen del código QR
  
            a.click();
            // Simula un clic en el enlace para iniciar la descarga
        });
    });
  });
  
  
  // Añade un evento 'submit' al formulario que se ejecuta cuando el formulario es enviado
  formulario.addEventListener('submit', (e) => {
      // Previene el comportamiento por defecto del formulario (que recargue la página)
      e.preventDefault();
      
      // Genera un código QR con el valor del campo 'link' del formulario
      QR.makeCode(formulario.uniqueid.value);
  });
  */