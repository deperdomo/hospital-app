import { Component, Input } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-info-perfil',
  imports: [],
  templateUrl: './info-perfil.component.html',
  styleUrl: './info-perfil.component.css',
  providers: [DoctorService, UsuarioService]
})
export class InfoPerfilComponent {
  @Input() doctor!: Doctor;
  @Input() usuario!: Usuario;

}
