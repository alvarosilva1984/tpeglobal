import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styles: [`
    body {
        padding-top: 30px;
      }
    `]
})

export class AuthenticationComponent {
  isCollapsed = true;
  name: string;
  cidade: string;

  constructor(private authService: AuthService, router: Router) {
    const clearLocalStorage = function () {
      localStorage.clear();
      return router.navigate(['/auth']);
    };
    this.cidade = localStorage.getItem('cidade');
    window.addEventListener('onbeforeunload', clearLocalStorage);
    window.addEventListener('onunload', clearLocalStorage);
    localStorage.removeItem('welcome');
    if (this.isLoggedIn() == false) router.navigate(['/auth', 'signin']);
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
