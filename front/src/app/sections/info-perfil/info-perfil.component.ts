import { Component, Input } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Doctor } from '../../models/doctor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-perfil',
  imports: [CommonModule],
  templateUrl: './info-perfil.component.html',
  styleUrl: './info-perfil.component.css',
  providers: [DoctorService, UsuarioService]
})
export class InfoPerfilComponent {
  // @Input() doctor!: Doctor;
  // @Input() usuario!: Usuario;
  usuario: Usuario;
  doctor: Doctor;
  usuarios: boolean=false;
  
  constructor() {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
   
    
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      this.usuarios=true
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      
    }
    else if (doctorGuardado) {
      this.usuarios = false
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      console.log("COMPROBANDO",this.doctor)
     }

  }

}
