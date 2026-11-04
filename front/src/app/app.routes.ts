import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { DoctorGuard } from './guards/doctor.guard';

import { LoginComponent } from './login/login/login.component';
import { IndexBeforeLoginComponent } from './vistas/index-before-login/index-before-login.component';

const T = ' · Hospital Jakarta';

export const routes: Routes = [
    // Landing and login stay eager: they are the entry points and avoid an extra chunk round-trip before LCP.
    { path: '', component: IndexBeforeLoginComponent, canActivate: [RedirectGuard], title: 'Inicio' + T },
    { path: 'login', component: LoginComponent, title: 'Iniciar sesión' + T },
    { path: 'registro', loadComponent: () => import('./login/registro/registro.component').then(m => m.RegistroComponent), title: 'Registro' + T },
    { path: 'index', loadComponent: () => import('./vistas/index-after-login/index-after-login.component').then(m => m.IndexAfterLoginComponent), canActivate: [AuthGuard], title: 'Inicio' + T },
    { path: 'nuevaCita/:id', loadComponent: () => import('./vistas/patient-booking/patient-booking.component').then(m => m.PatientBookingComponent), canActivate: [AuthGuard], title: 'Nueva cita' + T },
    { path: 'misCitasUsuario', loadComponent: () => import('./vistas/vistas-citas/vistas-citas.component').then(m => m.IndexVistasCitasComponent), canActivate: [AuthGuard], title: 'Mis citas' + T },
    { path: 'perfil', loadComponent: () => import('./vistas/profile/profile.component').then(m => m.ProfileComponent), canActivate: [AuthGuard], title: 'Mi perfil' + T },
    { path: 'perfilHistorial', loadComponent: () => import('./vistas/perfil-historial/perfil-historial.component').then(m => m.PerfilHistorialComponent), canActivate: [AuthGuard], title: 'Historial médico' + T },
    // { path: 'verReceta', component: RecetaComponent, canActivate: [AuthGuard]  },
    { path: 'editarPerfil', loadComponent: () => import('./vistas/edit-profile/edit-profile.component').then(m => m.EditProfileComponent), canActivate: [AuthGuard], title: 'Editar perfil' + T },
    { path: 'editarPassword', loadComponent: () => import('./vistas/info-general-cambio-password/info-general-cambio-password.component').then(m => m.InfoGeneralCambioPasswordComponent), canActivate: [AuthGuard], title: 'Cambiar contraseña' + T },
    { path: 'listaDoctores', loadComponent: () => import('./vistas/doctores/doctores.component').then(m => m.DoctoresComponent), title: 'Doctores' + T },
    { path: 'indexDoctores', loadComponent: () => import('./vistas/index-doctores/index-doctores.component').then(m => m.IndexDoctoresComponent), canActivate: [DoctorGuard], title: 'Panel del doctor' + T },
    { path: 'horario', loadComponent: () => import('./vistas/horario/horario.component').then(m => m.HorarioComponent), canActivate: [AuthGuard], title: 'Horario' + T },
    { path: 'especialidades', loadComponent: () => import('./vistas/lista-especializaciones/lista-especializaciones.component').then(m => m.ListaEspecializacionesComponent), title: 'Especialidades' + T },
    { path: 'informes/:id', loadComponent: () => import('./sections/historial/cita-historial/informes/informes.component').then(m => m.InformesConmponent), title: 'Informe médico' + T },
    { path: 'nuevaReceta/:id/:idCita', loadComponent: () => import('./vistas/formulario-historial-medico/formulario-historial-medico.component').then(m => m.FormularioHistorialMedicoComponent), title: 'Nuevo historial médico' + T },
    { path: 'formularioReceta/:idUsuario/:idCita/:idHistorialMedico', loadComponent: () => import('./vistas/formulario-receta/formulario-receta.component').then(m => m.FormularioRecetaComponent), title: 'Nueva receta' + T },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]


  })
  export class AppRoutingModule { }
