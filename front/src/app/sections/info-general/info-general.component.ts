import { AVISO_CUENTA_DEMO, esCuentaDemo } from '../../shared/cuenta-demo';
import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-info-general',
  imports: [],
  templateUrl: './info-general.component.html',
  styleUrl: './info-general.component.css'
})
export class InfoGeneralComponent {
  readonly cuentaDemo = esCuentaDemo();
  readonly avisoDemo = AVISO_CUENTA_DEMO;
  
}
