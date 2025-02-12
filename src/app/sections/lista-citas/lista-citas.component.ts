import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { CitaComponent } from "./cita/cita.component";
//CitaComponent
@Component({
  selector: 'app-lista-citas',
  imports: [CommonModule],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css'
})
export class ListaCitasComponent {
// en caso de fallo es esto
mostartodas: boolean =false;
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
  this.mostartodas = this.router.url.includes('/citas');

}
get citasMostradas(){
  return this.mostartodas ? this.citas : this.citas.slice(0,4);
}
get isCitasPage() {
  return this.router.url === '/citas';
}

}
