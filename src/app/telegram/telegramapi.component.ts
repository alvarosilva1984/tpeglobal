import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from "../auth/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-telegramapi',
  templateUrl: './telegramapi.component.html',
  styleUrls: ['./telegramapi.component.css']
})
export class TelegramapiComponent implements OnInit {
  user:User;
  linktelegram =  `/`;
  linkgrupotelegram = '';
  nameBotTelegram = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    

    this.authService.getPerfil()
    .subscribe(data => {
        console.log(data);
        this.user = data;
  

  });

  this.authService.telegramInfo()
  .subscribe(data => {
      console.log(data);
      this.linkgrupotelegram = data.json().link;
      this.nameBotTelegram = data.json().nameBot;
      console.log(this.linkgrupotelegram,this.nameBotTelegram)
 
});

}

onGoGroup()
{
  
  window.location.href = this.linkgrupotelegram;
  console.log("linkgrupo", this.linkgrupotelegram)

}

onCadastro()
{

 this.authService.cadastroTelegram()
 .subscribe(data => {
  if (data)window.location.href=`https://telegram.me/${this.nameBotTelegram}?start=${data}`;
 });



}

}
