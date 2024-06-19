import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
  post = inject(PostService)
  selectedFile! : File;

  @ViewChild('createPost') create! : NgForm;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  createForm() {
    const formData = new FormData();
    formData.append('title', this.create.value.title);
    formData.append('content', this.create.value.content);
    formData.append('file', this.selectedFile, this.selectedFile.name);

    console.log(this.create.value);
    this.post.createPost(formData);

    this.create.reset();
  }
}
