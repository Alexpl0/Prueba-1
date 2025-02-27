import psychopy
import csv

archivo_csv = 'DocumentosCSV/usuarios.csv'

# Conexión a la base de datos
conn = psychopy.connect(
    dbname="EquiposLabDBIMT",  
    user="oro000492",         
    password="OpenRoad017",  
    host="localhost",          
    port="5432"                
)

# Crear un cursor para interactuar con la base de datos
cursor = conn.cursor()

# Función para insertar los datos desde el CSV
def insertar_datos_csv(csv_file, tabla):
    # Abrir el archivo CSV
    with open(csv_file, mode='r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)  # Salta la primera fila (encabezado)
        
        # Insertar los datos de acuerdo a la tabla seleccionada
        for row in csv_reader:
            if tabla == "Usuarios":
                cursor.execute(
                    "INSERT INTO Usuarios (Nombre, Correo_electronico, Teléfono, Rol, Contraseña) "
                    "VALUES (%s, %s, %s, %s, %s)",
                    (row[0], row[1], row[2], row[3], row[4])
                )

# Llamar a la función para insertar los datos
insertar_datos_csv('usuarios.csv', 'Usuarios')

# Confirmar los cambios en la base de datos
conn.commit()

# Cerrar el cursor y la conexión
cursor.close()
conn.close()

print("Los datos han sido insertados correctamente.")
