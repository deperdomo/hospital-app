import { Cita } from "./cita";
import { HistorialMedico } from "./historialMedico";
import { Usuario } from "./usuario";

export interface Receta {
    id: number;
    nombre_medicamento: string;
    dosis:string;
    frecuencia:string;
    fechaInicio:string;
    fechaFin:string;
    instrucciones:string;
    usuario:Usuario;
    historialMedico:HistorialMedico;
    cita:Cita;
  }
  