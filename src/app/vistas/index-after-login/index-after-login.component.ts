import { Component } from '@angular/core';
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { InfoDoctorComponent } from "../../sections/info-doctor/info-doctor.component";
import { NearbyDoctorsComponent } from "../../nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "../../nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "../../footer/footer.component";
import { ListaCitasComponent } from "../../sections/lista-citas/lista-citas.component";
import { BanerComponent } from '../../sections/baner/baner.component';
import { DoctoresRecomendadosComponent } from "../../sections/doctores-recomendados/doctores-recomendados.component";


@Component({
  selector: 'app-index-after-login',
  imports: [LeftNavComponent, SecundaryNavComponent, BanerComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, FooterConmponent, ListaCitasComponent, DoctoresRecomendadosComponent],
  templateUrl: './index-after-login.component.html',
  styleUrl: './index-after-login.component.css'
})
export class IndexAfterLoginComponent {

  isNerbyDoctorsAvailable = false;

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

}
