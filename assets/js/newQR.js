$(document).ready(function () {
    // Cuando el documento esté listo, se ejecutará esta función

    $('#generate-button').on('click', function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del botón submit

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
            width: 96,
            height: 96
        });

        // Crea una nueva imagen para el logo
        var logo = new Image();
        logo.src = "../media/images.jpg"; // Actualiza la ruta a tu logo.png

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
            var logoSize = 35; // Ajusta el tamaño del logo según sea necesario
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

    //Con Canvas
    $('#download-button').on('click', function () {
        // Cuando se haga clic en el botón de descarga, se ejecutará esta función

        html2canvas(document.querySelector(canvas)).then(function (canvas) {
            // Convierte el contenedor del código QR a un canvas usando html2canvas

            var qrCodeImage = canvas.toDataURL('image/png');
            // Convierte el canvas a una URL de datos en formato PNG

            var a = document.createElement('a');
            a.href = qrCodeImage;
            a.download = $('#uniqueid').val() + '_qrcode_with_logo.png';
            // Crea un enlace de descarga con la imagen del código QR

            a.click();
            // Simula un clic en el enlace para iniciar la descarga
        });
    });

    // Event listener para el botón "Ingresar Nuevo Producto"
    $('#new-product-button').on('click', async function () {
        try {
            // Realiza el POST inicial para crear una nueva entrada sin campos
            const response = await fetch('http://localhost:8080/inventario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            if (response.ok) {
                // Obtiene la nueva entrada creada
                const newEntry = await response.json();
                const newId = newEntry.id;

                // Muestra el formulario de edición con el ID obtenido
                const formHtml = `
                    <div class="contenedor">
                        <form action="" id="formulario" class="formulario">
                            <label for="unique-id">Identificador Único:</label>
                            <p id="unique-id">${newId}</p><br><br>

                            <label for="categoria">Categoría:</label>
                            <select id="categoria" name="categoria" required>
                                <option value="1">Monitor</option>
                                <option value="2">Teclado</option>
                                <option value="3">Mouse</option>
                                <option value="4">CPU</option>
                                <option value="5">NoBreak</option>
                            </select><br><br>
                            
                            <label for="descripcion">Descripción detallada:</label>
                            <textarea id="descripcion" name="descripcion" required></textarea><br><br>

                            <label for="estado">Estado:</label>
                            <input type="text" id="estado" name="estado" required><br><br>

                            <label for="marca">Marca:</label>
                            <input type="text" id="marca" name="marca" required><br><br>

                            <label for="modelo">Modelo:</label>
                            <input type="text" id="modelo" name="modelo" required><br><br>

                            <label for="price">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required><br><br>

                            <label for="price">Precio:</label>
                            <input type="text" id="precio" name="precio" required><br><br>

                            <label for="ubicacion">Ubicación:</label>
                            <input type="text" id="ubicacion" name="ubicacion" required><br><br>
                            

                            <button type="submit" class="btn btn-primary" id="generate-button">
                                <i class="fas fa-qrcode"></i> Generar QR
                            </button>
                        </form>

                        <div id="contenedorQR" class="contenedorQR"></div>
                    
                        <!-- Aqui es el Contenedor del QR -->
                        <div class="row justify-content-center mt-4">
                            <div class="col-md-6 text-center">
                                <div id="qrcode-container"></div>
                            </div>
                        </div>
                        <!-- Aqui es el boton de descargar -->
                        <div class="row justify-content-center mt-2">
                            <div class="col-md-6 text-center">
                                <button id="download-button" class="btn btn-success">
                                    <i class="fas fa-download"></i> Descargar QR
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                $('#form-container').html(formHtml);

                // Añadir event listener para el formulario de edición
                $('#formulario').on('submit', async function (e) {
                    e.preventDefault();
                    const updatedInventario = {
                        nombre: $('#nombre').val(),
                        marca: $('#marca').val(),
                        modelo: $('#modelo').val(),
                        estado: $('#estado').val(),
                        descripcion: $('#descripcion').val(),
                        precio: $('#precio').val(),
                        categoria: $('#categoria').val(),
                        ubicacion: $('#ubicacion').val()
                    };

                    try {
                        const response = await fetch(`http://localhost:8080/inventario/${newId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedInventario)
                        });
                        if (response.ok) {
                            alert('Elemento actualizado con éxito');
                            await initDataTable(); // Recargar la tabla después de la actualización
                        } else {
                            alert('Error al actualizar el elemento');
                        }
                    } catch (error) {
                        alert('Error al actualizar el elemento');
                    }
                });
            } else {
                alert('Error al crear la nueva entrada');
            }
        } catch (error) {
            alert('Error al crear la nueva entrada');
        }
    });
});


