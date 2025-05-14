CREATE DATABASE hospital_jakarta;
USE hospital_jakarta;

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_alta DATE NOT NULL,
    foto_perfil VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    sexo varchar(20) NOT NULL, 
    rol VARCHAR(50) NOT NULL, -- (admin, enfermera, pacientes etc.)
    check(sexo in ('masculino', 'femenino', 'prefiero_no_decirlo')),
	check(rol in ('admin', 'paciente'))
);

CREATE TABLE especialidades (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE doctores (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_especialidad INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    provincia VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    fecha_alta DATE NOT NULL,
    foto_perfil VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    experiencia INT NOT NULL,
    precio_consulta INT NOT NULL,
    sexo varchar(20) NOT NULL, 
    votos INT,
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id),
	check(sexo in ('masculino', 'femenino'))
);

CREATE TABLE disponibilidad (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_doctor INT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado VARCHAR(50) NOT NULL,  -- "disponible", "no disponible", "vacaciones"
    comentarios VARCHAR(200),
    FOREIGN KEY (id_doctor) REFERENCES doctores(id),
	check(estado in ('disponible', 'no disponible', 'vacaciones'))
);
CREATE TABLE citas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_doctor INT NOT NULL,
    fecha DATETIME NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    motivo VARCHAR(100) NOT NULL,
    tarifa int NOT NULL,
	forma_pago VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    visto INT,
    votado boolean,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_doctor) REFERENCES doctores(id),
    check(estado in ('pendiente', 'cancelada', 'terminada'))
);

CREATE TABLE historial_medico (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE recetas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_historial_medico INT NOT NULL,
    id_cita INT NOT NULL,
    nombre_medicamento VARCHAR(100) NOT NULL,
    dosis VARCHAR(50) NOT NULL,
    frecuencia VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    instrucciones TEXT NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES usuarios(id),
    FOREIGN KEY (id_historial_medico) REFERENCES historial_medico(id),
    FOREIGN KEY (id_cita) REFERENCES citas(id)
);

CREATE TABLE facturas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    estado_pago VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    check(estado_pago in ('pendiente', 'pagado'))
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
INSERT INTO doctores (id, id_especialidad, nombre, username, apellidos, email, provincia, localidad, direccion, fecha_alta, foto_perfil, password, experiencia, precio_consulta, sexo, votos)
VALUES
(1, 1, 'Juan', 'juan', 'Pérez', 'juan.perez@example.com', 'Madrid', 'Centro', 'Calle Falsa 123', '2023-01-01', 'doc_m_07.png', 'juan', 5, 20, 'masculino', 12),
(2, 2, 'Mario', 'mario', 'Gómez', 'mario.gomez@example.com', 'Madrid', 'Arganzuela', 'Avenida Siempre Viva 456', '2023-02-15', 'doc_m_05.png', 'mario', 12, 25, 'masculino', 5),
(3, 3, 'Ana', 'ana', 'Martínez', 'ana.martinez@example.com', 'Madrid', 'Chamberí', 'Calle Sol 321', '2023-04-05', 'doc_f_09.png', 'ana', 7, 30, 'femenino', 6),
(4, 4, 'José', 'jose', 'Ramírez', 'jose.ramirez@example.com', 'Madrid', 'Arganzuela', 'Calle Real 45', '2022-05-10', 'doc_m_03.png', 'password111', 6, 40, 'masculino', 7),
(5, 5, 'Patricia', 'patricia', 'Rodríguez', 'patricia.rodriguez@example.com', 'Madrid', 'Salamanca', 'Calle Mayor 78', '2023-01-12', 'doc_f_01.png', 'password222', 10, 45, 'femenino', 9),
(6, 6, 'Antonio', 'antonio', 'García', 'antonio.garcia@example.com', 'Madrid', 'Tetuán', 'Calle de Goya 23', '2023-04-15', 'doc_m_06.png', 'password333', 4, 35, 'masculino', 23),
(7, 1, 'Pedro', 'pedro', 'Serrano', 'pedro.serrano@example.com', 'Madrid', 'Carabanchel', 'Calle San Pedro 101', '2023-06-01', 'doc_m_02.png', 'password555', 8, 50, 'masculino', 22),
(8, 2, 'Lucía', 'lucia', 'Fernández', 'lucia.fernandez@example.com', 'Madrid', 'Latina', 'Calle del Río 200', '2023-07-15', 'doc_f_10.png', 'password666', 5, 55, 'femenino', 31),
(9, 3, 'Raquel', 'raquel', 'Pérez', 'raquel.perez@example.com', 'Madrid', 'Villaverde', 'Calle de Vallecas 456', '2023-04-20', 'doc_f_12.png', 'password777', 10, 60, 'femenino', 15),
(10, 1, 'Carlos', 'carlos', 'Jiménez', 'carlos.jimenez@example.com', 'Madrid', 'Chamartín', 'Calle Asturias 30', '2023-03-01', 'doc_m_08.png', 'password888', 15, 70, 'masculino', 3),
(11, 2, 'Nuria', 'nuria', 'Alonso', 'nuria.alonso@example.com', 'Madrid', 'Retiro', 'Calle del Retiro 12', '2023-02-01', 'doc_f_11.png', 'password999', 4, 45, 'femenino', 9),
(12, 1, 'Gonzalo', 'gonzalo', 'José', 'antonio.jose@example.com', 'Madrid', 'Chamartín', 'Calle Asturias 30', '2023-03-01', 'doc_m_04.png', 'password888', 15, 70, 'masculino', 3),
(13, 3, 'Sergio', 'sergio', 'López', 'sergio.lopez@example.com', 'Madrid', 'Moncloa', 'Calle del Pintor 45', '2023-05-01', 'doc_m_28.png', 'password999', 8, 35, 'masculino', 17),
(14, 4, 'Beatriz', 'beatriz', 'Muñoz', 'beatriz.munoz@example.com', 'Madrid', 'Fuencarral', 'Calle de la Luna 12', '2023-06-15', 'doc_f_13.png', 'password111', 6, 40, 'femenino', 14),
(15, 5, 'David', 'david', 'Ortega', 'david.ortega@example.com', 'Madrid', 'Hortaleza', 'Avenida de la Paz 78', '2023-07-30', 'doc_m_14.png', 'password222', 10, 45, 'masculino', 10),
(16, 6, 'Silvia', 'silvia', 'Romero', 'silvia.romero@example.com', 'Madrid', 'Barajas', 'Calle del Águila 23', '2023-08-10', 'doc_f_15.png', 'password333', 4, 35, 'femenino', 12),
(17, 1, 'Martín', 'martin', 'Santos', 'martin.santos@example.com', 'Madrid', 'Usera', 'Calle del Estadio 101', '2023-09-01', 'doc_m_23.png', 'password444', 7, 50, 'masculino', 13),
(18, 2, 'Elena', 'elena', 'Torres', 'elena.torres@example.com', 'Madrid', 'Puente de Vallecas', 'Calle del Puente 200', '2023-10-15', 'doc_f_15.png', 'password555', 5, 55, 'femenino', 20),
(19, 3, 'Jorge', 'jorge', 'Flores', 'jorge.flores@example.com', 'Madrid', 'San Blas', 'Calle de las Flores 456', '2023-11-20', 'doc_m_17.png', 'password666', 10, 60, 'masculino', 18),
(20, 4, 'María', 'maria', 'Cruz', 'maria.cruz@example.com', 'Madrid', 'Coslada', 'Calle de la Cruz 30', '2023-12-01', 'doc_f_16.png', 'password777', 12, 70, 'femenino', 15),
(21, 5, 'Manuel', 'manuel', 'González', 'manuel.gonzalez@example.com', 'Madrid', 'Leganés', 'Calle del Parque 12', '2023-01-05', 'doc_m_21.png', 'password888', 9, 45, 'masculino', 25),
(22, 6, 'Carmen', 'carmen', 'Díaz', 'carmen.diaz@example.com', 'Madrid', 'Getafe', 'Calle de la Rosa 23', '2023-02-10', 'doc_f_18.png', 'password999', 6, 35, 'femenino', 14),
(23, 1, 'Luis', 'luis', 'Gutiérrez', 'luis.gutierrez@example.com', 'Madrid', 'Alcalá de Henares', 'Calle del Sol 101', '2023-03-15', 'doc_m_22.png', 'password111', 8, 50, 'masculino', 22),
(24, 2, 'Isabel', 'isabel', 'Vega', 'isabel.vega@example.com', 'Madrid', 'Majadahonda', 'Calle del Río 200', '2023-04-20', 'doc_f_19.png', 'password222', 7, 55, 'femenino', 16),
(25, 3, 'Francisco', 'francisco', 'Moreno', 'francisco.moreno@example.com', 'Madrid', 'Pozuelo de Alarcón', 'Calle del Bosque 456', '2023-05-25', 'doc_m_25.png', 'password333', 10, 60, 'masculino', 19),
(26, 4, 'Laura', 'laura', 'Giménez', 'laura.gimenez@example.com', 'Madrid', 'Las Rozas', 'Calle del Lago 30', '2023-06-01', 'doc_f_20.png', 'password444', 15, 70, 'femenino', 18),
(27, 5, 'Ángel', 'angel', 'Castro', 'angel.castro@example.com', 'Madrid', 'Fuenlabrada', 'Calle del Ángel 12', '2023-07-05', 'doc_m_27.png', 'password555', 5, 45, 'masculino', 14),
(28, 6, 'Cristina', 'cristina', 'Fuentes', 'cristina.fuentes@example.com', 'Madrid', 'Alcorcón', 'Calle de la Estrella 23', '2023-08-10', 'doc_f_24.png', 'password666', 4, 35, 'femenino', 12);

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
(11, 11, '08:00:00', '12:00:00', 'disponible', 'Horario de atención de mañana'),
(12, 12, '10:00:00', '18:00:00', 'disponible', 'Consultas por la tarde'),
(13, 13, '09:00:00', '17:00:00', 'disponible', 'Horario laboral normal'),
(14, 14, '12:00:00', '20:00:00', 'disponible', 'Consultas en la tarde'),
(15, 15, '11:00:00', '19:00:00', 'disponible', 'Horario vespertino'),
(16, 16, '08:00:00', '16:00:00', 'disponible', 'Horario de consultas temprano'),
(17, 17, '13:00:00', '21:00:00', 'disponible', 'Atención vespertina'),
(18, 18, '07:00:00', '15:00:00', 'disponible', 'Horario temprano de atención'),
(19, 19, '10:00:00', '14:00:00', 'disponible', 'Consultas en la mañana'),
(20, 20, '09:00:00', '13:00:00', 'disponible', 'Horario de mañana'),
(21, 21, '09:00:00', '17:00:00', 'disponible', 'Horario laboral normal'),
(22, 22, '11:00:00', '15:00:00', 'disponible', 'Horario de consultas'),
(23, 23, '13:00:00', '17:00:00', 'disponible', 'Atención vespertina'),
(24, 24, '08:00:00', '12:00:00', 'disponible', 'Horario de atención temprano'),
(25, 25, '14:00:00', '18:00:00', 'disponible', 'Consultas en la tarde'),
(26, 26, '09:00:00', '17:00:00', 'disponible', 'Horario laboral normal'),
(27, 27, '10:00:00', '14:00:00', 'disponible', 'Consultas en la mañana'),
(28, 28, '15:00:00', '19:00:00', 'disponible', 'Horario vespertino para pacientes');

-- Insertar citas
INSERT INTO citas (id, id_usuario, id_doctor, fecha, email, telefono, motivo, tarifa, forma_pago, estado, visto, votado)
VALUES
(1, 3, 2, '2023-05-01 10:00:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(2, 3, 3, '2023-06-10 11:30:00', 'usuario2@example.com', '123456789', 'Revisión', 150, 'Efectivo', 'terminada', 1, false),
(3, 4, 4, '2023-06-20 10:00:00', 'usuario4@example.com', '123456789', 'Consulta general', 150, 'Tarjeta de crédito', 'terminada', 1, false),
(4, 5, 5, '2023-07-15 12:00:00', 'usuario5@example.com', '123456789', 'Chequeo general', 120, 'Efectivo', 'terminada', 1, false),
(5, 6, 6, '2025-08-18 09:30:00', 'usuario6@example.com', '123456789', 'Control médico', 90, 'Transferencia', 'pendiente', 1, false),
(6, 5, 4, '2023-07-20 15:00:00', 'usuario4@example.com', '123456789', 'Revisión de salud', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(7, 6, 3, '2023-08-10 14:00:00', 'usuario5@example.com', '123456789', 'Consulta médica', 110, 'Efectivo', 'terminada', 1, false),
(8, 10, 9, '2023-09-06 10:00:00', 'usuario10@example.com', '123456789', 'Consulta para migraña', 150, 'Efectivo', 'terminada', 1, false),
(9, 11, 10, '2023-09-07 15:00:00', 'usuario11@example.com', '123456789', 'Consulta médica', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(10, 12, 11, '2025-09-08 14:30:00', 'usuario12@example.com', '123456789', 'Consulta de salud general', 120, 'Transferencia', 'pendiente', 1, false),
(11, 9, 8, '2025-09-03 11:00:00', 'usuario9@example.com', '123456789', 'Chequeo de tobillo', 120, 'Efectivo', 'pendiente', 1, false),
(12, 8, 7, '2025-08-22 09:30:00', 'usuario8@example.com', '123456789', 'Consulta de insomnio', 100, 'Tarjeta de crédito', 'pendiente', 1, false),
(13, 3, 4, '2025-02-01 11:00:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(14, 3, 5, '2025-02-01 12:30:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(15, 3, 7, '2025-02-01 13:00:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(16, 3, 6, '2025-03-01 14:30:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(17, 3, 8, '2025-02-01 15:30:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'terminada',  1, false),
(18, 3, 9, '2025-03-01 16:00:00', 'usuario1@example.com', '123456789', 'Consulta general', 100, 'Tarjeta de crédito', 'terminada', 1, false),
(19, 8, 21, '2025-03-20 10:30:00', 'isabel.martinez@example.com', '123456789', 'Dolor de muelas', 45, 'Paypal', 'pendiente', 1, false),
(20, 3, 4, '2025-03-10 11:30:00', 'diego.martinez@example.com', '123456789', 'Dolor de cabeza', 40, 'Paypal', 'terminada', 1,false),
(21, 3, 1, '2025-03-11 09:00:00', 'diego.martinez@example.com', '123456789', 'Marcapasos', 20, 'Tarjeta de crédito', 'terminada', 1, false);


-- Insertar historial médico
INSERT INTO historial_medico (id, id_usuario, diagnostico, tratamiento, fecha)
VALUES
(1,3, 'Consulta general', 'Descanso, analgésicos', '2023-05-01'),
(2,3, 'Revisión', 'Recomendación de seguimiento, analgésicos', '2023-06-10'),
(3,4, 'Consulta general', 'Recomendación de descanso, antiinflamatorios', '2023-06-20'),
(4,5, 'Chequeo general', 'Seguimiento de estado de salud', '2023-07-15'),
(5,6, 'Control médico', 'Monitoreo de salud, medicación de mantenimiento', '2025-08-18'),
(6,5, 'Revisión de salud', 'Revisión de estado físico, pruebas de sangre', '2023-07-20'),
(7,6, 'Consulta médica', 'Análisis y descanso', '2023-08-10'),
(8,10, 'Consulta para migraña', 'Medicamento para migraña, reposo', '2023-09-06'),
(9,11, 'Consulta médica', 'Antiinflamatorios, reposo', '2023-09-07'),
(10,12, 'Consulta de salud general', 'Control general, análisis', '2025-09-08'),
(11,9, 'Chequeo de tobillo', 'Inmovilización y fisioterapia', '2025-09-03'),
(12,8, 'Consulta de insomnio', 'Tratamiento para el insomnio', '2025-08-22'),
(13,3, 'Consulta general', 'Recomendación de descanso, medicamentos', '2025-02-01'),
(14,3, 'Consulta general', 'Seguimiento, analgésicos', '2025-02-01'),
(15,3, 'Consulta general', 'Recomendación de descanso, tratamiento para dolor', '2025-02-01'),
(16,3, 'Consulta general', 'Descanso, antiinflamatorios', '2025-03-01'),
(17,3, 'Consulta general', 'Medicamentos para el dolor, revisión', '2025-02-01'),
(18,3, 'Consulta general', 'Recomendación de descanso, control', '2025-03-01'),
(19,8, 'Dolor de muelas', 'Analgésicos, revisión dental', '2025-03-20'),
(20,3, 'Dolor de cabeza', 'Analgésicos, reposo', '2025-03-10'),
(21,3, 'Marcapasos', 'Control de marcapasos, medicamentos', '2025-03-11'),
(22,3, 'Consulta general', 'Reposo, analgésicos', '2025-03-11'),
(23,3, 'Consulta general', 'Reposo, monitoreo', '2025-03-12'),
(24,1, 'Seguimiento', 'Monitoreo de salud', '2025-03-12'),
(25,5, 'Seguimiento', 'Revisión, recomendaciones médicas', '2025-03-14'),
(26,3, 'Consulta general', 'Reposo, tratamiento general', '2025-03-14');
/*(1, 3, 'Hipertensión arterial', 'Control de presión y dieta baja en sal', '2023-05-01'),
(2, 3, 'Resfriado común', 'Reposo y medicamentos sintomáticos', '2023-06-10'),
(3, 4, 'Asma bronquial', 'Uso de inhaladores y control de los síntomas', '2023-06-15'),
(4, 5, 'Alergia a ciertos medicamentos', 'Revisión de las medicinas y recomendaciones médicas', '2023-07-05'),
(5, 6, 'Dolor lumbar', 'Recomendación de fisioterapia y ejercicios', '2023-08-10'),
(6, 8, 'Insomnio', 'Recomendación de relajantes y terapia cognitivo-conductual', '2023-08-20'),
(7, 9, 'Esguince de tobillo', 'Uso de vendaje y descanso', '2023-09-01'),
(8, 10, 'Migrañas', 'Tratamiento con analgésicos y cambios en hábitos', '2023-09-03'),
(9, 11, 'Alergia estacional', 'Antihistamínicos y evitar alergenos', '2023-09-05'),
(10, 12, 'Gastritis', 'Dieta blanda y medicamentos antiácidos', '2023-09-06');*/

-- Insertar recetas
INSERT INTO recetas (id_paciente, id_historial_medico,id_cita ,nombre_medicamento, dosis, frecuencia, fecha_inicio, fecha_fin, instrucciones)
VALUES
(3, 1, 1, 'Paracetamol', '500mg', 'Cada 8 horas', '2023-05-01', '2023-05-07', 'Tomar después de las comidas'),
(3, 2, 2, 'Ibuprofeno', '400mg', 'Cada 12 horas', '2023-06-10', '2023-06-16', 'Tomar con alimentos'),
(4, 3, 3, 'Aspirina', '250mg', 'Cada 6 horas', '2023-06-20', '2023-06-27', 'Evitar tomar con alcohol'),
(5, 4, 4, 'Loratadina', '10mg', 'Una vez al día', '2023-07-15', '2023-07-22', 'Tomar en la mañana'),
(6, 5, 5, 'Metformina', '500mg', 'Dos veces al día', '2025-08-18', '2025-09-18', 'Tomar con las comidas'),
(5, 6, 6, 'Paracetamol', '500mg', 'Cada 6 horas', '2023-07-20', '2023-07-27', 'Tomar después de las comidas'),
(6, 7, 7, 'Ibuprofeno', '400mg', 'Cada 8 horas', '2023-08-10', '2023-08-17', 'Tomar con alimentos'),
(10, 8, 8, 'Sumatriptán', '50mg', 'Al inicio del dolor', '2023-09-06', '2023-09-06', 'Tomar al inicio del dolor de migraña'),
(11, 9, 9, 'Ibuprofeno', '400mg', 'Cada 12 horas', '2023-09-07', '2023-09-14', 'Tomar con alimentos'),
(12, 10, 10, 'Paracetamol', '500mg', 'Cada 8 horas', '2025-09-08', '2025-09-14', 'Tomar después de las comidas'),
(9, 11, 11, 'Doxiciclina', '100mg', 'Una vez al día', '2025-09-03', '2025-09-10', 'Tomar con un vaso de agua'),
(8, 12, 12, 'Melatonina', '5mg', 'Una vez al día', '2025-08-22', '2025-08-29', 'Tomar 30 minutos antes de dormir'),
(3, 13, 13, 'Paracetamol', '500mg', 'Cada 8 horas', '2025-02-01', '2025-02-07', 'Tomar después de las comidas'),
(3, 14, 14, 'Ibuprofeno', '400mg', 'Cada 12 horas', '2025-02-01', '2025-02-07', 'Tomar con alimentos'),
(3, 15, 15, 'Aspirina', '250mg', 'Cada 6 horas', '2025-02-01', '2025-02-07', 'Evitar tomar con alcohol'),
(3, 16, 16, 'Loratadina', '10mg', 'Una vez al día', '2025-03-01', '2025-03-07', 'Tomar en la mañana'),
(3, 17, 17, 'Metformina', '500mg', 'Dos veces al día', '2025-02-01', '2025-02-14', 'Tomar con las comidas'),
(3, 18, 18, 'Paracetamol', '500mg', 'Cada 8 horas', '2025-03-01', '2025-03-07', 'Tomar después de las comidas'),
(8, 6, 19, 'Amoxicilina', '500mg', 'Cada 8 horas', '2025-03-20', '2025-03-23', 'Tomar después de las comidas'),
(3, 7, 20, 'Paracetamol', '500mg', 'Cada 6 horas', '2025-03-10', '2025-03-13', 'Tomar con líquidos'),
(3, 8, 21, 'Metformina', '500mg', 'Dos veces al día', '2025-03-11', '2025-03-18', 'Tomar con las comidas');
/*(3, 1, 'Losartán', '50 mg', 'Una vez al día', '2023-05-01', '2023-11-01', 'Tomar por la mañana'),
(3, 2, 'Paracetamol', '500 mg', 'Cada 8 horas', '2023-06-10', '2023-06-17', 'Tomar con agua'),
(4, 3, 'Salbutamol', '100 mcg', 'Dos veces al día', '2023-06-16', '2023-12-16', 'Inhalar según sea necesario'),
(5, 4, 'Dipirona', '500 mg', 'Cada 6 horas', '2023-07-06', '2023-07-10', 'Tomar con agua después de las comidas'),
(6, 5, 'Ibuprofeno', '400 mg', 'Cada 8 horas', '2023-08-11', '2023-08-15', 'Tomar con alimento'),
(8, 6, 'Lorazepam', '1 mg', 'Antes de dormir', '2023-08-21', '2023-12-21', 'Tomar una dosis por la noche'),
(9, 8, 'Sumatriptán', '50 mg', 'Al primer síntoma de migraña', '2023-09-04', '2023-12-04', 'Tomar a la primera señal de dolor'),
(10, 9, 'Loratadina', '10 mg', 'Una vez al día', '2023-09-06', '2023-11-06', 'Tomar con alimentos'),
(11, 10, 'Omeprazol', '20 mg', 'Una vez al día', '2023-09-07', '2023-12-07', 'Tomar por la mañana con agua');*/

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


