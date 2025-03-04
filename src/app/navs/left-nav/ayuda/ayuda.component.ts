import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  imports: [CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {
  isOpen: boolean = false;
  @Output() cambiarEstado = new EventEmitter<boolean>();
  enviarEstado() {
    this.isOpen = false;
    this.cambiarEstado.emit(this.isOpen);
  }
  sections = [
    { id: 'citas', title: 'Gestión de Citas', icon: '📅' },
    { id: 'historial', title: 'Historial Médico', icon: '📋' },
    { id: 'doctores', title: 'Buscador de Doctores', icon: '🔍' },
    { id: 'cercanos', title: 'Doctores Cercanos', icon: '🌍' }
  ];
  activeSection: string | null = null;

  toggleSection(section: string): void {
    this.activeSection = this.activeSection === section ? null : section;
  }

}