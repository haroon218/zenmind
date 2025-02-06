import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let userData = sessionStorage.getItem('sharedData@Zenmind') || null;
      if(userData){
        // this.router.navigate(['/']);
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }
     
}