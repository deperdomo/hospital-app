import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Cita } from '../../models/cita';


@Component({
  selector: 'app-user-nav',
  imports: [ HttpClientModule ],
  templateUrl: './user-nav.component.html',
  providers: [CitaService]
})
export class UserNavComponent {
  usuario: Usuario;
  hayCitasNoVistas: boolean = false;

  constructor(private citaService: CitaService) {
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }

    if (this.usuario.id) {
      this.citaService.getCitasNoVistasPorUsuario(this.usuario.id).subscribe(
        (citas: Cita[]) => {
          console.log('Citas no vistas: ', citas);
          if (citas.length > 0) {
            this.hayCitasNoVistas = true;
          }
        },
        error => {
          console.error('Error al obtener las citas no vistas', error);
        }
      );
    }

  }

}
