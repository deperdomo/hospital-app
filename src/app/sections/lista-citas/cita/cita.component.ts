import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-cita',
  imports: [CommonModule],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent {
  @Input() cita!: Cita[];

  mostrartodas: boolean =false;
citas = [
  { hora: '10:00 - 10:30', doctor: 'Dr. Ashton Cleve', motivo: 'Análisis' },
  { hora: '11:00 - 11:30', doctor: 'Dr. John Doe', motivo: 'Chequeo' },
  { hora: '12:00 - 12:30', doctor: 'Dr. Jane Smith', motivo: 'Consulta' },
  { hora: '13:00 - 13:30', doctor: 'Dr. Emily White', motivo: 'Vacunación' },
  { hora: '14:00 - 14:30', doctor: 'Dr. Max Payne', motivo: 'Seguimiento' },
  { hora: '10:00 - 10:30', doctor: 'Dr. Ashton Cleve', motivo: 'Análisis' },
  { hora: '11:00 - 11:30', doctor: 'Dr. John Doe', motivo: 'Chequeo' },
  { hora: '12:00 - 12:30', doctor: 'Dr. Jane Smith', motivo: 'Consulta' },
  { hora: '13:00 - 13:30', doctor: 'Dr. Emily White', motivo: 'Vacunación' },
  { hora: '14:00 - 14:30', doctor: 'Dr. Max Payne', motivo: 'Seguimiento' }
];
constructor(private router: Router){
  this.mostrartodas = this.router.url.includes('/citas');

}
get citasMostradas(){
  return this.mostrartodas ? this.citas : this.citas.slice(0,5);
}
get isCitasPage() {
  return this.router.url === '/citas';
}
}
