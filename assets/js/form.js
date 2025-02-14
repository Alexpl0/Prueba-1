function renderInventoryForm(respuesta) {
    // Obtener el texto de respuesta almacenado en localStorage
    const responseText = localStorage.getItem('responseText');

    const formHTML = `
        <form action="/submit-inventory" method="post" id="inventory-form">
            <label for="unique-id">Identificador Único:</label>
            <p id="unique-id">${respuesta}</p><br><br>

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

            <button type="submit">Enviar</button>

        </form>

        <button id="buttonHome" onclick="buttonHome()">Regresar</button>
    `;

    // Insertar el formulario en un contenedor específico
    const container = document.getElementById('form-container');
    container.innerHTML = formHTML;
}

// Llamar a la función para renderizar el formulario
renderInventoryForm('Texto de respuesta del código QR');