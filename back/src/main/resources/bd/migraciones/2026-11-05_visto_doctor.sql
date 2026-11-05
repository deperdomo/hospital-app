-- Notificaciones para doctores: cada cita guarda si el doctor ya la ha visto.
-- Las citas existentes se dan por vistas; las reservas nuevas llegan con 0 (no vista).
-- Aplicar en una BD ya creada (las instalaciones nuevas lo traen en hospital_jakarta_pg.sql):
--   docker exec -i hospital-db psql -U hospital -d hospital_jakarta < back/src/main/resources/bd/migraciones/2026-11-05_visto_doctor.sql
ALTER TABLE citas ADD COLUMN IF NOT EXISTS visto_doctor INT NOT NULL DEFAULT 1;
