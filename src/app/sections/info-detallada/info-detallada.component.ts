import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Doctor } from '../../models/doctor';


@Component({
  selector: 'app-info-detallada',
  imports: [],
  templateUrl: './info-detallada.component.html',
  styleUrl: './info-detallada.component.css'
})
export class InfoDetalladaComponent {
  usuario: Usuario;
  edad:number=0;
  doctor:Doctor;
  usuarios: boolean=false;
 constructor() {
     this.usuario = {} as Usuario;
      this.doctor={} as Doctor;
   }
   ngOnInit() {
    
     const usuarioGuardado = localStorage.getItem('usuario');
     const doctorGuardado= localStorage.getItem('doctor');
     if (usuarioGuardado) {
      this.usuarios=true;
       const usuario = JSON.parse(usuarioGuardado);
       this.usuario = usuario;
       console.log("COMPROBANDO",this.usuario)
     }
     if (doctorGuardado) {
      this.usuarios=false;
      const doctor= JSON.parse(doctorGuardado);
      this.doctor=doctor;
      console.log("COMPROBANDO",this.doctor)
     }


 
   }

// calcular la edad
calcularEdad(fechaNacimiento: string): number {
 const añoNacimiento = parseInt(fechaNacimiento.substring(0, 4));

 if (isNaN(añoNacimiento)) {
   return 0;  // Si no es un año válido, devolveremos 0
 }

 const añoActual = new Date().getFullYear();
 return añoActual - añoNacimiento;  // Calculamos la edad y la devolvemos
}
}
