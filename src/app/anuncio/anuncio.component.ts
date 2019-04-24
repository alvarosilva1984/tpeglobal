import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Anuncio } from "./anuncio.model";


@Component({
    selector: "app-anuncio",
    templateUrl: "./anuncio.component.html",
    styleUrls: ["./anuncio.component.css"]
  })

  export class AnuncioComponent implements OnInit {
    anuncioForm: FormGroup;
    anuncios: Anuncio[];
   
    display = "none";
    showNow = false;
  
    edit = false;
    anuncioindex: number;

    auth = true;

   
  
    constructor(private authService: AuthService) {}
  
ngOnInit() {
  

  
      this.onAuth();
      this.anuncioForm = new FormGroup({
        titulo: new FormControl(null, Validators.required),
        mensagem: new FormControl(null, Validators.required),
      });
  
      this.authService.getAnuncio().subscribe((anuncios: Anuncio[]) => {
        this.anuncios = anuncios;


     });
    }
  

  
    onSubmit() {
      if (!this.edit) {
        const anuncio = new Anuncio(
          this.anuncioForm.value.titulo,
          this.anuncioForm.value.mensagem,
        );


            this.authService.anuncioCreate(anuncio).subscribe(
              data => {
                console.log(data);
                this.authService.getAnuncio().subscribe((anuncios: Anuncio[]) => {
                  this.anuncios = anuncios;

                });
              },
              error => console.error(error)
            );

  
        this.anuncioForm.reset();


      } else {
        this.anuncios[this.anuncioindex].titulo = this.anuncioForm.value.titulo;
        this.anuncios[this.anuncioindex].mensagem = this.anuncioForm.value.mensagem;

  
        this.authService.anuncioEdit(this.anuncios[this.anuncioindex]).subscribe(
          data => {
            console.log(data);
            this.authService.getAnuncio().subscribe((anuncios: Anuncio[]) => {
              this.anuncios = anuncios;
            });
          },
          error => console.error(error)
        );
  
        this.anuncioForm.reset();
        this.onClose();
      }
    }
  
    onDelete(i) {

      const myanuncio = new Anuncio(
        this.anuncios[i].titulo,
        this.anuncios[i].mensagem,
        this.anuncios[i].avisado,
        this.anuncios[i].id
      );
  
      this.authService.deleteAnuncio(myanuncio).subscribe(result => {
        console.log(result);
        this.anuncios.splice(i, 1);
      });
    }
  
    onEdit(i) {

      this.anuncioForm.setValue({
        titulo: this.anuncios[i].titulo,
        mensagem: this.anuncios[i].mensagem,
      });
  
      //this.source = `/assets/img/${this.pontos[i].fileimg}`;
      this.edit = true;
      this.anuncioindex = i;
      this.display = "block";
    }

    onAvisar(i) {

        let resposta = prompt("Confirma o aviso por telegram? Digite: avisar", );
        if(resposta == "avisar"){
        const myanuncio = new Anuncio(
            this.anuncios[i].titulo,
            this.anuncios[i].mensagem,
            true,
            this.anuncios[i].id
          );
      
          this.authService.avisaAnuncio(myanuncio).subscribe(result => {
            console.log(result);
            this.anuncios[i].avisado = true;
          });

        }
      }
  
    onClose() {
      this.display = "none";
    }
  
    validMyForm() {
      if (!this.anuncioForm.valid) return true;
  
      return false;
    }
  
    onNewanuncio() {
     
      this.anuncioForm.reset();
      this.edit = false;
      this.display = "block";
    }

    onAuth(){
      if(this.authService.isAuthenticated())this.auth = false;
    }
  }
  