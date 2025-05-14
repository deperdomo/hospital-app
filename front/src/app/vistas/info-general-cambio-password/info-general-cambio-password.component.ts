import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
//import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-info-general-cambio-password',
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './info-general-cambio-password.component.html',
  styleUrl: './info-general-cambio-password.component.css',
  providers: [UsuarioService,DoctorService]
})
export class InfoGeneralCambioPasswordComponent {
  usuario: Usuario;
  repetirAntiguaPassword :string=''; //esta es la repeticion de la password
  antiguaPassword:string=''; //esta es la password antigua
  
  nuevaPassword:string='';//esta seria para la password actual

  doctor: Doctor;
  usuarios: boolean=false;
  
  constructor(private router: Router, private usuarioService: UsuarioService, private doctorService: DoctorService){
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }
  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      this.usuarios=true;
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

  redirigirPaginaPerfil(){
    this.router.navigate(['/perfil']);
  }
  //comprobacion de contraseñas
  compararPassword(){
    if (this.usuarios) {
       console.log("comprobando antigua Password", this.usuario.password)
  // comprpobr password
  if (this.usuario.password === this.antiguaPassword && this.usuario.password === this.repetirAntiguaPassword && this.antiguaPassword!=this.nuevaPassword ) {
    //comprobaciones
    console.log("password antigua desde la variable",this.antiguaPassword)
    console.log("passsword directamente de usuario", this.usuario.password)
    console.log("coprobando id de Usuario", this.usuario.id)
    console.log("nueva contraseña que quiere cambiar",this.nuevaPassword);
    //si todo es correcto hiria el servicio para cambiar la contraseña 
    if (this.usuario.id!= undefined) {
    this.usuarioService.editarPassword(this.usuario.id.toString(), this.nuevaPassword).subscribe(
      () => {
        console.log("ya has pasasdo el service");
       this.redirigirPaginaPerfil();
      },
      (error) => {
        
      }
    );
     }
  }
    }else{
      if (this.doctor.password === this.antiguaPassword && this.doctor.password === this.repetirAntiguaPassword && this.antiguaPassword!=this.nuevaPassword ) {
        //comprobaciones
        console.log("password antigua desde la variable",this.antiguaPassword)
        console.log("passsword directamente de usuario", this.doctor.password)
        console.log("coprobando id de Usuario", this.doctor.id)
        console.log("nueva contraseña que quiere cambiar",this.nuevaPassword);
        //si todo es correcto hiria el servicio para cambiar la contraseña 
        if (this.doctor.id!= undefined) {
        this.doctorService.editarPassword(this.doctor.id.toString(), this.nuevaPassword).subscribe(
          () => {
            console.log("ya has pasasdo el service");
           this.redirigirPaginaPerfil();
          },
          (error) => {
            
          }
        );
         }
      }
    }
   
  


  }
  
  
}
