import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita';
import { Router } from '@angular/router';
import { CitaComponent } from './cita/cita.component';
import { CitaService } from '../../services/cita.service';
import { Usuario } from '../../models/usuario';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [CommonModule, CitaComponent, HttpClientModule],
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css'],
  providers: [CitaService]
})
export class ListaCitasComponent implements OnInit {
  @Input() citas: Cita[] = [];
  mostrartodas: boolean = false;
  usuario: Usuario;
  currentDate: Date = new Date();
  cita: Cita;

  constructor(private router: Router, private citaService: CitaService) {
    this.mostrartodas = this.router.url.includes('/misCitasUsuario');
    this.usuario = {} as Usuario;
    this.cita = {} as Cita;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
    this.citaService.getCitasUsuario(String(this.usuario.id)).subscribe(
      (citas: Cita[]) => {
        //console.log('Citas del usuario:', citas);
        this.citas = citas;
      }
    );
    
  }

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


  get citasMostradas(): Cita[] {
    const month = this.currentDate.getMonth();
    if (!this.citas || this.citas.length === 0) {
      return [];
    }
    const filtrarCitas = this.citas.filter(cita => {
      const fechaCita = new Date(cita.fecha);
      return fechaCita.getMonth() === month;
    });
    return this.mostrartodas ? filtrarCitas : filtrarCitas.slice(0, 5);
  }

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

  // mesSeleccionado(mes: number) {
  //   this.currentDate = new Date(this.currentDate.getFullYear(), mes, 1);
  // }
}