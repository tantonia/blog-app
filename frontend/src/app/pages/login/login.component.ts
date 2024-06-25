import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomCardComponent } from '../../custom-card/custom-card.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, RouterLink, CustomCardComponent, NgIf],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {
  auth = inject(AuthService);
  @ViewChild('login') login!: NgForm;
  message: string | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const state = history.state as { message: string };
    console.log('State received in LoginComponent:', state);
    this.message = state ? state.message : null;
  }

  checkLogin() {
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
