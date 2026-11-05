/**
 * Partes de la fecha de una cita para el bloque de fecha de las tarjetas.
 * La API guarda la hora local como si fuera UTC (las plantillas ya usan 'UTC' con el DatePipe),
 * así que aquí también se formatea en UTC para que día y hora coincidan.
 */
export interface PartesFecha {
  diaSemana: string; // "sáb"
  dia: string;       // "07"
  mes: string;       // "nov"
  larga: string;     // "sábado, 7 de noviembre de 2026"
}

export function partesFecha(fecha: string): PartesFecha {
  const d = new Date(fecha);
  const fmt = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString('es-ES', { ...o, timeZone: 'UTC' });
  return {
    diaSemana: fmt({ weekday: 'short' }).replace('.', ''),
    dia: fmt({ day: '2-digit' }),
    mes: fmt({ month: 'short' }).replace('.', ''),
    larga: fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

export function sumarMediaHora(fecha: string): Date {
  const d = new Date(fecha);
  d.setMinutes(d.getMinutes() + 30);
  return d;
}
