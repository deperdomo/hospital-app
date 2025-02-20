import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { UserNavComponent } from "../../navs/user-nav/user-nav.component";
import { TitleJakartaComponent } from "../../navs/title-jakarta/title-jakarta.component";
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-edit-profile',
  imports: [UserNavComponent, TitleJakartaComponent, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
  providers: [UsuarioService]
})
export class EditProfileComponent {
  usuario: Usuario;
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }
  }

  navigateToProfile() {
    this.router.navigate(['/perfil']);
  }

  editar() {
    console.log('Usuario que envio: ', this.usuario);

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
  }

}
