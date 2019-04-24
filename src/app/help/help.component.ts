import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Circuito } from '../setup/circuito.model';

@Component({
    selector: 'app-help',
    template: `
    <div class="container">
    <div class="col-md-6">
             <h4>Caso seus dados pessoais estejam incorretos, envie um email para:</h4>
             <p><a href="mailto:{{email}}">{{email}}</a></p>

    </div>
    </div>

    `
})
export class HelpComponent {
 circuitos: Circuito[];
 email: string;
    constructor(private authService: AuthService) {}

    ngOnInit() {
    this.authService.getPerfil()
    .subscribe(datauser => {
        console.log(datauser);
        this.authService.getCircuito()
        .subscribe(data => {
            console.log(data);
            this.circuitos = data;
            this.email = this.encontraCircuito(datauser.circuito);

        });
        });

        }

        encontraCircuito(id) {
            let email = ' '
            const circuit = this.circuitos.filter(a => a.id == id);


            if (circuit.length > 0) {

                switch (circuit[0].nome) {
                    case 'SP-61':
                    email =  'tpe.santoandre.sp61@gmail.com';
                        break;
                    case 'SP-76':
                    email =  'tpe.santoandre.sp76@gmail.com';
                        break;
                    case 'SP-112':
                    email =  'tpe.santoandre.sp112@gmail.com';
                        break;
                    case 'SP-139':
                    email =  'tpe.santoandre.sp139@gmail.com';
                        break;
                    default:
                    email =  'tpe.santoandre.sp61@gmail.com';
                }

                return email;
            } else return ' ';

          }
}
