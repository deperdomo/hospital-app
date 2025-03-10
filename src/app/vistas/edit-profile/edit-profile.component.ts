import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { UserNavComponent } from "../../navs/user-nav/user-nav.component";
import { TitleJakartaComponent } from "../../navs/title-jakarta/title-jakarta.component";
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [UserNavComponent, TitleJakartaComponent, FormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
  providers: [UsuarioService,DoctorService]
})
export class EditProfileComponent {
  usuario: Usuario;
  errorMessage: string = '';

  doctor: Doctor;
  usuarios: boolean=false;

  constructor(private usuarioService: UsuarioService, private router: Router, private doctorService: DoctorService) {
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

  navigateToProfile() {
    this.router.navigate(['/perfil']);
  }

  editar() {
    console.log('Usuario que envio: ', this.usuario);
if (this.usuarios) {
  this.usuarioService.editarUsuario(this.usuario).subscribe(
    (usuario: Usuario) => {
      console.log(usuario);
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      this.navigateToProfile();
    },
    (error) => {
      console.log(error);
      this.errorMessage = error.error;
    }
  );
} else{
  this.doctorService.editarDoctor(this.doctor).subscribe(
    (doctor:Doctor)=> {
      console.log(doctor);
      localStorage.setItem('doctor', JSON.stringify(this.doctor));
    }
  )
}
    
  }

}
