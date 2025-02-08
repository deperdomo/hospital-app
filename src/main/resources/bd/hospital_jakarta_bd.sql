CREATE DATABASE hospital_jakarta;
USE hospital_jakarta;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    apellidos VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    provincia VARCHAR(100),
    localidad VARCHAR(100),
    direccion VARCHAR(250),
    fecha_nacimiento DATE,
    fecha_alta DATE,
    foto_perfil VARCHAR(100),
    password VARCHAR(100),
    rol VARCHAR(50) -- (admin, enfermera, pacientes etc.)
);

CREATE TABLE especialidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE
);

CREATE TABLE doctores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_especialidad INT,
    nombre VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    apellidos VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    provincia VARCHAR(100),
    localidad VARCHAR(100),
    direccion VARCHAR(250),
    fecha_alta DATE,
    foto_perfil VARCHAR(100),
    password VARCHAR(100),
    experiencia INT,
    precio_consulta INT,
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id)
);

CREATE TABLE disponibilidad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_doctor INT,
    hora_inicio TIME,
    hora_fin TIME,
    estado VARCHAR(50),  -- "disponible", "no disponible", "vacaciones"
    comentarios VARCHAR(200),
    FOREIGN KEY (id_doctor) REFERENCES doctores(id)
);

CREATE TABLE historial_medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    diagnostico TEXT,
    tratamiento TEXT,
    fecha DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE recetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    monto DECIMAL(10,2),
    fecha DATE,
    estado_pago VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_doctor INT,
    fecha DATETIME,
    estado VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_doctor) REFERENCES doctores(id)
);

-- Insertar usuarios
INSERT INTO usuarios (id, nombre, apellidos, username, email, provincia, localidad, direccion, fecha_nacimiento, fecha_alta, foto_perfil, password, rol) 
VALUES 
(1, 'Carlos', 'López', 'carlos', 'carlos.lopez@example.com', 'Madrid', 'Barajas', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'usu_anonimo.png', 'password789', 'paciente'),
(2, 'Sole', 'Moral', 'sole', 'sole.moral@example.com', 'Madrid', 'Moncloa-Aravaca', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'admin.png', 'sole', 'admin'),
(3, 'Diego', 'Martinez', 'diego', 'diego.martinez@example.com', 'Madrid', 'Retiro', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'admin.png', 'diego', 'admin'),
(4, 'Deivi', 'Perdomo', 'deivi', 'deivi.lopez@example.com', 'Madrid', 'Barajas', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'admin.png', 'deivi', 'admin');

-- Insertar especialidades
INSERT INTO especialidades (id, nombre)
VALUES
(1, 'Cardiología'),
(2, 'Pediatra'),
(3, 'Medicina Interna');

-- Insertar doctores
INSERT INTO doctores (id, id_especialidad, nombre, username, apellidos, email, provincia, localidad, direccion, fecha_alta, foto_perfil, password, experiencia, precio_consulta)
VALUES
(1, 1, 'Juan', 'Juan', 'Pérez', 'juan.perez@example.com', 'Madrid', 'Centro', 'Calle Falsa 123', '2023-01-01', 'doc_02.png', 'password123', 5, 20),
(2, 2, 'María', 'maria', 'Gómez', 'maria.gomez@example.com', 'Madrid', 'Arganzuela', 'Avenida Siempre Viva 456', '2023-02-15', 'doc_05.png', 'password456', 12, 25),
(3, 3, 'Ana', 'ana', 'Martínez', 'ana.martinez@example.com', 'Madrid', 'Chamberí', 'Calle Sol 321', '2023-04-05', 'doc_09.png', 'password321', 7, 30);

-- Insertar disponibilidad
INSERT INTO disponibilidad (id, id_doctor, hora_inicio, hora_fin, estado, comentarios)
VALUES
(1, 1, '09:00:00', '17:00:00', 'disponible', 'Horario laboral normal'),
(2, 2, '09:00:00', '17:00:00', 'disponible', 'Horario laboral normal'),
(3, 3, '13:00:00', '14:00:00', 'no disponible', 'Hora de almuerzo');

-- Insertar historial médico
INSERT INTO historial_medico (id, id_usuario, diagnostico, tratamiento, fecha)
VALUES
(1, 3, 'Hipertensión arterial', 'Control de presión y dieta baja en sal', '2023-05-01'),
(2, 3, 'Resfriado común', 'Reposo y medicamentos sintomáticos', '2023-06-10');

-- Insertar recetas
INSERT INTO recetas (id_paciente, id_historial_medico, nombre_medicamento, dosis, frecuencia, fecha_inicio, fecha_fin, instrucciones)
VALUES
(3, 1, 'Losartán', '50 mg', 'Una vez al día', '2023-05-01', '2023-11-01', 'Tomar por la mañana'),
(3, 2, 'Paracetamol', '500 mg', 'Cada 8 horas', '2023-06-10', '2023-06-17', 'Tomar con agua');

-- Insertar facturas
INSERT INTO facturas (id, id_usuario, monto, fecha, estado_pago)
VALUES
(1, 3, 150.00, '2023-05-05', 'pagado'),
(2, 3, 75.00, '2023-06-15', 'pendiente');

-- Insertar citas
INSERT INTO citas (id, id_usuario, id_doctor, fecha, estado)
VALUES
(1, 3, 2, '2023-05-01 10:00:00', 'completada'),
(2, 3, 2, '2023-06-10 11:00:00', 'completada');