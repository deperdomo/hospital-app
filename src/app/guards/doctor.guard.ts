import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
    usuario: Usuario;

    constructor(private router: Router) {
        this.usuario = {} as Usuario;
    }

    canActivate(): boolean {
        const doctorGuardado = localStorage.getItem('doctor');
        if (doctorGuardado) {
            return true;
        }
        this.router.navigate(['/index']);
        return false;
    }
    
}
