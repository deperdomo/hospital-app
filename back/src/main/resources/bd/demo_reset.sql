-- Cuentas de demostración con datos siempre vigentes:
--   paciente "demo" / "demo1234"  y  doctora "ana" / "ana".
--
-- Idempotente: recrea los pacientes de demo y regenera sus citas, historial y recetas
-- con fechas RELATIVAS A HOY. Lo ejecuta un cron diario (ver README), así que la demo
-- siempre tiene citas de hoy y de los próximos días, y cada noche se deshace lo que
-- hayan cambiado los visitantes (cancelar, reservar, marcar como vistas...).
--
--   docker exec -i hospital-db psql -U hospital -d hospital_jakarta -v ON_ERROR_STOP=1 < back/src/main/resources/bd/demo_reset.sql
--
-- Pacientes de demo: "demo" (con contraseña pública) y dos más que solo existen para
-- llenar la agenda de la doctora Ana ("marta.demo" y "pablo.demo", sin contraseña conocida).
-- Notificaciones: visto = 0 avisa al paciente; visto_doctor = 0 avisa a la doctora.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios (nombre, apellidos, username, email, telefono, provincia, localidad, direccion,
                      fecha_nacimiento, fecha_alta, foto_perfil, password, sexo, rol)
VALUES ('Lucas', 'Demo', 'demo', 'demo@hospitaljakarta.example', '600123456', 'Madrid', 'Centro',
        'Calle Mayor 1', '1988-04-12', CURRENT_DATE - 90, 'usu_anonimo.png',
        crypt('demo1234', gen_salt('bf', 10)), 'masculino', 'paciente'),
       ('Marta', 'Demo', 'marta.demo', 'marta.demo@hospitaljakarta.example', '600123457', 'Madrid', 'Retiro',
        'Calle Alcalá 200', '1992-09-30', CURRENT_DATE - 60, 'usu_anonimo.png',
        crypt(gen_random_uuid()::text, gen_salt('bf', 10)), 'femenino', 'paciente'),
       ('Pablo', 'Demo', 'pablo.demo', 'pablo.demo@hospitaljakarta.example', '600123458', 'Madrid', 'Arganzuela',
        'Paseo de las Delicias 30', '1979-02-03', CURRENT_DATE - 45, 'usu_anonimo.png',
        crypt(gen_random_uuid()::text, gen_salt('bf', 10)), 'masculino', 'paciente')
ON CONFLICT (username) DO UPDATE SET
    nombre = EXCLUDED.nombre, apellidos = EXCLUDED.apellidos, email = EXCLUDED.email,
    telefono = EXCLUDED.telefono, provincia = EXCLUDED.provincia, localidad = EXCLUDED.localidad,
    direccion = EXCLUDED.direccion, fecha_nacimiento = EXCLUDED.fecha_nacimiento,
    fecha_alta = EXCLUDED.fecha_alta, foto_perfil = EXCLUDED.foto_perfil,
    password = EXCLUDED.password, sexo = EXCLUDED.sexo, rol = 'paciente';

-- Doctora de demostración ana / ana: contraseña y horario de consulta conocidos
UPDATE doctores SET password = crypt('ana', gen_salt('bf', 10)) WHERE username = 'ana';
UPDATE disponibilidad SET hora_inicio = '09:00', hora_fin = '19:00', estado = 'disponible',
       comentarios = 'Horario de consulta'
 WHERE id_doctor = (SELECT id FROM doctores WHERE username = 'ana');

DO $$
DECLARE
    uids int[];
    ana  int;
    c    record;
    hid  int;
BEGIN
    SELECT array_agg(id) INTO uids FROM usuarios WHERE username IN ('demo', 'marta.demo', 'pablo.demo');
    SELECT id INTO ana FROM doctores WHERE username = 'ana';

    -- Borrar lo anterior de los pacientes de demo (orden por las claves foráneas)
    DELETE FROM recetas WHERE id_paciente = ANY (uids) OR id_cita IN (SELECT id FROM citas WHERE id_usuario = ANY (uids));
    DELETE FROM historial_medico WHERE id_usuario = ANY (uids);
    DELETE FROM facturas WHERE id_usuario = ANY (uids);
    DELETE FROM citas WHERE id_usuario = ANY (uids);

    -- Citas relativas a hoy. doc = NULL significa la doctora Ana.
    INSERT INTO citas (id_usuario, id_doctor, fecha, email, telefono, motivo, tarifa, forma_pago,
                       estado, visto, visto_doctor, votado)
    SELECT u.id, d.id,
           -- la clínica no abre en fin de semana: lo que caiga en sábado/domingo se mueve
           -- al lunes siguiente (citas futuras) o al viernes anterior (pasadas). Hoy no se mueve.
           CURRENT_DATE + v.dias
             + CASE WHEN v.dias = 0 THEN 0
                    ELSE CASE extract(isodow FROM CURRENT_DATE + v.dias)
                             WHEN 6 THEN CASE WHEN v.dias > 0 THEN 2 ELSE -1 END
                             WHEN 7 THEN CASE WHEN v.dias > 0 THEN 1 ELSE -2 END
                             ELSE 0 END
               END
             + v.hora,
           u.email, u.telefono,
           v.motivo, d.precio_consulta, v.pago, v.estado, v.visto, v.visto_doctor, v.votado
    FROM (VALUES
        -- paciente     doctor  días  hora           motivo                         pago                  estado       visto v.doctor votado
        ('demo',        NULL,    0, time '18:00', 'Revisión postoperatoria',     'Tarjeta de crédito', 'pendiente', 1, 1, false),
        ('demo',        8,       2, time '10:30', 'Revisión anual y limpieza',   'Tarjeta de crédito', 'pendiente', 0, 1, false), -- aviso al paciente
        ('demo',        NULL,    3, time '10:00', 'Resultados de la analítica',  'Tarjeta de crédito', 'pendiente', 0, 0, false), -- aviso a los dos
        ('demo',        5,       6, time '09:00', 'Revisión de un lunar',        'Efectivo',           'pendiente', 1, 1, false),
        ('demo',        6,      13, time '16:30', 'Consulta general',            'Transferencia',      'pendiente', 1, 1, false),
        ('demo',        NULL,  -12, time '11:00', 'Dolor abdominal',             'Tarjeta de crédito', 'terminada', 1, 1, true),
        ('demo',        2,     -30, time '12:00', 'Dolor de muelas',             'Efectivo',           'terminada', 1, 1, false),
        ('demo',        5,     -20, time '17:00', 'Consulta dermatológica',      'Tarjeta de crédito', 'cancelada', 1, 1, false),
        ('demo',        5,     -45, time '12:00', 'Manchas en la piel',          'Tarjeta de crédito', 'terminada', 1, 1, true),
        ('demo',        1,     -75, time '09:30', 'Control de tensión arterial', 'Efectivo',           'terminada', 1, 1, false),
        -- agenda de la doctora Ana con otros pacientes de demo
        ('marta.demo',  NULL,    0, time '09:30', 'Primera consulta',            'Tarjeta de crédito', 'pendiente', 1, 1, false),
        ('pablo.demo',  NULL,    0, time '12:30', 'Dolor lumbar',                'Efectivo',           'pendiente', 1, 1, false),
        ('pablo.demo',  NULL,    1, time '09:00', 'Revisión de la cicatriz',     'Efectivo',           'pendiente', 1, 0, false), -- aviso a la doctora
        ('marta.demo',  NULL,    1, time '16:00', 'Consulta preoperatoria',      'Tarjeta de crédito', 'pendiente', 1, 0, false), -- aviso a la doctora
        ('marta.demo',  NULL,    7, time '11:30', 'Seguimiento',                 'Tarjeta de crédito', 'pendiente', 1, 1, false),
        ('pablo.demo',  NULL,   -5, time '10:00', 'Esguince de tobillo',         'Efectivo',           'terminada', 1, 1, false),
        ('marta.demo',  NULL,  -15, time '09:30', 'Revisión preoperatoria',      'Tarjeta de crédito', 'terminada', 1, 1, false)
    ) AS v(paciente, doc, dias, hora, motivo, pago, estado, visto, visto_doctor, votado)
    JOIN usuarios u ON u.username = v.paciente
    JOIN doctores d ON d.id = COALESCE(v.doc, ana);

    -- Historial médico y receta de cada cita terminada
    FOR c IN
        SELECT ci.id, ci.id_usuario, ci.fecha, t.diagnostico, t.tratamiento, t.medicamento, t.dosis,
               t.frecuencia, t.dias, t.instrucciones
        FROM citas ci
        JOIN (VALUES
            ('Dolor de muelas', 'Caries en molar inferior derecho', 'Empaste y analgésico durante 3 días',
             'Ibuprofeno', '600mg', 'Cada 8 horas', 3, 'Tomar con alimentos'),
            ('Dolor abdominal', 'Gastritis leve', 'Dieta blanda y protector gástrico durante 2 semanas',
             'Omeprazol', '20mg', 'Una vez al día, en ayunas', 14, 'Tomar 30 minutos antes del desayuno'),
            ('Esguince de tobillo', 'Esguince de tobillo grado I', 'Reposo relativo, hielo y vendaje compresivo',
             'Paracetamol', '1g', 'Cada 8 horas si hay dolor', 5, 'No superar 3 g al día'),
            ('Manchas en la piel', 'Dermatitis seborreica leve', 'Higiene con jabón suave y crema antifúngica',
             'Ketoconazol crema 2%', 'Capa fina', 'Dos veces al día', 21, 'Aplicar sobre la piel limpia y seca'),
            ('Control de tensión arterial', 'Hipertensión arterial grado 1', 'Dieta baja en sal, ejercicio y control mensual',
             'Enalapril', '10mg', 'Una vez al día', 90, 'Tomar siempre a la misma hora'),
            ('Revisión preoperatoria', 'Apta para cirugía programada', 'Ayuno de 8 horas antes de la intervención',
             'Omeprazol', '20mg', 'Una vez al día', 7, 'Empezar 2 días antes de la cirugía')
        ) AS t(motivo, diagnostico, tratamiento, medicamento, dosis, frecuencia, dias, instrucciones)
          ON t.motivo = ci.motivo
        WHERE ci.id_usuario = ANY (uids) AND ci.estado = 'terminada'
        ORDER BY ci.fecha
    LOOP
        INSERT INTO historial_medico (id_usuario, diagnostico, tratamiento, fecha)
        VALUES (c.id_usuario, c.diagnostico, c.tratamiento, c.fecha::date)
        RETURNING id INTO hid;

        INSERT INTO recetas (id_paciente, id_historial_medico, id_cita, nombre_medicamento, dosis, frecuencia,
                             fecha_inicio, fecha_fin, instrucciones)
        VALUES (c.id_usuario, hid, c.id, c.medicamento, c.dosis, c.frecuencia,
                c.fecha::date, c.fecha::date + c.dias, c.instrucciones);
    END LOOP;
END $$;

COMMIT;
