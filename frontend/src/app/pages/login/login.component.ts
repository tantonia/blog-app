import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RouterLink } from '@angular/router';
import { CustomCardComponent } from '../../custom-card/custom-card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, RouterLink, CustomCardComponent],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  auth = inject(AuthService);
  @ViewChild('login') login!: NgForm;
  checkLogin(){
    if (this.login.valid) {
      console.log('Login form submitted', this.login.value);
    }
    this.auth.loginAuth(this.login.value);
    this.login.reset();
  }
  signout() {
    this.auth.signOut();
  }
}
