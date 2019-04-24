import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
export class AuthenticationComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.isCollapsed = true;
        window.onbeforeunload = function () {
            this.localStorage.clear();
            return router.navigate(['/auth']);
            ;
        };
        window.onunload = function () {
            this.localStorage.clear();
            return router.navigate(['/auth']);
            ;
        };
        localStorage.removeItem('welcome');
        if (this.isLoggedIn() == false)
            router.navigate(['/auth', 'signin']);
    }
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
    isPleno() {
        return this.authService.isPleno();
    }
    isGold() {
        return this.authService.isGold();
    }
    isCtc() {
        return this.authService.isCtc();
    }
    toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
        localStorage.removeItem('welcome');
    }
    onWelcome() {
        this.name = localStorage.getItem('welcome');
        return localStorage.getItem('welcome') !== null;
    }
}
AuthenticationComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-authentication',
                templateUrl: './authentication.component.html',
                styles: [`
    body {
        padding-top: 30px;
      }
    `]
            },] },
];
/** @nocollapse */
AuthenticationComponent.ctorParameters = () => [
    { type: AuthService, },
    { type: Router, },
];
