import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { IndexBeforeLoginComponent } from './vistas/index-before-login/index-before-login.component';
import { PatientBookingComponent } from './vistas/patient-booking/patient-booking.component';

export const routes: Routes = [
    { path: '', component: IndexBeforeLoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'reserva', component: PatientBookingComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
