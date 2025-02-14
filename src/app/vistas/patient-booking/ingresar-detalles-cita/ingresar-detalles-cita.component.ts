import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor } from './../../../models/doctor';
import { Usuario } from './../../../models/usuario';
import { Cita } from '../../../models/cita';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'ingresar-detalles-cita',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './ingresar-detalles-cita.component.html',
  providers: [DoctorService, CitaService]
})
export class IngresarDetallesCitaComponent {

  usuario: Usuario;
  doctor: Doctor;
  cita: Cita;
  doctorId: string = '';

  @Input() fecha!: Date;

  constructor(private doctorServise: DoctorService, private citaService: CitaService, private route: ActivatedRoute, private router: Router) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
    this.cita = {
       id: 0,
       fecha: '',
       email: '',
       telefono: '',
       motivo: '',
       tarifa: 0,
       formaPago: '',
       estado: '',
       visto: 0,
       usuario: this.usuario,
       doctor: this.doctor
    };
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      this.cita.email = this.usuario.email;
      this.cita.telefono = this.usuario.telefono;
    };

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = id;
      } else {
        // Manejar el caso en el que el id sea null, si es necesario
        console.error('No se encontró el id del doctor en la URL');
      }
    });

    this.doctorServise.getDoctorById(this.doctorId).subscribe(
      (doctor: Doctor) => {
        this.doctor = doctor;
      },
      error => {
        console.error('Error al buscar el doctor', error);
      }
    );

  }

  onSubmit() {
    this.cita.doctor = this.doctor;
    this.cita.usuario = this.usuario;
    this.cita.estado = 'pendiente';
    this.cita.tarifa = this.doctor.precioConsulta;
    this.cita.fecha = this.fecha.toISOString();

    this.citaService.altaCita(this.cita).subscribe(
      (cita: Cita) => {
        console.log('Cita registrada:', cita);
        this.router.navigate(['/index']);
      },
      error => {
        console.error('Error en el registro', error);
      }
    );

  }


}
