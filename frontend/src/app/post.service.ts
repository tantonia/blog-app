import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = environment.domain;
  imgBaseUrl = environment.imgDomain;
  singlePost: any;
  allPosts: any;

  constructor() {}
  
  getAllPosts() {
    return this.http.get(this.baseUrl+'/api/post');
  }

  createPost(formData:any) {
    return this.http.post(this.baseUrl+'/api/post/upload/create', formData, {withCredentials: true,
    });
  }

  getSinglePost(id:any) {
    return this.http.get(this.baseUrl+'/api/post/'+id);
  }

  editPost(id:any, updatedPost:FormData) {
    return this.http.patch(this.baseUrl+'/api/post/upload/update'+id, updatedPost, { withCredentials: true }).subscribe({next:value => {console.log(value); this.router.navigate(['/']);
    },
    error:error => {
      console.log(error);
    },
    });
  }
}
