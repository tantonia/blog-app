import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './edit-post.component.html',
  styles: ``
})
export class EditPostComponent {
  selectedFile! : File;
  @ViewChild('editPost') editPost! : NgForm;
  onFileSelected(event:any) {
    this.selectedFile = event.target.files(0);
    console.log(this.selectedFile);
  }
  
  editForm() {
    console.log(this.editPost.value);
    this.editPost.reset();    
  }
}
