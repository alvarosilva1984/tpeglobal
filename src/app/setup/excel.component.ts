import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Ponto } from "./ponto.model";
import { Hora } from "./hora.model";

@Component({
    selector: "app-excel",
    templateUrl: "./excel.component.html",
    styleUrls: ["./excel.component.css"]
  })

  export class ExcelComponent implements OnInit {
   
    dayselect: string = 'Segunda-feira' ;
    pontos: Ponto[] = [];
    diadasemana = 0;
    horas: Hora[] = [];
    diasdasemana = [ "Segunda-feira","Terça-feira","Quarta-feira", "Quinta-feira","Sexta-feira","Sábado","Domingo","Feriado"];
    auth = true;
  
    constructor(private authService: AuthService) {}
  
ngOnInit() {
    

    
  this.onAuth();
  this.authService.getpontos()
        .subscribe( 
        (
            
             pontos: Ponto[]) => {
            this.pontos = pontos; 

            this.authService.getHoras()
            .subscribe( 
            (
                
                 horas: Hora[]) => {
                this.horas = horas; 
    
                let horas_sort = this.horas;
                horas_sort.sort((a ,b)=>{
                    if(a.code < b.code) return -1;
                    if(a.code > b.code) return 1;
                    return 0;});
                    this.horas = horas_sort;
    
    
                          }
                          
            );
    
             }
            
        );


      
  

    }
  
    changed(e: any,ponto: Ponto, hora: Hora){
      
        console.log(e);
        if (e == true){
        if (this.dayselect == 'Segunda-feira')ponto.config[1].push(hora.code);
        if (this.dayselect == 'Terça-feira')ponto.config[2].push(hora.code);
        if (this.dayselect == 'Quarta-feira')ponto.config[3].push(hora.code);
        if (this.dayselect == 'Quinta-feira')ponto.config[4].push(hora.code);
        if (this.dayselect == 'Sexta-feira')ponto.config[5].push(hora.code);
        if (this.dayselect == 'Sábado')ponto.config[6].push(hora.code);
        if (this.dayselect == 'Domingo')ponto.config[0].push(hora.code);
        if (this.dayselect == 'Feriado')ponto.config[7].push(hora.code);
        }
        else{
            if (this.dayselect == 'Segunda-feira')ponto.config[1].splice(ponto.config[1].indexOf(hora.code),1);
            if (this.dayselect == 'Terça-feira')ponto.config[2].splice(ponto.config[2].indexOf(hora.code),1);
            if (this.dayselect == 'Quarta-feira')ponto.config[3].splice(ponto.config[3].indexOf(hora.code),1);
            if (this.dayselect == 'Quinta-feira')ponto.config[4].splice(ponto.config[4].indexOf(hora.code),1);
            if (this.dayselect == 'Sexta-feira')ponto.config[5].splice(ponto.config[5].indexOf(hora.code),1);
            if (this.dayselect == 'Sábado')ponto.config[6].splice(ponto.config[6].indexOf(hora.code),1);
            if (this.dayselect == 'Domingo')ponto.config[0].splice(ponto.config[0].indexOf(hora.code),1);
            if (this.dayselect == 'Feriado')ponto.config[8].splice(ponto.config[8].indexOf(hora.code),1);
    
        }
        console.log(ponto);
        console.log(this.pontos);
    
        
        }
    
        salvarConfig(){
    
            this.authService.pontoUpdate(this.pontos)
                .subscribe(
                data => {
                    console.log(data);
                    alert("Os dados dos pontos foram atualizados!");
                    this.authService.getpontos()
                    .subscribe( 
                    (
                        
                         pontos: Ponto[]) => {
                        this.pontos = pontos; 
                         }
                        
                    );
                },
                error => console.error(error)
                );
    
        }
    
        valorCheck(ponto: Ponto, hora: Hora){
        console.log(ponto.config[2].filter(a=> (a == hora.code)), this.dayselect);
        let existe = [];
        if (this.dayselect == 'Segunda-feira'){existe = ponto.config[1].filter(a=> a == hora.code); }
        if (this.dayselect == 'Terça-feira'){existe = ponto.config[2].filter(a=> a == hora.code); }
        if (this.dayselect == 'Quarta-feira'){existe = ponto.config[3].filter(a=> a == hora.code); }
        if (this.dayselect == 'Quinta-feira'){existe = ponto.config[4].filter(a=> a == hora.code); }
        if (this.dayselect == 'Sexta-feira'){existe = ponto.config[5].filter(a=> a == hora.code); }
        if (this.dayselect == 'Sábado'){existe = ponto.config[6].filter(a=> a == hora.code); }
        if (this.dayselect == 'Domingo'){existe = ponto.config[0].filter(a=> a == hora.code); }
        if (this.dayselect == 'Feriado'){existe = ponto.config[7].filter(a=> a == hora.code); }
    
        if(existe.length > 0)return true;
        
        return false;
    
        }
  
 
        anteriorDia(e){
        
            this.diadasemana -= 1;
            if (this.diadasemana < 0)this.diadasemana = 7;
            this.dayselect = this.diasdasemana[this.diadasemana];
    
        }
    
        proximoDia(e){
    
            this.diadasemana += 1;
            if (this.diadasemana > 7)this.diadasemana = 0;
            this.dayselect = this.diasdasemana[this.diadasemana];
    
    
        }
   
        onAuth() {
          if (this.authService.isAuthenticated()) this.auth = false;
        }
    
  }
  