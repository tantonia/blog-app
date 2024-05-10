import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  @ViewChild('signup') signup! : NgForm;
  checkSignup(){
    console.log(this.signup.value);
    this.signup.reset();    
  }
}
