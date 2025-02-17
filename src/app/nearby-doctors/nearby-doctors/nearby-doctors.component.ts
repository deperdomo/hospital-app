import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-nearby-doctors',
  imports: [],
  templateUrl: './nearby-doctors.component.html',
})
export class NearbyDoctorsComponent {
  @Input() doctor!: Doctor;
}
