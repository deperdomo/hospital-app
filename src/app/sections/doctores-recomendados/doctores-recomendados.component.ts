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
  doctor1: Doctor;
  doctor2: Doctor;
  doctor3: Doctor;

  constructor( private doctorService: DoctorService) {
    this.doctor1 = {} as Doctor;
    this.doctor2 = {} as Doctor;
    this.doctor3 = {} as Doctor;
  }

  ngOnInit() {
    this.doctorService.getXDoctors(3).subscribe(
      (doctores: Doctor[]) => {
        console.log('Doctores recomendados:', doctores);
        if (doctores.length > 0) {
          this.doctor1 = doctores[0];
          this.doctor2 = doctores[1];
          this.doctor3 = doctores[2];
        }
      },
      error => {
        console.error('Error al recuperar los usuarios recomendados', error);
      });
  }
}
