import { Usuario } from "./usuario";

export interface HistorialMedico {
   id:number;
   diagnostico:string;
   tratamiento:string;
   fecha:string;
   usuario:Usuario;
  }