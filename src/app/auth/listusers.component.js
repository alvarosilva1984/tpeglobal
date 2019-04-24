import { Component } from "@angular/core";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Congregation } from "../setup/congregation.model";
export class ListusersComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.approve = false;
        this.congregations = [];
        this.congregation = new Congregation();
        this.showNow = false;
        this.setClickedRow = function fg(index) {
            /*   this.selectedRow = index;
                     this.router.navigate(['/auth/perfil']); */
        };
    }
    ngOnInit() {
        this.showNow = false;
        if (this.userService.isLoggedIn()) {
            this.userService.getlistusers_esc()
                .subscribe((users) => {
                //this.users = users.filter(a => a.email != "super@super.com");
                this.users = users;
                let usersort = this.users;
                usersort.sort((a, b) => {
                    if (a.firstName < b.firstName)
                        return -1;
                    if (a.firstName > b.firstName)
                        return 1;
                    return 0;
                });
                this.users = usersort;
                console.log(users);
                this.userService.getCongregation()
                    .subscribe((congregations) => {
                    this.congregations = congregations;
                    let congsort = this.congregations;
                    congsort.sort((a, b) => {
                        if (a.circuit < b.circuit)
                            return -1;
                        if (a.circuit > b.circuit)
                            return 1;
                        return 0;
                    });
                    congsort.sort((a, b) => {
                        if (a.circuit == b.circuit) {
                            if (a.nome < b.nome)
                                return -1;
                            if (a.nome > b.nome)
                                return 1;
                        }
                        return 0;
                    });
                    this.congregations = congsort;
                    this.showNow = true;
                });
            });
            /*     this.users.map((user) => {
                            
                                user.age = this.getAge(user.datebirth);
            
                            }); */
        }
    }
    Approve(i) {
        console.log(event);
        if (!this.users[i].released) {
            this.users[i].released = true;
            this.myuser = new User(this.users[i].email, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.users[i].released, this.users[i].userId, null, null);
            this.userService.updateReleased(this.myuser)
                .subscribe(result => console.log(result));
        }
    }
    getAge(dateString) {
        let today = new Date();
        console.log(today);
        let birthDate = new Date(dateString);
        console.log(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        console.log(age);
        return age;
    }
    Delete(i) {
        let question = "Tem certeza que quer deletar o usuário " + this.users[i].firstName + " ?";
        let r = confirm(question);
        let myuser = {};
        if (r) {
            myuser = { userId: this.users[i].userId };
            this.userService.deleteuser(myuser)
                .subscribe(result => {
                console.log(result);
                this.users.splice(i, 1);
            });
        }
    }
}
ListusersComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-listusers',
                template: `
        <div *ngIf="!showNow">
        <h4>Carregando informações...</h4>
        </div>
        <div *ngIf="showNow" class="col-md-12 col-md-offset-1">
        <div class="pane-hScroll">
        <table class="table table-bordered">
        <thead>
        <tr>
            <th class="ordem" >I</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Idade</th>
            <th>Email</th>          
            <th>Tel.Celular</th>
            <th>Congregação</th>
            <th>Circuito</th>
            <th>Priv.</th>
            <th>Aprovar</th>
        </tr>
        </thead>
        <tbody>
           
               
               <tr *ngFor="let user of users;let i = index">
                    <td class="ordem">{{ i + 1 }}</td>
                    <td>   {{user.firstName}}    </td>
                     <td>  {{user.lastName}}     </td>
                     <td>  {{this.getAge(user.datebirth)}}   </td>
                     <td>  {{user.email}}        </td>
                     <td>  {{user.mobilephone}}  </td>
                     <td>  {{user.congregation['nome']}} </td> 
                     <td>  {{user.congregation['circuit']}} </td> 
                     <td>  {{user.privilege}}    </td>
                     <td> <button class="btn-aprov" [disabled]="users[i].released" (click)="Approve(i)" ><span class="glyphicon glyphicon-ok"></span>Ok</button>
                     <button class="btn-delete"  (click)="Delete(i)" ><span class="glyphicon glyphicon-erase"></span>Del</button>
                     </td>
                     
                     </tr>
             
            
            </tbody>
            </table>
            </div> 
            </div> 
        
        `,
                styles: [`

    .btn-aprov{
        color: white;
        background-color: #4CAF50;
        border: none;
    padding: 1px 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;

    }

    .btn-delete{
        color: white;
        background-color: red;
        border: none;
    padding: 1px 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;

    }

    table {
        width: 100%;
        border: 1px solid #cef;
        text-align: left;
        background-color: white }
    th {
        font-weight: bold;
        background-color: #acf;
        border-bottom: 1px solid #cef; }
    td,th {
        padding: 1px 10px; }

        tr:nth-child(even) {
            background-color: #f2f2f2
        }

     

      tr:hover, tr:active {

        background-color: #00FA9A;
 
    }

 
button:active {background-color: gray}  
button.btn-aprov:focus {background-color: gray}  
button.btn-aprov:target {background-color: gray}    
button.btn-aprov:disabled {background-color: gray}

.pane-hScroll {
    overflow: auto;

  }
 
`],
            },] },
];
/* identifyCongregation(id){
    
    let congregation = this.congregations.filter(a=>a.id == id);
    return congregation[0].nome;


} */
/** @nocollapse */
ListusersComponent.ctorParameters = () => [
    { type: AuthService, },
    { type: Router, },
];
