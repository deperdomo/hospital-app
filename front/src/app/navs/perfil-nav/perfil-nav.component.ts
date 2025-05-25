import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-nav',
  imports: [CommonModule],
  templateUrl: './perfil-nav.component.html',
  styleUrl: './perfil-nav.component.css'
})
export class PerfilNavComponent {

  @Input() selectedGeneral: boolean = true;

}
