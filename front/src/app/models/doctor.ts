import { Especialidad } from "./especialidad";

export interface Doctor {
  id: number;
  nombre: string;
  username: string;
  apellidos: string;
  email: string;
  provincia: string;
  localidad: string;
  direccion: string;
  fechaAlta: string;
  fotoPerfil: string;
  password: string;
  experiencia: number;
  precioConsulta: number;
  especialidad: Especialidad;
  sexo: string;
  votos: number;
}