import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Doctor } from '../models/doctor';

export interface LoginResponse {
  token: string;
  perfil: Usuario | Doctor;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string, tipo: 'paciente' | 'doctor'): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password, tipo });
  }
}
