import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';

/**
 * Convierte un <dialog> en modal nativo: se abre con showModal() al crearse
 * (fondo inerte, foco dentro), Esc emite (dialogCancel) para que el padre cierre
 * con su lógica de siempre, y al destruirse devuelve el foco a quien lo abrió.
 */
@Directive({
  selector: 'dialog[appDialog]',
  standalone: true,
  host: { class: 'app-dialog' },
})
export class DialogDirective implements AfterViewInit, OnDestroy {
  @Output() dialogCancel = new EventEmitter<void>();

  private opener: HTMLElement | null = null;
  private destroyed = false;

  constructor(private el: ElementRef<HTMLDialogElement>) {}

  ngAfterViewInit(): void {
    const active = document.activeElement;
    this.opener = active instanceof HTMLElement && active !== document.body ? active : null;
    const dialog = this.el.nativeElement;
    if (!dialog.open && dialog.isConnected) {
      dialog.showModal();
    }
  }

  @HostListener('cancel', ['$event'])
  onCancel(event: Event): void {
    event.preventDefault();
    this.dialogCancel.emit();
  }

  /** Si el navegador cierra el diálogo por su cuenta, se avisa igualmente al padre. */
  @HostListener('close')
  onClose(): void {
    if (!this.destroyed) {
      this.dialogCancel.emit();
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    const dialog = this.el.nativeElement;
    if (dialog.open) {
      dialog.close();
    }
    const opener = this.opener;
    if (opener && opener.isConnected) {
      opener.focus();
    }
  }
}
