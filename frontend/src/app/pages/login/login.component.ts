import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  @ViewChild('login') login!: NgForm;
  checkLogin(){
    console.log(this.login.value);
    this.login.reset();    
  }
}
