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

  getCitasActivasUsuario(id: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/misCitasUsuario/${id}`);
  }

  getCitasCanceladasUsuario(id: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/misCitasCanceladasUsuario/${id}`);
  }

  getCitasNoVistasPorUsuario(id: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citasNoVistas/${id}`);
  }

  getCitasDoctor(id: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/misCitasDoctor/${id}`);
  }
  //cancelar cita
  cancelarCita(id: number): Observable<Cita[]>{
    return this.http.put<Cita[]>(`${this.apiUrl}/cancelar/${id}`,{});
  }

  marcarCitaComoVista(id: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/marcarComoVista/${id}`, {});
  }
  //citas estado terminado
  getCitasTerminadoUsuario(id: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/misCitasUsuarioTerminado/${id}`);
  }
}
