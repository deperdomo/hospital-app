import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { IndexBeforeLoginComponent } from './vistas/index-before-login/index-before-login.component';
import { PatientBookingComponent } from './vistas/patient-booking/patient-booking.component';
import { IndexVistasCitasComponent } from './vistas/vistas-citas/vistas-citas.component';
import { IndexAfterLoginComponent } from './vistas/index-after-login/index-after-login.component';
import { ProfileComponent } from './vistas/profile/profile.component';
import { PerfilHistorialComponent } from './vistas/perfil-historial/perfil-historial.component';
import { EditProfileComponent } from './vistas/edit-profile/edit-profile.component';
import { DoctoresComponent } from './vistas/doctores/doctores.component';

export const routes: Routes = [
    { path: '', component: IndexBeforeLoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'index', component: IndexAfterLoginComponent, canActivate: [AuthGuard] },
    { path: 'nuevaCita/:id', component: PatientBookingComponent, canActivate: [AuthGuard] },
    { path: 'misCitasUsuario', component: IndexVistasCitasComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'perfilHistorial', component: PerfilHistorialComponent, canActivate: [AuthGuard]  },
    // { path: 'perfilHistorial/:id', component: PerfilHistorialComponent, canActivate: [AuthGuard]  }
    // { path: 'verReceta', component: RecetaComponent, canActivate: [AuthGuard]  },
    { path: 'editarPerfil', component: EditProfileComponent, canActivate: [AuthGuard]  },
    { path: 'listaDoctores', component: DoctoresComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    
    
  })
  export class AppRoutingModule { }
