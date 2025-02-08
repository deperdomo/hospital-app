import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { InfoDoctorComponent } from "../info-doctor/info-doctor.component";
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'cont-doctores-recomendados',
  imports: [InfoDoctorComponent, HttpClientModule],
  templateUrl: './doctores-recomendados.component.html',
  styleUrl: './doctores-recomendados.component.css',
  providers: [DoctorService]
})
export class DoctoresRecomendadosComponent {
  doctor1: Doctor | null = null;
    doctor2: Doctor | null = null;
    doctor3: Doctor | null = null;

    constructor( private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getXDoctors(3).subscribe(
      (doctores: Doctor[]) => {
        console.log('Doctores recomendados:', doctores);
        if (doctores.length > 0) {
          this.doctor1 = doctores[0] || null;
          this.doctor2 = doctores[1] || null;
          this.doctor3 = doctores[2] || null;
        }
      },
      error => {
        console.error('Error al recuperar los usuarios recomendados', error);
      });
  }
}
