import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate{
    constructor(
      private authService:AuthService,
      public router:Router
    ) { }
    canActivate(){
        if (this.authService.isLoggedIn()) {
           this.router.navigate(["/"]);
            return false;
        }
        return true;
    }
}
