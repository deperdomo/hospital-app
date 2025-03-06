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
  @Input() mostrarCanceladas: boolean = false;
  @Input() mostrarPasadas: boolean = false;
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
    this.actualizarEstadoCitas();
    this.cargarCitasActivasUsuario();
    
  }

  actualizarEstadoCitas() {
    const hoy = new Date();
    hoy.setHours(hoy.getHours() + 1);
    const fechaActual = hoy.toISOString();

    this.citaService.getCitasActivasUsuario(String(this.usuario.id)).subscribe(
    (citas: Cita[]) => {
      citas.forEach(cita => {
        const fechaCita = new Date(cita.fecha).toISOString();
        if (fechaCita <= fechaActual) {
          cita.estado = 'terminada';
          this.citaService.actualizarCita(cita).subscribe(
            response => {
              console.log(`Cita ${cita.id} actualizada a terminada`);
            },
            error => {
              console.error(`Error actualizando cita ${cita.id}:`, error);
            }
          );
        }
      });
    },
    error => {
      console.error('Error fetching active appointments:', error);
    }
  );
  }

  cargarCitasActivasUsuario() {
  
    const hoy = new Date();
    hoy.setHours(hoy.getHours() + 1);
    const fechaActual = hoy.toISOString();

    console.log("FECHA HOY:", fechaActual);
  
    console.log('se mete en ACTIVAS de lista-citas');
    this.citaService.getCitasActivasUsuario(String(this.usuario.id)).subscribe(
      (citas: Cita[]) => {
        this.citas = citas.filter(cita => {
          const fechaCita = new Date(cita.fecha).toISOString();
          return fechaCita > fechaActual && new Date(cita.fecha).getMonth() === this.currentDate.getMonth();
        })
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        console.log('ACTIVAS:', this.citas);
      },
      error => {
        console.error('Error fetching active appointments:', error);
      }
 
    );
  }

  // cargarCitasActivasDoctor() {
  
  //   const hoy = new Date();
  //   hoy.setHours(hoy.getHours() + 1);
  //   const fechaActual = hoy.toISOString();

  //   console.log("FECHA HOY:", fechaActual);
  
  //   console.log('se mete en ACTIVAS de lista-citas');
  //   this.citaService.getCitasDoctor(String(this.usuario.id)).subscribe(
  //     (citas: Cita[]) => {
  //       this.citas = citas.filter(cita => {
  //         const fechaCita = new Date(cita.fecha).toISOString();
  //         return fechaCita > fechaActual && new Date(cita.fecha).getMonth() === this.currentDate.getMonth();
  //       })
  //       .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  //       console.log('ACTIVAS:', this.citas);
  //     },
  //     error => {
  //       console.error('Error fetching active appointments:', error);
  //     }
 
  //   );
  // }

  cargarCitasCanceladasUsuario() {
    console.log('se mete en CANCELADAS de lista-citas');
    this.citaService.getCitasCanceladasUsuario(String(this.usuario.id)).subscribe(
      (citas: Cita[]) => {
        console.log('CANCELADAS:', citas);
        this.citas = citas.filter((cita) => cita.estado === 'cancelada')
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        console.log('CANCELADAS:', this.citas);
      }
    )
  }

  cargarCitasPasadasUsuario() {
    const hoy = new Date();
    hoy.setHours(hoy.getHours() + 1);
    const fechaActual = hoy.toISOString();

    console.log('se mete en PASADAS de lista-citas');
    this.citaService.getCitasTerminadoUsuario(String(this.usuario.id)).subscribe(
      (citas: Cita[]) => {
        this.citas = citas.filter(cita => {
          const fechaCita = new Date(cita.fecha).toISOString();
          return fechaCita < fechaActual && new Date(cita.fecha).getMonth() === this.currentDate.getMonth() && cita.estado === 'terminada';
        })
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        console.log('PASADAS:', this.citas);
      }
    )
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
    if (this.mostrarCanceladas) {
      return this.citas.filter((cita) => cita.estado === 'cancelada');
    } if (this.mostrarPasadas) {
      return this.citas.filter((cita) => cita.estado === 'terminada');
    } else {
      const filtrarCitas = this.citas.filter(cita => {
        const fechaCita = new Date(cita.fecha);
        const month = this.currentDate.getMonth();
        return fechaCita.getMonth() === month;
      });
      return this.mostrartodas ? filtrarCitas : filtrarCitas.slice(0, 5);
    }
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