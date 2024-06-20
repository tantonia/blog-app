import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { PostService } from '../../post.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgOptimizedImage, HeaderComponent, RouterLink, CommonModule, EditPostComponent],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {
  auth = inject(AuthService);
  post = inject(PostService);
  route = inject(ActivatedRoute);
  postId: any;
  postDetails: any = {};
  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log('auth:',this.auth);
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      this.post.getSinglePost(postId).subscribe({
        next: (value: any) => {
          console.log(value);
          this.postDetails = value;
        },
        error: error => console.log(error),
      });
    })
  }

  navigateToEdit() {
    console.log(this.postDetails._id);
    const postId = this.postDetails._id;
    this.router.navigate(['/edit-post', postId]);
  }

  deletePost() {
    const postId = this.postDetails._id;
    this.postId = postId;
    console.log('Deleting Post ID:', postId);  // Debugging log
    if (postId) {
      this.post.deletePost(postId).subscribe({
        next: () => {
          console.log('Post deleted successfully');
          this.router.navigate(['/']);
        },
        error: (error) => console.log(error),
      });
    } else {
      console.error('Post ID is undefined');
    }
  }
}
