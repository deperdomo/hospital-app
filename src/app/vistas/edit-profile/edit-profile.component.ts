import { Component } from '@angular/core';
import { UserNavComponent } from "../../navs/user-nav/user-nav.component";
import { TitleJakartaComponent } from "../../navs/title-jakarta/title-jakarta.component";

@Component({
  selector: 'app-edit-profile',
  imports: [UserNavComponent, TitleJakartaComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
