import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8090/doctor'; // URL del endpoint

  constructor(private http: HttpClient) { }

  getXDoctors(cantidad: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/recomendado/${cantidad}`);
  }



}
