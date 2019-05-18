import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "./user.model";
import {AuthService} from "./auth.service";

export class SendpassComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }

  onSubmit() {
    const user = new User(this.myForm.value.email);
    this.authService.sendpass(user)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/auth/msgresetmail']);
      }, error => console.error(error));
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
    });
  }
}

SendpassComponent.decorators = [
  {
    type: Component, args: [{
      selector: 'app-sendpass',
      templateUrl: './sendpass.component.html'
    },]
  },
];
/** @nocollapse */
SendpassComponent.ctorParameters = () => [
  {type: AuthService,},
  {type: Router,},
];
