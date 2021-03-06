import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Sms } from "./sms.model";
import { AuthService } from "../auth/auth.service";
import { AmazingTimePickerService } from 'amazing-time-picker';
import * as moment from 'moment';
import 'moment/locale/pt-br';
export class TestsmsComponent {
    constructor(authService, atp) {
        this.authService = authService;
        this.atp = atp;
        this.idresposta = " ";
        this.respostadada = " ";
        this.date = moment();
    }
    ngOnInit() {
        console.log("***DATE", this.date);
        // this.mytime.set({hour:0,minute:0,second:0,millisecond:0});
        //this.mytime.toISOString();
        //this.mytime.format();
        //console.log("mytime",this.mytime);
        this.buscasaldo();
        this.smsForm = new FormGroup({
            meutexto: new FormControl(null, Validators.required),
            telefone: new FormControl(null, Validators.required)
        });
    }
    onSubmit() {
        let datereal = moment(this.date).format();
        if (this.selectedTime == " " || this.selectedTime == "00:00")
            datereal = " ";
        console.log("datereal", datereal);
        const sms = new Sms(this.smsForm.value.meutexto, this.smsForm.value.telefone, datereal);
        this.authService.enviasms(sms)
            .subscribe(data => {
            console.log(data);
            this.idresposta = data.obj.dados.id;
            alert(data.obj.mensagem);
        }, error => {
            console.error(error);
            alert("Ocorreu um erro");
        });
    }
    buscasaldo() {
        this.authService.getsmscreditos()
            .subscribe(data => {
            console.log(data);
            this.saldo = data.obj.dados.saldo;
        }, error => console.error(error));
    }
    smsResposta() {
        this.authService.getsmsresposta(this.idresposta)
            .subscribe(data => {
            console.log(data);
            if (data.obj.dados.respostas.length > 0)
                this.respostadada = data.obj.dados.respostas[0].resposta;
        }, error => console.error(error));
    }
    myId() {
        return this.idresposta;
    }
    open() {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe(time => {
            this.selectedTime = time;
            let timeStr = this.selectedTime;
            let tempo = moment(timeStr, 'HH:mm');
            this.date.set({
                hour: tempo.get('hour'),
                minute: tempo.get('minute'),
                second: tempo.get('second')
            });
            console.log("*** DATE MODif", this.date);
            console.log("this.selectedTime", this.selectedTime);
        });
    }
}
TestsmsComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-testsms',
                templateUrl: './testsms.component.html',
                styleUrls: ['./testsms.component.css']
            },] },
];
/** @nocollapse */
TestsmsComponent.ctorParameters = () => [
    { type: AuthService, },
    { type: AmazingTimePickerService, },
];
