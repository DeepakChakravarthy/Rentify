import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map(isLoggedIn => {
        if (state.url === '/auth' && isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        } else if (state.url === '/post-property' && !isLoggedIn) {
          this.router.navigate(['/auth']);
          return false;
        }
        return true;
      })
    );
  }
}
