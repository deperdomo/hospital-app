import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = 'http://localhost:8090/usuario';

  constructor(private http: HttpClient) {}

  // Método para recuperar todo el usuario 
  getUserByUsername(username: string): Observable<Usuario> {
    console.log("Entrando al getUserByUsername");
    
    return this.http.get<Usuario>(`${this.apiUrl}/one/${username}`);
  }

}
