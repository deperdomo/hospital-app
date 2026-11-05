import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /** Con <base href="/"> un "#contenido" navegaría a la raíz: se mueve el foco a mano. */
  saltarAlContenido(event: Event): void {
    const destino = document.getElementById('contenido');
    if (destino) {
      event.preventDefault();
      if (!destino.hasAttribute('tabindex')) {
        destino.setAttribute('tabindex', '-1');
      }
      destino.focus();
      destino.scrollIntoView();
    }
  }
}
