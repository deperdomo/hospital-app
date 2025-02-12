import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaComponent } from "./cita/cita.component";

//CitaComponent
@Component({
  selector: 'app-lista-citas',
  imports: [CommonModule,CitaComponent ],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css'
})
export class ListaCitasComponent {
// en caso de fallo es esto
}
