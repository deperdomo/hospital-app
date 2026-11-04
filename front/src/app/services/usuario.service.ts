import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/api/usuario'; // URL del endpoint

  constructor(private http: HttpClient) { }

  altaUsuario(usuario: Usuario): Observable<Usuario> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Usuario>(`${this.apiUrl}/alta`, usuario);
  }

  buscarUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/buscarUno/${id}`);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/editar`, usuario);
  }

  editarPassword(id: string, actual: string, nueva: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/password/${id}`, { actual, nueva });
  }
}
