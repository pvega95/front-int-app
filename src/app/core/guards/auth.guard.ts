import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: AuthService,
               private router: Router) {}

  canActivate() {

      if(this.usuarioService.isLoggedIn()) {
        return true
      }
      
      this.usuarioService.logout();

      return false
  }
  
}
