import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, HeaderComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{
  posts = inject(PostService);
  ngOnInit(): void {
    this.posts.getAllPosts().subscribe({
      next: value => {
        console.log(value);
        this.posts.allPosts = value;
      },
      error: (error: any )=> console.log(error),
    });
  }
}
