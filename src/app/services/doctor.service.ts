import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8090/doctor'; // URL del endpoint

  constructor(private http: HttpClient) { }

  getXDoctors(cantidad: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/recomendado/${cantidad}`);
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/one/${id}`);
  }


}
