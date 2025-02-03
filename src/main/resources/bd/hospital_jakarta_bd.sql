create database hospital_jakarta;
use hospital_jakarta;


CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    email VARCHAR(100),
    direccion VARCHAR(250),
    fecha_alta Date,
    password VARCHAR(100),
    rol VARCHAR(50) -- (admin, medico, enfermera, pacientes etc.)
);

CREATE TABLE disponibilidad (
    id INT PRIMARY KEY,
    id_doctor INT,
    hora_inicio TIME,
    hora_fin TIME,
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
    fecha DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE recetas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT,
    id_historial_medico INT,
    nombre_medicamento VARCHAR(100),
    dosis VARCHAR(50),
    frecuencia VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    instrucciones TEXT,
    FOREIGN KEY (id_paciente) REFERENCES usuarios(id),
    FOREIGN KEY (id_historial_medico) REFERENCES historial_medico(id)
);

CREATE TABLE facturas (
    id INT PRIMARY KEY,
    id_usuario INT,
    monto DECIMAL(10,2),
    fecha DATE,
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

