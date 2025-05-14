import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) {}

  // Método para recuperar todo el usuario
  getUserByUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/one/${username}`);
  }

  // Método para recuperar todo el doctor
  getDoctorByUsername(username: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctor/oneByUsername/${username}`);
  }

}
