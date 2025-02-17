import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cita } from "../models/cita";

@Injectable({
    providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://localhost:8090/cita';

  constructor(private http: HttpClient) {}

  altaCita(cita: Cita): Observable<Cita> {
      return this.http.post<Cita>(`${this.apiUrl}/alta`, cita);
  }

  getCitasUsuario(id: string): Observable<Cita[]> {
    console.log("Entrando al getCitasUsuario");
    return this.http.get<Cita[]>(`${this.apiUrl}/misCitasUsuario/${id}`);
  }

  getCitasNoVistasPorUsuario(id: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citasNoVistas/${id}`);
  }

  getCitasDoctor(id: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/misCitasDoctor/${id}`);
  }
  //cancelar cita
  cancelarCita(id: number): Observable<Cita[]>{
    return this.http.put<Cita[]>(`${this.apiUrl}/cancelar/${id}`,{});
  }


}
