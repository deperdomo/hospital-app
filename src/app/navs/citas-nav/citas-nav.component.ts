import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-nav-citas',
  imports: [CommonModule],
  templateUrl: './citas-nav.component.html',
  styleUrl: './citas-nav.component.css',
  providers: [CitaService]
})
export class NavCitasComponent {
  currentDate: Date = new Date();
  // selectedMonth: number = new Date().getMonth();
  // @Input() citas: Cita[] = [];
  // cita: Cita;
  // usuario: Usuario;
  // months: string[] = [];
  // monthsList: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // constructor(private citaService: CitaService, private mesSeleccionadoService: MesSeleccionadoService) {
  //   this.cita = {} as Cita;
  //   this.usuario = {} as Usuario;
  // }

  getCurrentMonthYear(): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = this.currentDate.toLocaleString('es-ES', options);
    return this.capitalizeFirstLetter(formattedDate);
  }


  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  // nextMonth() {
  //   this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
  //   this.updateMonthList();
  // }

  // Cambia el mes seleccionado
  // onMonthSelected(event: any) {
  //   // const selectElement = event.target as HTMLSelectElement;
  //   // const mes = selectElement ? parseInt(selectElement.value, 10) : 0;
  //   // this.currentDate = new Date(this.currentDate.getFullYear(), mes, 1);
  //   // this.updateMonthList();
  //   // this.monthSelected.emit(mes);
  //   const monthIndex = (event.target.value, 10);
  //   this.mesSeleccionadoService.setMonth(monthIndex);
  // }

  // // Actualizar la lista de meses
  // updateMonthList() {
  //   const currentMonthIndex = this.currentDate.getMonth();
  //   this.months = this.monthsList.slice(currentMonthIndex); // Obtén solo los meses siguientes
  // }

  // ngOnInit() {
  //   this.updateMonthList();
  // }

  // cargarPorMes() {
  //   this.mesSeleccionadoService.selectedMonth$.subscribe((month: number) => {
  //     this.selectedMonth = month;
  //     this.cargarCitas();
  //   }
  //   );
  //   this.cargarCitas();
  // }

  // cargarCitas() {
  //   this.citaService.getCitasUsuario(String(this.usuario.id)).subscribe(
  //     (citas: Cita[]) => {
  //       console.log("mes seleccionado", this.selectedMonth);
        
  //       this.citas = citas.filter(cita => new Date(cita.fecha).getMonth() === this.selectedMonth);
  //       console.log('Comparación:', new Date(this.cita.fecha).getMonth());
  //     }
  //   );
  // }

}
