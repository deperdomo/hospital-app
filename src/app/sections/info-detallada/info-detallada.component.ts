import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-info-detallada',
  imports: [],
  templateUrl: './info-detallada.component.html',
  styleUrl: './info-detallada.component.css'
})
export class InfoDetalladaComponent {
  usuario: Usuario;
  edad:number=0;
 constructor() {
     this.usuario = {} as Usuario;
     
   }
   ngOnInit() {
     const usuarioGuardado = localStorage.getItem('usuario');
     if (usuarioGuardado) {
       const usuario = JSON.parse(usuarioGuardado);
       this.usuario = usuario;
       console.log("COMPROBANDO",this.usuario)
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
