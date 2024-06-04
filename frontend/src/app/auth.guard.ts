import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.checkAuth().pipe(
    map((value) => {
      const isAuthenticated = Object.values(value)[0];
      console.log('isAuthenticated:', isAuthenticated);
      if(isAuthenticated){
        console.log('User is authenticated');
        return true;
      } else {
        console.log('User is not authenticated, navigating to login');
        router.navigate(['/login']);
        return false;
      }
    }), catchError(() => {
      console.log('Error checking authentication, navigating to login');
      router.navigate(['/login']);
      return of(false);
    })
  );
};
