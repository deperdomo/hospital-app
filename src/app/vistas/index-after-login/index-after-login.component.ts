import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de que esto esté importado
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { NearbyDoctorsComponent } from "../../nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "../../nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "../../footer/footer.component";
import { ListaCitasComponent } from "../../sections/lista-citas/lista-citas.component";
import { BanerComponent } from '../../sections/baner/baner.component';
import { DoctoresRecomendadosComponent } from "../../sections/doctores-recomendados/doctores-recomendados.component";
import { Usuario } from '../../models/usuario';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { Doctor } from '../../models/doctor';
import { FindNavComponent } from "../../navs/find-nav/find-nav.component";



@Component({
  selector: 'app-index-after-login',
  imports: [LeftNavComponent, SecundaryNavComponent, BanerComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, FooterConmponent, ListaCitasComponent, DoctoresRecomendadosComponent, CommonModule],
  templateUrl: './index-after-login.component.html',
  styleUrl: './index-after-login.component.css',
  providers: [CitaService]
})
export class IndexAfterLoginComponent implements OnInit {
  isNerbyDoctorsAvailable = false;
  usuario: Usuario;
  doctoresDeBusqueda: Doctor[] = [];
  doctoresCercanos: Doctor[] = [];
  isLeftNavOpen: boolean = false;
  isMobile: boolean = false;

  constructor(private router: Router, private citaService: CitaService) {
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      this.citaService.getCitasActivasUsuario(String(this.usuario.id)).subscribe(
        (citas: Cita[]) => {
          //console.log('Citas del usuario:', citas);
        });
    }
    this.checkWindowSize();

  }

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  navegativeToMisCitas(usuarioId: number) {
    this.router.navigate(['/misCitasUsuario', usuarioId]);
  }

  recibirDoctoresDeBusqueda(doctores: Doctor[]) {
    this.isNerbyDoctorsAvailable = false;
    this.doctoresDeBusqueda = doctores;
    //console.log('Doctores recibidos de find-nav:', doctores);
  }

  recibirDoctoresCercanos(doctores: Doctor[]) {
    this.doctoresCercanos = doctores;
    //console.log('Doctores recibidos de nearby:', doctores);
  }

  // Método para alternar la visibilidad del Left-Nav
  toggleLeftNav() {
    this.isLeftNavOpen = !this.isLeftNavOpen; // Cambia el estado de apertura

  }

  @HostListener('window:resize', ['$event']) // Recalcula el tamaño cuando se redimensione la ventana
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    // Verifica si el ancho de la ventana es menor o igual a 768px (para móviles)
    this.isMobile = window.innerWidth <= 1225;
  }


}
