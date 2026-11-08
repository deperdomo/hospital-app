/**
 * Cuentas públicas de demostración (ver back/src/main/resources/bd/demo_reset.sql).
 * El backend no permite cambiar su perfil ni su contraseña (403): aquí se avisa antes.
 * Los usernames se repiten entre tablas, así que se mira paciente y doctor por separado.
 */
const PACIENTE_DEMO = 'demo';
const DOCTOR_DEMO = 'ana';

export const AVISO_CUENTA_DEMO =
  'Estás usando una cuenta de demostración: el perfil y la contraseña no se pueden modificar.';

export function esCuentaDemo(): boolean {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario') ?? 'null');
    if (usuario) return usuario.username === PACIENTE_DEMO;
    const doctor = JSON.parse(localStorage.getItem('doctor') ?? 'null');
    return doctor?.username === DOCTOR_DEMO;
  } catch {
    return false;
  }
}
