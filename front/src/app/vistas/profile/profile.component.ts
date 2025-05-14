import { Component } from '@angular/core';

import { LeftNavComponent } from '../../navs/left-nav/left-nav.component';
import { SecundaryNavComponent } from '../../navs/secundary-nav/secundary-nav.component';
import { InfoPerfilComponent } from "../../sections/info-perfil/info-perfil.component";
import { InfoDetalladaComponent } from "../../sections/info-detallada/info-detallada.component";
import { InfoGeneralComponent } from "../../sections/info-general/info-general.component";
import { PerfilNavComponent } from "../../navs/perfil-nav/perfil-nav.component";

@Component({
  selector: 'app-profile',
  imports: [LeftNavComponent, SecundaryNavComponent, InfoPerfilComponent, InfoDetalladaComponent, InfoGeneralComponent, PerfilNavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
