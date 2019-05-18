import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Error} from './error.model';
import {ErrorService} from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit {
  error: Error;
  display = 'none';

  constructor(private errorService: ErrorService, private router: Router) {
  }

  onErrorHandled() {
    this.display = 'none';
  }

  ngOnInit() {
    this.errorService.errorOccurred
      .subscribe(
        (error: Error) => {
          this.error = error;
          this.display = 'block';
          console.log('cheguei no erro');
          console.log(error);
          if (error.message == 'Entre novamente') this.router.navigate(['/auth', 'signin']);

        }
      );
  }
}
