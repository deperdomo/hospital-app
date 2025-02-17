import { Doctor } from "./doctor";

export interface Disponibilidad {
  id: number;
  horaInicio: string; // HH:mm:ss
  horaFin: string; // HH:mm:ss
  estado: string;
  comentarios: string;
  doctor: Doctor;
}
