import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './create-post.component.html',
  styles: ``
})
export class CreatePostComponent {
  selectedFile! : File;
  onFileSelected(event:any) {
    this.selectedFile = event.target.files(0);
    console.log(this.selectedFile);
  }
  @ViewChild('createPost') create! : NgForm;
  createForm() {
    console.log(this.create.value);
    this.create.value.reset();    
  }
}
