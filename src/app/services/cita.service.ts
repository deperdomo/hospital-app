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

  getCitasDoctorEstado(id: number, estado: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/doctorEstado/${id}/${estado}`);
  }

  getCitasPendientesDoctor(id: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/doctorEstado/${id}/pendiente`);
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

  getCitasUsuarioDoctorEstado(idUsuario: number, idDoctor: number, estado: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/usuarioDoctorEstado/${idUsuario}/${idDoctor}/${estado}`);
  }
  getCitasActuales(idUsuario:string,fecha:string): Observable<Cita[]>{
    return this.http.get<Cita[]>(`${this.apiUrl}/actuales/${idUsuario}/${fecha}`);
  }
  getCitasPasadas(idUsuario:string,fecha:string): Observable<Cita[]>{
    return this.http.get<Cita[]>(`${this.apiUrl}/pasadas/${idUsuario}/${fecha}`);
  }
  getCitasProximas(idUsuario:string,fecha:string): Observable<Cita[]>{
    return this.http.get<Cita[]>(`${this.apiUrl}/proximas/${idUsuario}/${fecha}`);
  }

  //si falla aqui es elmetodo de buscartodas las citas de un usaurio
  getCitasUsuario(idUsuario:string): Observable<Cita[]>{
    return this.http.get<Cita[]>(`${this.apiUrl}/todasCitasUsuario/${idUsuario}`);
  }

  actualizarCita(cita: Cita): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizarTerminada/${cita.id}`, cita);
  }

  marcarComoVotada(id: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/marcarComoVotada/${id}`, {});
  }

    getCitasDoctor(idDoctor:string): Observable<Cita[]>{
    return this.http.get<Cita[]>(`${this.apiUrl}/citasDoctor/${idDoctor}`);
  }

}