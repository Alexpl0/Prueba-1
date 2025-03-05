let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
        lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { orderable: false, targets: [9, 10] },
        { searchable: false, targets: [1] }
            ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const tableBody_users = document.getElementById('tableBody_users');

const inventariocrud = async () => {
    try {
        const inventarioResponse = await fetch("http://localhost:8080/inventario");
        const inventario = await inventarioResponse.json();
    let content = ``;
    inventario.forEach((inventario, index) => {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${inventario.nombre}</td>
                <td>${inventario.marca}</td>
                <td>${inventario.modelo}</td>
                <td>${inventario.estado}</td>
                <td>${inventario.descripcion}</td>
                <td>${inventario.precio}</td>
                <td>${inventario.categoria}</td>
                <td>${inventario.ubicacion}</td>
                <td><i class="fa-solid fa-check" style="color: green;"></i></td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>`;
    });
    tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await inventariocrud();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

window.addEventListener("load", async () => {
    await initDataTable();
});




/*
const listUsersAndCategoriesAndUbication = async () => {
    try {
        const [usersResponse, categoriesResponse, ubicacionesResponse] = await Promise.all([
            fetch("http://localhost:8080/productos"),
            fetch("http://localhost:8080/categorias"),
            fetch("http://localhost:8080/ubicaciones")
        ]);

        const users = await usersResponse.json();
        const categories = await categoriesResponse.json();
        const ubicacion = await ubicacionesResponse.json();

        let categoria = "";
        if (categories.index == "1") {
            categoria = "Monitor";
        }

        let ubi = "";
        if (ubicacion.id == "") {
            ubi = "Sala1";
        }

        let content = ``;
        users.forEach((user, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.nombre}</td>
                    <td>${user.marca}</td>
                    <td>${user.modelo}</td>
                    <td>${user.estado}</td>
                    <td>${user.descripcion}</td>
                    <td>${user.precio}</td>
                    <td>${categoria}</td>
                    <td>${ubi}</td>
                    <td><i class="fa-solid fa-check" style="color: green;"></i></td>
                    <td>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`;
        });

        // You can also process categories here if needed

        tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};
*/