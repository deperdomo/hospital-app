import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { BanerComponent } from "./baner/baner.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RegistroComponent, BanerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-vita';
}
