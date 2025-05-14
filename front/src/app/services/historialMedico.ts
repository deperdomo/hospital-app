import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';
import { Receta } from '../models/receta';
import { HistorialComponent } from '../sections/historial/historial.component';
import { HistorialMedico } from '../models/historialMedico';

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {

  private apiUrl = 'http://localhost:8090/historialMedico';

  constructor(private http: HttpClient) { }

  crearHistorialMedico(idUsuario:string,historialMedico:HistorialMedico): Observable<HistorialMedico> {
    return this.http.post<HistorialMedico>(`${this.apiUrl}/alta/${idUsuario}`,historialMedico);
  }
  getHistorialMedicoId(idHistorialMedico:string): Observable<HistorialMedico>{
    return this.http.get<HistorialMedico>(`${this.apiUrl}/buscarUno/${idHistorialMedico}`);
  }
  
}
