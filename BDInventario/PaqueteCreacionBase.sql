-- Crear tabla Equipos
CREATE TABLE Equipos (
    ID_equipo SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Marca VARCHAR(50),
    Modelo VARCHAR(50),
    Descripción TEXT,
    Estado VARCHAR(20) CHECK (Estado IN ('Disponible', 'En Mantenimiento')) NOT NULL,
    Fecha_adquisición DATE,
    ID_sala INT,
    FOREIGN KEY (ID_sala) REFERENCES Salas(ID_sala)
);

-- Crear tabla Herramientas
CREATE TABLE Herramientas (
    ID_herramienta SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripción TEXT,
    Estado VARCHAR(20) CHECK (Estado IN ('Disponible', 'En Mantenimiento')) NOT NULL,
    Fecha_adquisición DATE
);

-- Crear tabla Dispositivos
CREATE TABLE Dispositivos (
    ID_dispositivo SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Tipo VARCHAR(50),
    Descripción TEXT,
    Estado VARCHAR(20) CHECK (Estado IN ('Disponible', 'En Mantenimiento')) NOT NULL,
    Fecha_adquisición DATE
);

-- Crear tabla Salas
CREATE TABLE Salas (
    ID_sala SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripción TEXT,
    Capacidad INT NOT NULL,
    Equipos_disponibles INT NOT NULL
);

-- Crear tabla ReservaSala
CREATE TABLE ReservaSala (
    ID_reserva SERIAL PRIMARY KEY,
    ID_sala INT,
    ID_usuario INT,
    Fecha_reserva DATE,
    Hora_inicio TIME,
    Hora_fin TIME,
    Estado_reserva VARCHAR(20) CHECK (Estado_reserva IN ('Confirmada', 'Pendiente', 'Cancelada')) NOT NULL,
    Objetivo_reserva TEXT,
    FOREIGN KEY (ID_sala) REFERENCES Salas(ID_sala),
    FOREIGN KEY (ID_usuario) REFERENCES Usuarios(ID_usuario)
);

-- Crear tabla Usuarios
CREATE TABLE Usuarios (
    ID_usuario SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    Teléfono VARCHAR(20),
    Rol VARCHAR(20) CHECK (Rol IN ('Administrador', 'Estudiante', 'Profesor')) NOT NULL,
    Contraseña VARCHAR(255) NOT NULL -- Encriptada
);

