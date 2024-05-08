import { Component } from '@angular/core';
import { posts } from '../../../posts.model';
import { NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, HeaderComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  posts = posts;
}
