import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
import { FindNavComponent } from "../../navs/find-nav/find-nav.component";
import { Doctor } from '../../models/doctor';



@Component({
  selector: 'app-index-after-login',
  imports: [LeftNavComponent, SecundaryNavComponent, BanerComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, FooterConmponent, ListaCitasComponent, DoctoresRecomendadosComponent, FindNavComponent],
  templateUrl: './index-after-login.component.html',
  styleUrl: './index-after-login.component.css',
  providers: [CitaService]
})
export class IndexAfterLoginComponent implements OnInit{
  isNerbyDoctorsAvailable = false;
  usuario: Usuario;
  doctores: Doctor[] = [];

  

  constructor(private router: Router, private citaService: CitaService) {
    this.usuario = {} as Usuario;
  }
  
  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
    this.citaService.getCitasUsuario(String(this.usuario.id)).subscribe(
      (citas: Cita[]) => {
        //console.log('Citas del usuario:', citas); 
    });
  }

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  navegativeToMisCitas(usuarioId: number) {
      this.router.navigate(['/misCitasUsuario', usuarioId]);
  }

  recibirDoctores(doctores: Doctor[]) {
    this.doctores = doctores;
    console.log('Doctores recibidos de nearby:', doctores);
  }

}
