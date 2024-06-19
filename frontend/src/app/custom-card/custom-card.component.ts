import { Component } from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [ LoginComponent ],
  templateUrl: './custom-card.component.html',
})
export class CustomCardComponent {
  
}
