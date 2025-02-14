function renderNewInventario() {
    const formHTML = `
    <h1>Registro de Nuevo Producto</h1>
        <form id="inventory-form">
            <label for="unique-id">Identificador Único:</label>
            <input type="text" id="unique-id" name="unique-id" required><br><br>

            <label for="category">Categoría:</label>
            <select id="category" name="category" required>
                <option value="equipo-de-computo">Equipo de Cómputo</option>
                <option value="mobiliario">Mobiliario</option>
                <option value="redes">Redes</option>
                <option value="software">Software</option>
            </select><br><br>

            <label for="description">Descripción detallada:</label>
            <textarea id="description" name="description" required></textarea><br><br>

            <label for="brand">Marca:</label>
            <input type="text" id="brand" name="brand" required><br><br>

            <label for="model">Modelo:</label>
            <input type="text" id="model" name="model" required><br><br>

            <label for="quantity">Cantidad:</label>
            <input type="number" id="quantity" name="quantity" required><br><br>

            <label for="unit">Unidad de medida:</label>
            <input type="text" id="unit" name="unit" required><br><br>

            <label for="location">Ubicación:</label>
            <input type="text" id="location" name="location" required><br><br>

            <label for="supplier">Proveedor:</label>
            <input type="text" id="supplier" name="supplier" required><br><br>

            <label for="status">Estado:</label>
            <input type="text" id="status" name="status" required><br><br>

            <button type="button" onclick="generarQR()">Generar QR</button>
        </form>

        <div id="qrcodecontainer" style="display: none;">
            <h5 class="text-center">Código QR Generado</h5>
            <div id="qrcode"></div>

        </div>

        <div id="qrContainer" class="my-5">
        <div id="qr"></div>
        </div>

        <button id="buttonHome" onclick="buttonHome()">Regresar</button>
    `;

    document.body.innerHTML = formHTML;
}

function generarQR() {
    const uniqueId = document.getElementById('unique-id').value;
    if (uniqueId) {
        //swal.fire('Código QR generado exitosamente');
        const qrCodeContainer = document.getElementById('qrcode'); // Obtener el contenedor del código QR
        const qrContainer = document.getElementById('qrcodecontainer');
        qrContainer.style.display = 'block';

        qrCodeContainer.innerHTML = ''; // Limpiar cualquier código QR previo
        new QRCode(qrCodeContainer, uniqueId); // Generar un nuevo código QR
    } else {
        alert('Por favor, ingrese un Identificador Único.');
    }
}

function generaQR(event) {
  event.preventDefault();
  if (uniqueId.value) {
    qr.innerHTML = ""; // Limpiar cualquier código QR previo
    warning.innerHTML = ""; // Limpiar cualquier mensaje de advertencia previo
    new QRCode(qr, uniqueId.value); // Generar un nuevo código QR
    qrContainer.classList.add("d-flex", "justify-content-center"); // Añadir clases de Bootstrap
  } else {
    warning.innerHTML = "Coloca un id valido";
  }
}
function clearFields() {
  urlInput.value = ""; // Limpiar el campo de texto
  warning.innerHTML = ""; // Limpiar cualquier mensaje de advertencia previo
  qr.innerHTML = ""; // Limpiar cualquier código QR previo
}
