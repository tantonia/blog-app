import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = environment.domain;
  isAuthenticated: any;
  username: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  checkAuth() {
    return this.http.get(this.baseUrl + '/api/auth/check', { withCredentials: true });
  }

  signUpAuth(formData: any) {
    return this.http
      .post(this.baseUrl + '/api/auth/signup', formData)
      .pipe(catchError(this.handleError));
  }

  loginAuth(formData: any) {
    return this.http
      .post(this.baseUrl + '/api/auth/signin', formData, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: value => {
          console.log(value);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('username', JSON.stringify(value));
          }
          this.router.navigate(['/']);
        },
        error: error => console.log(error),
      });
  }

  signOut() {
    return this.http.get(this.baseUrl + '/api/auth/signout', {
      withCredentials: true,
    })
    .pipe(catchError(this.handleError))
    .subscribe({
      next: (value) => {
        console.log(value);
        localStorage.removeItem('username');
        const currentRoute = this.router.url;
        if (currentRoute === '/') {
          window.location.reload();
        } else {
          this.router.navigate(['/']).then(() => window.location.reload());
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error(error.error || 'Something bad happened; please try again later.'));
  }
}
