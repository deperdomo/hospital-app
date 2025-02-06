import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { IndexBeforeLoginComponent } from './vistas/index-before-login/index-before-login.component';
import { PatientBookingComponent } from './vistas/patient-booking/patient-booking.component';
import { IndexVistasCitasComponent } from './vistas/vistas-citas/vistas-citas.component';
import { IndexAfterLoginComponent } from './vistas/index-after-login/index-after-login.component';
import { ProfileComponent } from './vistas/profile/profile.component';

export const routes: Routes = [
    { path: '', component: IndexBeforeLoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'index', component: IndexAfterLoginComponent, canActivate: [AuthGuard] },
    { path: 'nuevaCita', component: PatientBookingComponent, canActivate: [AuthGuard] },
    { path: 'citas', component: IndexVistasCitasComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
