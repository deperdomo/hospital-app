import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {
  private actualizar = new Subject<void>();
  actualizar$ = this.actualizar.asObservable();

  solicitarRecarga() {
    this.actualizar.next();
  }

}
