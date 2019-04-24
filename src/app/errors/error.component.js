import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorService } from "./error.service";
export class ErrorComponent {
    constructor(errorService, router) {
        this.errorService = errorService;
        this.router = router;
        this.display = 'none';
    }
    onErrorHandled() {
        this.display = 'none';
    }
    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe((error) => {
            this.error = error;
            this.display = 'block';
            console.log("cheguei no erro");
            console.log(error);
            if (error.message == 'Entre novamente')
                this.router.navigate(['/auth', 'signin']);
        });
    }
}
ErrorComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];
/** @nocollapse */
ErrorComponent.ctorParameters = () => [
    { type: ErrorService, },
    { type: Router, },
];
