import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { IndexBeforeLoginComponent } from './vistas/index-before-login/index-before-login.component';

export const routes: Routes = [
    { path: '', component: IndexBeforeLoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
