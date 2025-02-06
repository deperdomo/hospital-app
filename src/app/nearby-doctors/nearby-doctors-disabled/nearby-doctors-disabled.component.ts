import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nearby-doctors-disabled',
  imports: [],
  templateUrl: './nearby-doctors-disabled.component.html',
})
export class NearbyDoctorsDisabledComponent {
  @Output() habilitarNerbyDoctors = new EventEmitter<void>();

  cambiarEstado() {
    this.habilitarNerbyDoctors.emit(); // Emitimos al padre
  }
}
