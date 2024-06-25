import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  auth = inject(AuthService);
  router = inject(Router);
  @ViewChild('signup') signup!: NgForm;
  errorMessage: string | null = null;

  checkSignup() {
    if (this.signup.valid) {
      console.log('Signup form submitted', this.signup.value);
      this.auth.signUpAuth(this.signup.value).subscribe({
        next: value => {
          console.log(value);
          this.router.navigate(['./login'], { state: { message: 'Signup successful! Please login.' } });
          this.errorMessage = null; // Reset error message on successful signup
        },
        error: error => {
          if (error.message === 'user already exists') {
            this.errorMessage = 'User already exists. Please enter alternative credentials.';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      });
    }
  }
}
