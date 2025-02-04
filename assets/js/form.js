function renderInventoryForm() {
    const formHTML = `
        <h1>Formulario de Inventario de Oficina</h1>
        <form action="/submit-inventory" method="post" id="inventory-form";">
            <label for="unique-id">Identificador Único:</label>
            <input type="text" id="unique-id" name="unique-id" required><br><br>

            <label for="category">Categoría:</label>
            <input type="text" id="category" name="category" required><br><br>

            <label for="subcategory">Subcategoría:</label>
            <input type="text" id="subcategory" name="subcategory" required><br><br>

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

            <label for="purchase-date">Fecha de compra:</label>
            <input type="date" id="purchase-date" name="purchase-date" required><br><br>

            <label for="supplier">Proveedor:</label>
            <input type="text" id="supplier" name="supplier" required><br><br>

            <label for="unit-price">Precio unitario:</label>
            <input type="number" id="unit-price" name="unit-price" required><br><br>

            <label for="total-value">Valor total:</label>
            <input type="number" id="total-value" name="total-value" required><br><br>

            <label for="expiry-date">Fecha de vencimiento (si aplica):</label>
            <input type="date" id="expiry-date" name="expiry-date"><br><br>

            <label for="status">Estado:</label>
            <input type="text" id="status" name="status" required><br><br>

            <button type="submit" id="submit">Enviar</button>
        </form>
    `;
    document.body.innerHTML = formHTML;
}
