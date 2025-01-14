import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-vita';
}
