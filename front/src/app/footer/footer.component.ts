import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterConmponent {
usuario: Usuario;
doctor: Doctor;
 
constructor(){
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }
  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');

    if (usuarioGuardado) {
     
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }else if (doctorGuardado) {
      
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      console.log("COMPROBANDO",this.doctor)
     }
  }
}