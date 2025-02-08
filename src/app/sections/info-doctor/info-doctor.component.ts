import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-info-doctor',
  imports: [],
  templateUrl: './info-doctor.component.html',
  styleUrl: './info-doctor.component.css'
})
export class InfoDoctorComponent {
  @Input() doctor: Doctor | null = null;

}
