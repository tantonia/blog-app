import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { PostService } from '../../post.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgOptimizedImage, HeaderComponent, RouterLink, CommonModule],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {
  auth = inject(AuthService);
  post = inject(PostService);
  route = inject(ActivatedRoute);
  postId: any;
  postDetails: any;
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
    });
  }

  navigateToEdit() {
    console.log(this.postDetails._id);
    const postId = this.postDetails._id;
    this.router.navigate(['/edit-post', postId]);
  }
}
