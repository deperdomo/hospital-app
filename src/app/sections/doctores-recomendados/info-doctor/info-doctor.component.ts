import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Doctor } from '../../../models/doctor';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-info-doctor',
  imports: [CommonModule],
  templateUrl: './info-doctor.component.html',
  styleUrl: './info-doctor.component.css'
})
export class InfoDoctorComponent {
  @Input() doctor!: Doctor ;

  constructor(private router: Router) {}

  navigateToNewAppointment(doctorId: number) {
    this.router.navigate(['/nuevaCita', doctorId]);
  }
}
