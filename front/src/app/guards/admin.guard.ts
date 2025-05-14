import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    usuario: Usuario;

    constructor(private router: Router) {
        this.usuario = {} as Usuario;
    }

    canActivate(): boolean {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            this.usuario = usuario;
            if (this.usuario.rol === 'admin') {
                return true;
            }
        }
        this.router.navigate(['/index']);
        return false;
    }
    
}
