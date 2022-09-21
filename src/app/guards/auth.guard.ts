import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  validate: string;
    constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.validate = localStorage.getItem('Validate');
    
    console.log("desde el guards",this.validate )
    if ( this.validate === 'true' ) {        
        return true;
    } else {     
      this.router.navigateByUrl('/login')
      return false;
    }

  }

}
