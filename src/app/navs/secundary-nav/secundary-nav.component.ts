import { Component } from '@angular/core';
import { FindNavComponent } from "../find-nav/find-nav.component";

@Component({
  selector: 'app-secundary-nav',
  imports: [FindNavComponent],
  templateUrl: './secundary-nav.component.html',
  styleUrl: './secundary-nav.component.css'
})
export class SecundaryNavComponent {
  withFindNav: boolean = false;
}
