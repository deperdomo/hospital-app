import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nearby-doctors-disabled',
  imports: [],
  templateUrl: './nearby-doctors-disabled.component.html',
  styleUrl: './nearby-doctors-disabled.component.css'
})
export class NearbyDoctorsDisabledComponent {
  @Output() habilitarNerbyDoctors = new EventEmitter<void>();

  cambiarEstado() {
    this.habilitarNerbyDoctors.emit(); // Emitimos al padre
  }
}
