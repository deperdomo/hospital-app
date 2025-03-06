import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FindNavComponent } from "../find-nav/find-nav.component";
import { UserNavComponent } from "../user-nav/user-nav.component";
import { UserWelcomeNavComponent } from "./user-welcome-nav/user-welcome-nav.component";
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-secundary-nav',
  imports: [FindNavComponent, UserNavComponent, UserWelcomeNavComponent],
  templateUrl: './secundary-nav.component.html',
  styleUrl: './secundary-nav.component.css'
})
export class SecundaryNavComponent {
  isNerbyDoctorsAvailable = false;
  doctoresDeBusqueda: Doctor[] = [];

  @Input() titulo!: string;
  @Output() doctoresEncontrados = new EventEmitter<Doctor[]>();

  recibirDoctoresDeBusqueda(doctores: Doctor[]) {
    this.isNerbyDoctorsAvailable = false;
    this.doctoresDeBusqueda = doctores;
    this.doctoresEncontrados.emit(doctores);
  }

  
}
