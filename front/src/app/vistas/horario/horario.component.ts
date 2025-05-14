import { Component } from '@angular/core';
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { HorarioDoctorComponent } from "../../sections/horario-doctor/horario-doctor.component";

@Component({
  selector: 'app-horario',
  imports: [LeftNavComponent, SecundaryNavComponent, HorarioDoctorComponent],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {

}
