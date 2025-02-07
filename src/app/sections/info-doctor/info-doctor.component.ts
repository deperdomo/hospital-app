import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-info-doctor',
  imports: [],
  templateUrl: './info-doctor.component.html',
  styleUrl: './info-doctor.component.css'
})
export class InfoDoctorComponent {
  @Input() doctor: Usuario | null = null;

}
