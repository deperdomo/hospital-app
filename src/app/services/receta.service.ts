import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private apiUrl = 'http://localhost:8090/receta';

  constructor(private http: HttpClient) { }

  getRecetaCita(idUsuario:string, idCita:string): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/miReceta/${idUsuario}/${idCita}`);
  }
  altaReceta(idUsuario:string,idCita:string,idHistorialMedico:string,receta:Receta): Observable<Receta>{
    return this.http.post<Receta>(`${this.apiUrl}/alta/${idUsuario}/${idCita}/${idHistorialMedico}`,receta);
  }
}
