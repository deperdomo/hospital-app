import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita';
import { Router } from '@angular/router';
import { CitaComponent } from './cita/cita.component';
import { CitaService } from '../../services/cita.service';
import { Usuario } from '../../models/usuario';
import { HttpClientModule } from '@angular/common/http';


//CitaComponent
@Component({
  selector: 'app-lista-citas',
  imports: [CommonModule, CitaComponent, HttpClientModule],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css',
  providers: [CitaService]
})
export class ListaCitasComponent {
  @Input() citas!: Cita[];
  mostrartodas: boolean =false;
  usuario: Usuario;
  constructor(private router: Router, private citaService: CitaService) {
    this.mostrartodas = this.router.url.includes('/misCitasUsuario');
    this.usuario = {} as Usuario;
    // this.mostrartodas = this.router.url.includes('/citas');
    
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
    this.citaService.getCitasUsuario(String(this.usuario.id)).subscribe(
      (citas: Cita[]) => {
        console.log('Citas del usuario:', citas);
        this.citas = citas;
    });
  }

  get citasMostradas(){
    return this.mostrartodas ? this.citas : this.citas.slice(0, 5);
  }

}
