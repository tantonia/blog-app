import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule, HeaderComponent, RouterLink],
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent implements OnInit{
  auth = inject(AuthService);
  post = inject(PostService);
  route = inject(ActivatedRoute);

  @ViewChild('editPost') editPost! : NgForm;
  selectedFile! : File;
  fileSelected: boolean = false;  // Add this property
  postId: any;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileSelected = !!this.selectedFile;  // Update fileSelected status
    console.log(this.selectedFile.name);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      this.postId = postId;
      this.post.getSinglePost(postId).subscribe({
        next: (value) => {
          this.post.singlePost = value;
          console.log(this.post.singlePost);
        },
        error: (error) => console.log(error),
      });
    });
  }

  editForm() {
    const formData = new FormData();
    formData.append('title', this.editPost.value.title);
    formData.append('content', this.editPost.value.content);
    formData.append('file', this.selectedFile);
    this.post.editPost(this.postId, formData);
    this.editPost.reset();
    this.fileSelected = false;
  }
}
