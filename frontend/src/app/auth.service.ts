import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { error } from 'console';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = environment.domain;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  checkAuth() {
    return this.http.get(this.baseUrl+'/api/auth/check', {withCredentials: true});
  }

  signUpAuth(formData: any) {
    return this.http
    .post(this.baseUrl+'/api/auth/signup', formData)
    .subscribe({
      next:value => {
        console.log(value);
        this.router.navigate(['/login']);
      },
      error:error => console.log(error),
    });
  }

  loginAuth(formData: any) {
    return this.http
      .post(this.baseUrl+'/api/auth/signin', formData, {
        withCredentials: true,
      })
      .subscribe({
        next:value => {
          console.log(value);
        if (isPlatformBrowser(this.platformId)) {
         localStorage.setItem('username', JSON.stringify(value));
        }
      },
      error:error => console.log(error),
      
    });
  }

  signOut() {
    return this.http.get(this.baseUrl+'/api/auth/signout', { 
      withCredentials: true,
    })
    .subscribe({
      next:(value) => {
        console.log(value);
        localStorage.removeItem('username');
        const currentRoute = this.router.url;
        if(currentRoute ==='/'){
          window.location.reload();
        }else{
          this.router.navigate(['/']).then(() => window.location.reload());
        }
      },
      error:(error) => {
        console.log(error);
      },
    });
  }
}
