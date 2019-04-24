import { Component } from "@angular/core";


@Component({
    selector: 'app-success',
    template: `
    
            <div class="col-md-5 col-md-offset-2">
             <h2 class="text-success bg-dark">Você foi cadastrado com sucesso!</h2>
             <h3>Seus dados serão verificados e se tudo estiver correto,
                 você receberá um email de confirmação do cadastro.
            </h3>
             </div>
    `
})
export class SuccessComponent {
 
}