-- Cuentas de demostración con datos siempre vigentes:
--   paciente "demo" / "demo1234"  y  doctora "ana" / "ana".
--
-- Idempotente: recrea el usuario y regenera sus citas, historial y recetas con
-- fechas relativas a HOY. Lo ejecuta un cron diario (ver README) para que la demo
-- tenga siempre citas próximas y para deshacer lo que cambien los visitantes.
--
--   docker exec -i hospital-db psql -U hospital -d hospital_jakarta -v ON_ERROR_STOP=1 < back/src/main/resources/bd/demo_reset.sql
--
-- Las citas se reparten entre doctores existentes; la doctora Ana Martínez (ana / ana)
-- tiene además una cita hoy con este paciente, útil para probar la vista de doctor.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios (nombre, apellidos, username, email, telefono, provincia, localidad, direccion,
                      fecha_nacimiento, fecha_alta, foto_perfil, password, sexo, rol)
VALUES ('Lucas', 'Demo', 'demo', 'demo@hospitaljakarta.example', '600123456', 'Madrid', 'Centro',
        'Calle Mayor 1', '1988-04-12', CURRENT_DATE - 90, 'usu_anonimo.png',
        crypt('demo1234', gen_salt('bf', 10)), 'masculino', 'paciente')
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
    uid int;
    c   record;
    hid int;
BEGIN
    SELECT id INTO uid FROM usuarios WHERE username = 'demo';

    -- Borrar lo anterior (orden por las claves foráneas)
    DELETE FROM recetas WHERE id_paciente = uid OR id_cita IN (SELECT id FROM citas WHERE id_usuario = uid);
    DELETE FROM historial_medico WHERE id_usuario = uid;
    DELETE FROM facturas WHERE id_usuario = uid;
    DELETE FROM citas WHERE id_usuario = uid;

    -- Citas con fechas relativas a hoy (días, hora)
    INSERT INTO citas (id_usuario, id_doctor, fecha, email, telefono, motivo, tarifa, forma_pago, estado, visto, votado)
    SELECT uid, v.doc, CURRENT_DATE + v.dias + v.hora, 'demo@hospitaljakarta.example', '600123456',
           v.motivo, d.precio_consulta, v.pago, v.estado, v.visto, v.votado
    FROM (VALUES
        (3,   0, time '18:00', 'Revisión postoperatoria',      'Tarjeta de crédito', 'pendiente', 1, false),
        (8,   2, time '10:30', 'Revisión anual y limpieza',    'Tarjeta de crédito', 'pendiente', 0, false), -- sin ver: notificación
        (5,   6, time '09:00', 'Revisión de un lunar',         'Efectivo',           'pendiente', 1, false),
        (6,  13, time '16:30', 'Consulta general',             'Transferencia',      'pendiente', 1, false),
        (3, -12, time '11:00', 'Dolor abdominal',              'Tarjeta de crédito', 'terminada', 1, true),
        (2, -30, time '12:00', 'Dolor de muelas',              'Efectivo',           'terminada', 1, false),
        (5, -20, time '17:00', 'Consulta dermatológica',       'Tarjeta de crédito', 'cancelada', 1, false)
    ) AS v(doc, dias, hora, motivo, pago, estado, visto, votado)
    JOIN doctores d ON d.id = v.doc;

    -- Historial médico y receta de cada cita terminada
    FOR c IN SELECT id, fecha, motivo FROM citas WHERE id_usuario = uid AND estado = 'terminada' ORDER BY fecha LOOP
        INSERT INTO historial_medico (id_usuario, diagnostico, tratamiento, fecha)
        VALUES (uid,
                CASE WHEN c.motivo = 'Dolor de muelas' THEN 'Caries en molar inferior derecho'
                     ELSE 'Gastritis leve' END,
                CASE WHEN c.motivo = 'Dolor de muelas' THEN 'Empaste y analgésico durante 3 días'
                     ELSE 'Dieta blanda y protector gástrico durante 2 semanas' END,
                c.fecha::date)
        RETURNING id INTO hid;

        INSERT INTO recetas (id_paciente, id_historial_medico, id_cita, nombre_medicamento, dosis, frecuencia,
                             fecha_inicio, fecha_fin, instrucciones)
        VALUES (uid, hid, c.id,
                CASE WHEN c.motivo = 'Dolor de muelas' THEN 'Ibuprofeno' ELSE 'Omeprazol' END,
                CASE WHEN c.motivo = 'Dolor de muelas' THEN '600mg' ELSE '20mg' END,
                CASE WHEN c.motivo = 'Dolor de muelas' THEN 'Cada 8 horas' ELSE 'Una vez al día, en ayunas' END,
                c.fecha::date,
                c.fecha::date + CASE WHEN c.motivo = 'Dolor de muelas' THEN 3 ELSE 14 END,
                CASE WHEN c.motivo = 'Dolor de muelas' THEN 'Tomar con alimentos'
                     ELSE 'Tomar 30 minutos antes del desayuno' END);
    END LOOP;
END $$;

COMMIT;
