import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-welcome-nav',
  imports: [],
  templateUrl: './user-welcome-nav.component.html',
})
export class UserWelcomeNavComponent {
  nombreApellido: string = '';
  isDoctor: boolean = false;
  isUsuario: boolean = false;
  sexo: string = '';
  @Input() titulo!: string;


  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.isUsuario = true;
      this.sexo = usuario.sexo;
      this.nombreApellido = usuario.nombre + ' ' + usuario.apellidos;
    } else if (doctorGuardado) {
      const doctor = JSON.parse(doctorGuardado);
      this.isDoctor = true;
      this.sexo = doctor.sexo;
      this.nombreApellido = doctor.nombre + ' ' + doctor.apellidos;
    }
  }
}
