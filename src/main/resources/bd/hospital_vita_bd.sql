create database hospital_vita;
use hospital_vita;


CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    email VARCHAR(100),
    direccion VARCHAR(250),
    password VARCHAR(100),
    rol VARCHAR(50) -- (admin, medico, enfermera, pacientes etc.)
);

CREATE TABLE disponibilidad (
    id INT PRIMARY KEY,
    id_doctor INT,
    hora_inicio DATE,
    hora_fin DATE,
    estado VARCHAR(50),  -- "disponible", "no disponible", "vacaciones"
    comentarios VARCHAR(100),
    FOREIGN KEY (id_doctor) REFERENCES usuarios(id)
);

CREATE TABLE especialidades (
    id INT PRIMARY KEY,
    id_doctor INT,
    nombre VARCHAR(100),
    FOREIGN KEY (id_doctor) REFERENCES usuarios(id)
);

CREATE TABLE historial_medico (
    id INT PRIMARY KEY,
    id_usuario INT,
    diagnostico TEXT,
    tratamiento TEXT,
    fecha DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE facturas (
    id INT PRIMARY KEY,
    id_usuario INT,
    monto DECIMAL(10,2),
    fecha DATETIME,
    estado_pago VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE citas (
    id INT PRIMARY KEY,
    id_usuario INT,
    id_doctor INT,
    fecha DATETIME,
    estado VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_doctor) REFERENCES usuarios(id)
);

