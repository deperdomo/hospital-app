import { Component, EventEmitter, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CitaService } from '../../services/cita.service';
import { MesesService } from '../../services/meses.service';
import { Usuario } from '../../models/usuario';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-nav-citas',
  imports: [CommonModule],
  templateUrl: './citas-nav.component.html',
  styleUrl: './citas-nav.component.css',
  providers: [CitaService, MesesService]
})
export class NavCitasComponent implements OnInit {
  
  usuario: Usuario;
  doctor: Doctor;
  currentDate: Date = new Date();
  selectedButton: string = 'proxima';
  isUsuario: boolean = false;
  months: { monthName: string, monthNumber: number }[] = [];
  selectedMonth: number = this.currentDate.getMonth();

  @Output() citasProximas = new EventEmitter<void>();
  @Output() citasCanceladas = new EventEmitter<void>();
  @Output() citasPasadas = new EventEmitter<void>();
  @Output() monthSelected = new EventEmitter<number>();

  constructor(private mesesService: MesesService) {
    this.generateNextSixMonths();
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }

  ngOnInit () {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      this.isUsuario = true;
    } else if (doctorGuardado) {
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      this.isUsuario= false;
    }
  }


  generateNextSixMonths() {
    this.months = this.mesesService.getNextSixMonths();
  }

  onMonthSelected(event: any) {
    this.selectedMonth = parseInt(event.target.value, 10);
    this.monthSelected.emit(this.selectedMonth);  
    
  }

  getCurrentMonthYear(): string {
    const date = new Date();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${month}/${year}`;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  onSelectButton(buttonType: string) {
    this.selectedButton = buttonType;
    
  }

  listaCitasProximas() {
    this.citasProximas.emit();
  }

  listaCitasPasadas() {
    this.citasPasadas.emit();
  }

  listaCitasCanceladas() {
    this.citasCanceladas.emit();
  }

}
