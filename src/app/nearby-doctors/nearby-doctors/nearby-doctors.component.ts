import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nearby-doctors',
  imports: [],
  templateUrl: './nearby-doctors.component.html',
  styleUrls: ['./nearby-doctors.component.css'],
})
export class NearbyDoctorsComponent {
  @Input() doctor!: Doctor;

  constructor(private router: Router) {}

  navigateToNewAppointment(doctorId: number) {
    this.router.navigate(['/nuevaCita', doctorId]);
  }


}


