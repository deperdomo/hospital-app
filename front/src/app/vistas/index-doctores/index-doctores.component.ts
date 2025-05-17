import { Component } from '@angular/core';
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { BanerComponent } from "../../sections/baner/baner.component";
import { FooterConmponent } from "../../footer/footer.component";
import { NearbyDoctorsComponent } from "../../nearby-doctors/nearby-doctors/nearby-doctors.component";
import { CitaService } from '../../services/cita.service';
import { Doctor } from '../../models/doctor';
import { Cita } from '../../models/cita';
import { ListaCitasComponent } from "../../sections/lista-citas/lista-citas.component";

@Component({
  selector: 'app-index-doctores',
  imports: [LeftNavComponent, SecundaryNavComponent, BanerComponent, FooterConmponent, NearbyDoctorsComponent, ListaCitasComponent],
  templateUrl: './index-doctores.component.html',
  styleUrl: './index-doctores.component.css',
  providers: [CitaService]
})
export class IndexDoctoresComponent {
  doctor: Doctor;
  citasHoy: Cita[] = [];

  constructor(private citaService: CitaService) {
    this.doctor = {} as Doctor;
  }

  ngOnInit() {
    this.doctor = JSON.parse(localStorage.getItem('doctor') || '{}');

    if (this.doctor.id) {
      // si quires que salgan las de hoy no pueden ser las pendientes, porque cuando pasa su hora se cambian a terminadas
      this.citaService.getCitasDoctorEstado(this.doctor.id, 'pendiente').subscribe(
        (citas: Cita[]) => {
          this.citasHoy = [];
          const today = new Date().toISOString().split('T')[0];
          citas.forEach(cita => {
            if (new Date(cita.fecha).toISOString().split('T')[0] === today) {
              this.citasHoy.push(cita);
            }

          });
        });
    }

  }

}




