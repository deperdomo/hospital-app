import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogDirective } from '../dialog.directive';

let siguienteId = 0;

/**
 * Confirmación de una acción destructiva (p. ej. cancelar una cita) en un <dialog appDialog role="alertdialog">.
 * El foco entra en la acción segura («Volver», con autofocus); Esc o «Volver» emiten (cerrado) y, al quitarlo
 * el padre, la directiva devuelve el foco al botón que lo abrió. La acción la hace el padre en (confirmado).
 * En móvil los botones se apilan con la acción segura debajo (modal-actions usa flex-col-reverse).
 */
@Component({
  selector: 'app-confirmar-dialog',
  imports: [DialogDirective],
  template: `
    <dialog appDialog role="alertdialog" (dialogCancel)="cerrado.emit()"
      [attr.aria-labelledby]="id + '-titulo'" [attr.aria-describedby]="id + '-texto'">
      <div class="modal-backdrop z-50 flex items-center justify-center overflow-y-auto p-4">
        <div class="modal-panel max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div class="flex items-start gap-4">
            <span class="flex-none grid place-items-center w-11 h-11 rounded-full bg-danger-50 text-danger-700" aria-hidden="true">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" focusable="false">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
            </span>
            <div class="min-w-0">
              <h2 [id]="id + '-titulo'" class="modal-title break-words">{{ titulo }}</h2>
              <p [id]="id + '-texto'" class="mt-2 text-ink-600">{{ texto }}</p>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" autofocus (click)="cerrado.emit()">{{ textoVolver }}</button>
            <button type="button" class="btn-danger" [disabled]="ocupado" (click)="confirmado.emit()">
              {{ ocupado ? textoOcupado : textoConfirmar }}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  `,
})
export class ConfirmarDialogComponent {
  @Input({ required: true }) titulo = '';
  @Input() texto = '';
  @Input() textoConfirmar = 'Sí, cancelar';
  @Input() textoVolver = 'Volver';
  @Input() textoOcupado = 'Cancelando…';
  /** Mientras el padre espera la respuesta: desactiva la acción para no enviarla dos veces. */
  @Input() ocupado = false;

  @Output() confirmado = new EventEmitter<void>();
  @Output() cerrado = new EventEmitter<void>();

  readonly id = 'confirmar-' + ++siguienteId;
}
