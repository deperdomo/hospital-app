import { Component, Input } from '@angular/core';
import { FindNavComponent } from "../find-nav/find-nav.component";
import { UserNavComponent } from "../user-nav/user-nav.component";
import { UserWelcomeNavComponent } from "./user-welcome-nav/user-welcome-nav.component";

@Component({
  selector: 'app-secundary-nav',
  imports: [FindNavComponent, UserNavComponent, UserWelcomeNavComponent],
  templateUrl: './secundary-nav.component.html',
  styleUrl: './secundary-nav.component.css'
})
export class SecundaryNavComponent {
  withFindNav: boolean = false;

  @Input() titulo!: string;
}
