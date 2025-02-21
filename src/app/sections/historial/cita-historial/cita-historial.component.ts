import { Component, Input } from '@angular/core';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';
import { Doctor } from '../../../models/doctor';
import { DoctorService } from '../../../services/doctor.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-cita-historial',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './cita-historial.component.html',
  styleUrl: './cita-historial.component.css',
  providers:[CitaService]
})

export class CitaHistorialComponent {
  // @Input() doctor!: Doctor;
   //@Input() cita!:Cita;

  // constructor(private citaService: CitaService,private doctorService:DoctorService){}
   usuario: Usuario;
   //necesito cita
   citas:Cita[]=[];
   constructor(private citaService:CitaService) {
       this.usuario = {} as Usuario;
      // this.cita={} as Cita;
     }
     ngOnInit() {
      console.log("esta en ngOninit")
      console.log("Comprobando",this.citas)
       const usuarioGuardado = localStorage.getItem('usuario');
       if (usuarioGuardado) {
         const usuario = JSON.parse(usuarioGuardado);
         this.usuario = usuario;
         console.log("esto es pasado el if", this.usuario.id)
         console.log("COMPROBANDO",this.usuario)
         console.log("probando id", this.usuario.id)
         //this.obtenerCitaUsuario(this.usuario.id);
         if (this.usuario.id !== undefined) {
          this.obtenerCitaUsuario(this.usuario.id);
        } else {
          console.error("El ID del usuario es undefined.");
        }
       }

     }
    obtenerCitaUsuario(id:number){
      console.log("obtener citaaaaaaaaaaaaaaa")
      this.citaService.getCitasTerminadoUsuario(id.toString()).subscribe(
        (citas)=>{

          this.citas=citas;

        },
        (error) => {
          console.error("Error obteniendo la cita:", error);
        }
      )
      // this.citaService.getCitasUsuario(id.toString()).subscribe(
      //   (citas)=>{
      //     this.citas=citas;
      //   },
      //   (error) => {
      //     console.error("Error obteniendo la cita:", error);
      //   }
      // )
    }
    //sumar media hora a la hora
    sumarMediaHora(fecha: string): Date {
      const fechaObjeto = new Date(fecha);
      const nuevaFecha = new Date(fechaObjeto);
      nuevaFecha.setMinutes(nuevaFecha.getMinutes() + 30);
      return nuevaFecha;
    }

}
