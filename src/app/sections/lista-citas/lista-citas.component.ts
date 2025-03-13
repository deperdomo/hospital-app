import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita';
import { Router } from '@angular/router';
import { CitaComponent } from './cita/cita.component';
import { CitaService } from '../../services/cita.service';
import { Usuario } from '../../models/usuario';
import { HttpClientModule } from '@angular/common/http';
import { Doctor } from '../../models/doctor';

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
  doctor: Doctor;
  currentDate: Date = new Date();
  cita: Cita;
  fechaProximasCitas: boolean = true;
  fechaPasadasCitas: boolean = false;
  fechaCanceladasCitas: boolean = false;

  @Input() selectedMonth: number = new Date().getMonth();

  constructor(private router: Router, private citaService: CitaService) {
    this.mostrartodas = this.router.url.includes('/misCitasUsuario');
    this.usuario = {} as Usuario;
    this.cita = {} as Cita;
    this.doctor = {} as Doctor;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');

    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      this.cargarCitasActivas();
      this.actualizarEstadoCitas();
    } else if (doctorGuardado) {
      this.doctor = JSON.parse(doctorGuardado);
      this.cargarCitasActivas();
      this.actualizarEstadoCitas();
    } else {
      console.error('No hay usuario ni doctor logueado');
    }

  }

 
  getMonthName(monthIndex: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[monthIndex];
  }

  onMonthSelected(month: number) {
    this.selectedMonth = month;
    this.cargarCitasActivas();
    console.log(this.selectedMonth);
  }

  cargarCitasActivas() {
    const hoy = new Date();
    hoy.setHours(hoy.getHours() + 1);
    const fechaActual = hoy.toISOString();

    if (this.usuario) {
      this.citaService.getCitasActivasUsuario(String(this.usuario.id)).subscribe(
        (citas: Cita[]) => {
          this.citas = citas.filter(cita => {
            const fechaCita = new Date(cita.fecha);
            fechaCita.setMinutes(fechaCita.getMinutes() + 30);
            const fechaFinCita = fechaCita.toISOString();
            return this.mostrartodas ? fechaFinCita > fechaActual && new Date(cita.fecha).getMonth() === this.selectedMonth && cita.estado==='pendiente' : fechaFinCita > fechaActual && cita.estado==='pendiente';
          })
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        },
        error => {
          console.error('Error fetching active appointments:', error);
        });

    }
    if (this.doctor) {
      this.citaService.getCitasDoctor(String(this.doctor.id)).subscribe(
        (citas: Cita[]) => {
          this.citas = citas.filter(cita => {
            const fechaCita = new Date(cita.fecha);
            fechaCita.setMinutes(fechaCita.getMinutes() + 30);
            const fechaFinCita = fechaCita.toISOString();
            return this.mostrartodas ? fechaFinCita > fechaActual && new Date(cita.fecha).getMonth() === this.selectedMonth && cita.estado==='pendiente' : fechaFinCita > fechaActual && cita.estado==='pendiente';
          })
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        },
        error => {
          console.error('Error fetching active appointments:', error);
        });
    }
  }

  actualizarEstadoCitas() {
    const hoy = new Date();
    hoy.setHours(hoy.getHours() + 1);
    const fechaActual = hoy.toISOString();
    if (this.usuario) {
      this.citaService.getCitasActivasUsuario(String(this.usuario.id)).subscribe(
        (citas: Cita[]) => {
          citas.forEach(cita => {
            const fechaCita = new Date(cita.fecha);
            fechaCita.setMinutes(fechaCita.getMinutes() + 30);
            const fechaFinCita = fechaCita.toISOString();
            if (fechaFinCita <= fechaActual && cita.estado === 'pendiente') {
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
    if (this.doctor) {
      this.citaService.getCitasDoctor(String(this.doctor.id)).subscribe(
        (citas: Cita[]) => {
          citas.forEach(cita => {
            const fechaCita = new Date(cita.fecha);
            fechaCita.setMinutes(fechaCita.getMinutes() + 30);
            const fechaFinCita = fechaCita.toISOString();
            if (fechaFinCita <= fechaActual && cita.estado === 'pendiente') {
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
  }

  cargarCitasCanceladas() {
    if (this.usuario) {
      this.citaService.getCitasCanceladasUsuario(String(this.usuario.id)).subscribe(
        (citas: Cita[]) => {
          this.citas = citas.filter((cita) => cita.estado === 'cancelada')
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        }
      )
    }
    if (this.doctor) {
      this.citaService.getCitasDoctor(String(this.doctor.id)).subscribe(
        (citas: Cita[]) => {
          this.citas = citas.filter((cita) => cita.estado === 'cancelada')
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        }
      )
    }
  }

  cargarCitasPasadas() {
    const hoy = new Date();
    hoy.setHours(hoy.getHours() + 1);
    const fechaActual = hoy.toISOString();
    if (this.usuario) {
      this.citaService.getCitasTerminadoUsuario(String(this.usuario.id)).subscribe(
        (citas: Cita[]) => {
          this.citas = citas.filter(cita => {
            const fechaCita = new Date(cita.fecha).toISOString();
            return fechaCita < fechaActual && new Date(cita.fecha).getMonth() === this.currentDate.getMonth() && cita.estado === 'terminada';
          })
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        }
      )
    }
    if (this.doctor) {
      this.citaService.getCitasDoctor(String(this.doctor.id)).subscribe(
        (citas: Cita[]) => {
          this.citas = citas.filter(cita => {
            const fechaCita = new Date(cita.fecha).toISOString();
            return fechaCita < fechaActual && new Date(cita.fecha).getMonth() === this.currentDate.getMonth() && cita.estado === 'terminada';
          })
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        }
      )
    }
  }

  get citasMostradas(): Cita[] {
    if (this.mostrarCanceladas) {
      this.fechaProximasCitas = false;
      this.fechaCanceladasCitas = true;
      this.fechaPasadasCitas = false;
      return this.citas.filter((cita) => cita.estado === 'cancelada');
    } if (this.mostrarPasadas) {
      this.fechaProximasCitas = false;
      this.fechaPasadasCitas = true;
      this.fechaCanceladasCitas = false;
      return this.citas.filter((cita) => cita.estado === 'terminada');
    } else {
      const filtrarCitas = this.citas.filter(cita => {
       return cita.estado === 'pendiente';
        
      });
      if (this.mostrartodas) {
        this.fechaProximasCitas = false; 
        this.fechaPasadasCitas = false;
        this.fechaCanceladasCitas = false;
        return filtrarCitas;
      } else {
        return filtrarCitas.slice(0, 5);
      }
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


}