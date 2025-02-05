import { Component } from '@angular/core';
import { CitaComponent } from "./cita/cita.component";

@Component({
  selector: 'app-lista-citas',
  imports: [CitaComponent],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css'
})
export class ListaCitasComponent {

}
