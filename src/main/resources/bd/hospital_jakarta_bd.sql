CREATE DATABASE hospital_jakarta;
USE hospital_jakarta;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    apellidos VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    telefono VARCHAR(15),
    provincia VARCHAR(100),
    localidad VARCHAR(100),
    direccion VARCHAR(250),
    fecha_nacimiento DATE,
    fecha_alta DATE,
    foto_perfil VARCHAR(100),
    password VARCHAR(100),
    sexo varchar(20), 
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
    sexo varchar(20), 
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
    email VARCHAR(255),
    telefono VARCHAR(15),
    motivo VARCHAR(100),
    tarifa int,
	forma_pago VARCHAR(50),
    estado VARCHAR(50),
    visto INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_doctor) REFERENCES doctores(id)
);

-- Insertar usuarios
INSERT INTO usuarios (id, nombre, apellidos, username, email, telefono, provincia, localidad, direccion, fecha_nacimiento, fecha_alta, foto_perfil, password, sexo, rol) 
VALUES 

(1, 'Carlos', 'López', 'carlos', 'carlos.lopez@example.com', '123456789', 'Madrid', 'Barajas', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'usu_anonimo.png', 'password789', 'masculino', 'paciente'),
(2, 'Sole', 'Moral', 'sole', 'sole.moral@example.com', '123456789', 'Madrid', 'Moncloa-Aravaca', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'admin.png', 'sole', 'femenino', 'admin'),
(3, 'Diego', 'Martinez', 'diego', 'diego.martinez@example.com', '123456789', 'Madrid', 'Retiro', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'admin.png', 'diego', 'masculino', 'admin'),
(4, 'Deivi', 'Perdomo', 'deivi', 'deivi.lopez@example.com', '123456789', 'Madrid', 'Barajas', 'Calle Luna 789', '2000-01-01', '2023-03-10', 'admin.png', 'deivi', 'masculino', 'admin'),
(5, 'Sandra', 'González', 'sandra', 'sandra.gonzalez@example.com', '123456789', 'Madrid', 'Moratalaz', 'Calle Alegría 101', '1998-12-15', '2023-06-01', 'usu_anonimo.png', 'password321', 'femenino', 'paciente'),
(6, 'Raúl', 'Sánchez', 'raul', 'raul.sanchez@example.com', '123456789', 'Madrid', 'Retiro', 'Calle Sol 500', '1995-07-20', '2023-07-05', 'usu_anonimo.png', 'password654', 'masculino', 'paciente'),
(7, 'Laura', 'Méndez', 'laura', 'laura.mendez@example.com', '123456789', 'Madrid', 'Centro', 'Avenida de la Constitución 20', '1997-03-03', '2023-08-10', 'usu_anonimo.png', 'password987', 'femenino','paciente'),
(8, 'Isabel', 'Martínez', 'isabel', 'isabel.martinez@example.com', '123456789', 'Madrid', 'Moratalaz', 'Calle Mayor 101', '1990-09-30', '2023-08-01', 'usu_anonimo.png', 'password123', 'femenino','paciente'),
(9, 'Javier', 'Díaz', 'javier', 'javier.diaz@example.com', '123456789', 'Madrid', 'Villaverde', 'Calle Sol 101', '1992-03-10', '2023-09-01', 'usu_anonimo.png', 'password456', 'masculino','paciente'),
(10, 'Ana', 'Ruiz', 'ana', 'ana.ruiz@example.com', '123456789', 'Madrid', 'Chamartín', 'Avenida de América 123', '1995-01-15', '2023-09-05', 'usu_anonimo.png', 'password789', 'femenino', 'paciente'),
(11, 'Miguel', 'Hernández', 'miguel', 'miguel.hernandez@example.com', '123456789', 'Madrid', 'Carabanchel', 'Calle del Sol 88', '1987-06-01', '2023-09-07', 'usu_anonimo.png', 'password321', 'masculino', 'paciente'),
(12, 'Elena', 'García', 'elena', 'elena.garcia@example.com', '123456789', 'Madrid', 'Latina', 'Calle Madrid 150', '1998-12-05', '2023-09-10', 'usu_anonimo.png', 'password654', 'femenino', 'paciente'),
(13, 'Carlos', 'García', 'carlosg', 'carlos.garcia@example.com', '123456789', 'Madrid', 'Tetuán', 'Calle Juan de la Cierva 15', '1985-04-12', '2023-09-10', 'usu_10.png', 'password555', 'masculino', 'paciente'),
(14, 'Carmen', 'López', 'carmenl', 'carmen.lopez@example.com', '123456789', 'Madrid', 'Chamartín', 'Calle de Chamartín 25', '1990-02-25', '2023-09-11', 'usu_11.png', 'password666', 'femenino', 'paciente');


-- Insertar especialidades
INSERT INTO especialidades (id, nombre)
VALUES
(1, 'Cardiología'),
(2, 'Pediatra'),
(3, 'Medicina Interna'),
(4, 'Odontología'),
(5, 'Dermatología'),
(6, 'Pediatría'),
(7, 'Psiquiatría'),
(8, 'Oftalmología');


-- Insertar doctores
INSERT INTO doctores (id, id_especialidad, nombre, username, apellidos, email, provincia, localidad, direccion, fecha_alta, foto_perfil, password, experiencia, precio_consulta, sexo)
VALUES
(1, 1, 'Juan', 'Juan', 'Pérez', 'juan.perez@example.com', 'Madrid', 'Centro', 'Calle Falsa 123', '2023-01-01', 'doc_02.png', 'password123', 5, 20, 'masculino'),
(2, 2, 'Mario', 'mario', 'Gómez', 'mario.gomez@example.com', 'Madrid', 'Arganzuela', 'Avenida Siempre Viva 456', '2023-02-15', 'doc_05.png', 'password456', 12, 25, 'masculino'),
(3, 3, 'Ana', 'ana', 'Martínez', 'ana.martinez@example.com', 'Madrid', 'Chamberí', 'Calle Sol 321', '2023-04-05', 'doc_09.png', 'password321', 7, 30, 'femenino'),
(4, 4, 'José', 'jose', 'Ramírez', 'jose.ramirez@example.com', 'Madrid', 'Arganzuela', 'Calle Real 45', '2022-05-10', 'doc_03.png', 'password111', 6, 40, 'masculino'),
(5, 5, 'Patricia', 'patricia', 'Rodríguez', 'patricia.rodriguez@example.com', 'Madrid', 'Salamanca', 'Calle Mayor 78', '2023-01-12', 'doc_04.png', 'password222', 10, 45, 'femenino'),
(6, 6, 'Antonio', 'antonio', 'García', 'antonio.garcia@example.com', 'Madrid', 'Tetuán', 'Calle de Goya 23', '2023-04-15', 'doc_06.png', 'password333', 4, 35, 'masculino'),
(7, 1, 'Pedro', 'pedro', 'Serrano', 'pedro.serrano@example.com', 'Madrid', 'Carabanchel', 'Calle San Pedro 101', '2023-06-01', 'doc_07.png', 'password555', 8, 50, 'masculino'),
(8, 2, 'Lucía', 'lucia', 'Fernández', 'lucia.fernandez@example.com', 'Madrid', 'Latina', 'Calle del Río 200', '2023-07-15', 'doc_08.png', 'password666', 5, 55, 'femenino'),
(9, 3, 'Raquel', 'raquel', 'Pérez', 'raquel.perez@example.com', 'Madrid', 'Villaverde', 'Calle de Vallecas 456', '2023-04-20', 'doc_12.png', 'password777', 10, 60, 'femenino'),
(10, 1, 'Carlos', 'carlos', 'Jiménez', 'carlos.jimenez@example.com', 'Madrid', 'Chamartín', 'Calle Asturias 30', '2023-03-01', 'doc_10.png', 'password888', 15, 70, 'masculino'),
(11, 2, 'Nuria', 'nuria', 'Alonso', 'nuria.alonso@example.com', 'Madrid', 'Retiro', 'Calle del Retiro 12', '2023-02-01', 'doc_11.png', 'password999', 4, 45, 'femenino');

-- Insertar disponibilidad
INSERT INTO disponibilidad (id, id_doctor, hora_inicio, hora_fin, estado, comentarios)
VALUES
(1, 1, '09:00:00', '17:00:00', 'disponible', 'Horario laboral normal'),
(2, 2, '09:00:00', '17:00:00', 'disponible', 'Horario laboral normal'),
(3, 3, '13:00:00', '14:00:00', 'no disponible', 'Hora de almuerzo'),
(4, 4, '10:00:00', '14:00:00', 'disponible', 'Horario de consulta matutino'),
(5, 5, '09:00:00', '13:00:00', 'disponible', 'Horario de consulta en la mañana'),
(6, 6, '15:00:00', '19:00:00', 'disponible', 'Horario de tarde para pacientes'),
(7, 7, '09:00:00', '13:00:00', 'disponible', 'Horario de consulta por la mañana'),
(8, 8, '14:00:00', '18:00:00', 'disponible', 'Horario de consulta por la tarde'),
(9, 9, '10:00:00', '14:00:00', 'disponible', 'Consultas en la mañana'),
(10, 10, '16:00:00', '20:00:00', 'disponible', 'Atención vespertina'),
(11, 11, '08:00:00', '12:00:00', 'disponible', 'Horario de atención de mañana');

-- Insertar historial médico
INSERT INTO historial_medico (id, id_usuario, diagnostico, tratamiento, fecha)
VALUES
(1, 3, 'Hipertensión arterial', 'Control de presión y dieta baja en sal', '2023-05-01'),
(2, 3, 'Resfriado común', 'Reposo y medicamentos sintomáticos', '2023-06-10'),
(3, 4, 'Asma bronquial', 'Uso de inhaladores y control de los síntomas', '2023-06-15'),
(4, 5, 'Alergia a ciertos medicamentos', 'Revisión de las medicinas y recomendaciones médicas', '2023-07-05'),
(5, 6, 'Dolor lumbar', 'Recomendación de fisioterapia y ejercicios', '2023-08-10'),
(6, 8, 'Insomnio', 'Recomendación de relajantes y terapia cognitivo-conductual', '2023-08-20'),
(7, 9, 'Esguince de tobillo', 'Uso de vendaje y descanso', '2023-09-01'),
(8, 10, 'Migrañas', 'Tratamiento con analgésicos y cambios en hábitos', '2023-09-03'),
(9, 11, 'Alergia estacional', 'Antihistamínicos y evitar alergenos', '2023-09-05'),
(10, 12, 'Gastritis', 'Dieta blanda y medicamentos antiácidos', '2023-09-06');

-- Insertar recetas
INSERT INTO recetas (id_paciente, id_historial_medico, nombre_medicamento, dosis, frecuencia, fecha_inicio, fecha_fin, instrucciones)
VALUES
(3, 1, 'Losartán', '50 mg', 'Una vez al día', '2023-05-01', '2023-11-01', 'Tomar por la mañana'),
(3, 2, 'Paracetamol', '500 mg', 'Cada 8 horas', '2023-06-10', '2023-06-17', 'Tomar con agua'),
(4, 3, 'Salbutamol', '100 mcg', 'Dos veces al día', '2023-06-16', '2023-12-16', 'Inhalar según sea necesario'),
(5, 4, 'Dipirona', '500 mg', 'Cada 6 horas', '2023-07-06', '2023-07-10', 'Tomar con agua después de las comidas'),
(6, 5, 'Ibuprofeno', '400 mg', 'Cada 8 horas', '2023-08-11', '2023-08-15', 'Tomar con alimento'),
(8, 6, 'Lorazepam', '1 mg', 'Antes de dormir', '2023-08-21', '2023-12-21', 'Tomar una dosis por la noche'),
(9, 8, 'Sumatriptán', '50 mg', 'Al primer síntoma de migraña', '2023-09-04', '2023-12-04', 'Tomar a la primera señal de dolor'),
(10, 9, 'Loratadina', '10 mg', 'Una vez al día', '2023-09-06', '2023-11-06', 'Tomar con alimentos'),
(11, 10, 'Omeprazol', '20 mg', 'Una vez al día', '2023-09-07', '2023-12-07', 'Tomar por la mañana con agua');

-- Insertar facturas
INSERT INTO facturas (id, id_usuario, monto, fecha, estado_pago)
VALUES
(1, 3, 150.00, '2023-05-05', 'pagado'),
(2, 3, 75.00, '2023-06-15', 'pendiente'),
(3, 4, 200.00, '2023-06-20', 'pendiente'),
(4, 5, 80.00, '2023-07-12', 'pagado'),
(5, 6, 120.00, '2023-08-15', 'pendiente'),
(6, 8, 180.00, '2023-08-22', 'pendiente'),
(7, 9, 130.00, '2023-09-02', 'pagado'),
(8, 10, 250.00, '2023-09-04', 'pendiente'),
(9, 11, 100.00, '2023-09-05', 'pagado'),
(10, 12, 150.00, '2023-09-06', 'pendiente');

-- Insertar citas
INSERT INTO citas (id, id_usuario, id_doctor, fecha, email, telefono, motivo, tarifa, forma_pago, estado, visto)
VALUES
(1, 3, 2, '2023-05-01 10:00:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'completada', 0),
(2, 3, 2, '2023-06-10 11:00:00', 'usuario2@example.com', '123456789', 'Revisión', 150, 'Efectivo', 'completada', 0),
(3, 4, 4, '2023-06-20 10:00:00', 'usuario4@example.com', '123456789', 'Consulta general', 150, 'Tarjeta de crédito', 'completada', 0),
(4, 5, 5, '2023-07-15 12:00:00', 'usuario5@example.com', '123456789', 'Chequeo general', 120, 'Efectivo', 'completada', 0),
(5, 6, 6, '2023-08-18 09:30:00', 'usuario6@example.com', '123456789', 'Control médico', 90, 'Transferencia', 'pendiente', 0),
(6, 5, 4, '2023-07-20 15:00:00', 'usuario4@example.com', '123456789', 'Revisión de salud', 100, 'Tarjeta de crédito', 'completada', 0),
(7, 6, 3, '2023-08-10 14:00:00', 'usuario5@example.com', '123456789', 'Consulta médica', 110, 'Efectivo', 'completada', 0),
(8, 10, 9, '2023-09-06 10:00:00', 'usuario10@example.com', '123456789', 'Consulta para migraña', 150, 'Efectivo', 'completada', 0),
(9, 11, 10, '2023-09-07 15:00:00', 'usuario11@example.com', '123456789', 'Consulta médica', 100, 'Tarjeta de crédito', 'completada', 0),
(10, 12, 11, '2023-09-08 14:30:00', 'usuario12@example.com', '123456789', 'Consulta de salud general', 120, 'Transferencia', 'pendiente', 0),
(11, 9, 8, '2023-09-03 11:00:00', 'usuario9@example.com', '123456789', 'Chequeo de tobillo', 120, 'Efectivo', 'pendiente', 0),
(12, 8, 7, '2023-08-22 09:30:00', 'usuario8@example.com', '123456789', 'Consulta de insomnio', 100, 'Tarjeta de crédito', 'completada', 0);

