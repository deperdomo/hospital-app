import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';

import { CalendarComponent } from "../../sections/calendar/calendar.component";
import { UserNavComponent } from "../../navs/user-nav/user-nav.component";
import { TitleJakartaComponent } from "../../navs/title-jakarta/title-jakarta.component";
import { Doctor } from '../../models/doctor';


@Component({
  selector: 'app-patient-booking',
  imports: [CalendarComponent, UserNavComponent, TitleJakartaComponent,  HttpClientModule],
  templateUrl: './patient-booking.component.html',
  providers: [DoctorService]
})
export class PatientBookingComponent {
  doctorId: string = '';
  doctor: Doctor | null = null;

  constructor(private doctorServise: DoctorService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = id;
        console.log('Doctor ID:', this.doctorId);
      } else {
        // Manejar el caso en el que el id sea null, si es necesario
        console.error('No se encontró el id del doctor en la URL');
      }
    });

    this.doctorServise.getDoctorById(this.doctorId).subscribe(
      (doctor: Doctor) => {
        console.log('Doctor encontrado:', doctor);
        this.doctor = doctor;
      },
      error => {
        console.error('Error al buscar el doctor', error);
      }
    );
  }




}
