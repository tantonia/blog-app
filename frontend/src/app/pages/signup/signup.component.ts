import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  auth = inject(AuthService)
  @ViewChild('signup') signup! : NgForm;
  checkSignup(){
    if (this.signup.valid) {
      console.log('Signup form submitted', this.signup.value);
    }
    this.auth.signUpAuth(this.signup.value);
    this.signup.reset();
  }
}
