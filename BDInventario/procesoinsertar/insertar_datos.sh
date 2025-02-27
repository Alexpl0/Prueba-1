#!/bin/bash

# Variables para la conexión
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="oro000492"
DB_PASSWORD="OpenRoad017"
DB_NAME="EquiposLabDBIMT"
CSV_FILE="/Users/oro000492/Desktop/UNIVERSIDAD/Cuatrimestre 7/Desarrollo Web Avanzado/BDInventario/DocumentosCSV"

# Exportar la contraseña para la conexión
export PGPASSWORD=$DB_PASSWORD

# Ejecutar el comando de inserción con psql
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -c "\copy Usuarios(Nombre, Correo_electronico, Teléfono, Rol, Contraseña) FROM '$CSV_FILE' DELIMITER ',' CSV HEADER;"

# Limpiar la variable de la contraseña
unset PGPASSWORD

echo "Datos insertados correctamente desde $CSV_FILE"

