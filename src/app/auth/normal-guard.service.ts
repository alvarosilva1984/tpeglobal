import { CanActivate } from "@angular/router/src/interfaces";
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class Normalguard implements CanActivate{

    constructor(private authService: AuthService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.authService.isLoggedIn();
    }


    
}  