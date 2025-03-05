import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8090/usuario'; // URL del endpoint

  constructor(private http: HttpClient) { }

  altaUsuario(usuario: Usuario): Observable<Usuario> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Usuario a dar de alta: ', usuario);
    return this.http.post<Usuario>(`${this.apiUrl}/alta`, usuario);
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/one/${id}`);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/editar`, usuario);
  }

  editarPassword(id: string, password:string): Observable<Usuario> {
    //const passwordCambiada={password:password};
    return this.http.put<Usuario>(`${this.apiUrl}/password/${id}`,password);
  }
}
