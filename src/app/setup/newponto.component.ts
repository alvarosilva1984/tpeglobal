import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Ponto } from "./ponto.model";
import "moment/locale/pt-br";
import * as moment from "moment";

@Component({
  selector: "app-newponto",
  templateUrl: "./newponto.component.html",
  styleUrls: ["./newponto.component.css"]
})
export class NewpontoComponent implements OnInit {
  pontoForm: FormGroup;
  pontos: Ponto[] = [];
  today = moment();
  display = "none";
  showNow = false;
  auth = true;

  edit = false;
  pontoindex: number;
  selectedFile: File;



  constructor(private authService: AuthService) {}

  ngOnInit() {


    this.onAuth();

    this.pontoForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      npubs: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      obs: new FormControl(null, Validators.required),
      fileimg: new FormControl(null)
    });

    this.authService.getpontos().subscribe((pontos: Ponto[]) => {
      this.pontos = pontos;
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
    console.log(event.target.files[0]);
    console.log(this.selectedFile);
  }

  onSubmit() {
    if (!this.edit) {
      const ponto = new Ponto(
        this.pontoForm.value.name,
        this.pontoForm.value.npubs,
        moment.utc(this.today).format("YYYY-MM-DD"),
        null,
        null,
        null,
        this.pontoForm.value.address,
        this.pontoForm.value.obs,
        null
      );
      console.log(this.pontoForm.value);
      console.log(this.pontos);
      this.authService.pontoImage(this.selectedFile).subscribe(
        dados => {
          console.log(dados);

          ponto.fileimg = dados.namefile;
          this.authService.pontocreate(ponto).subscribe(
            data => {
              console.log(data);
              this.authService.getpontos().subscribe((pontos: Ponto[]) => {
                this.pontos = pontos;
                console.log("examine", pontos);
              });
            },
            error => console.error(error)
          );
        },
        error => console.error(error)
      );

      this.pontoForm.reset();
      this.selectedFile = null;
    } else {
      this.pontos[this.pontoindex].name = this.pontoForm.value.name;
      this.pontos[this.pontoindex].npubs = this.pontoForm.value.npubs;
      this.pontos[this.pontoindex].address = this.pontoForm.value.address;
      this.pontos[this.pontoindex].obs = this.pontoForm.value.obs;
      if (this.selectedFile) {
        this.authService.pontoImage(this.selectedFile).subscribe(
          dados => {
            console.log(dados);
            this.pontos[this.pontoindex].fileimg = dados.namefile;
            this.authService
              .pontoEdit(this.pontos[this.pontoindex])
              .subscribe(
                data => {
                  console.log(data);
                  this.authService.getpontos().subscribe((pontos: Ponto[]) => {
                    this.pontos = pontos;
                    console.log("examine", pontos);
                  });
                },
                error => console.error(error)
              );
          },
          error => console.error(error)
        );
      }
      console.log(this.pontoForm.value);
      console.log(this.pontos);


      this.authService.pontoEdit(this.pontos[this.pontoindex]).subscribe(
        data => {
          console.log(data);
          this.authService.getpontos().subscribe((pontos: Ponto[]) => {
            this.pontos = pontos;
          });
        },
        error => console.error(error)
      );

      this.pontoForm.reset();
      this.onClose();
    }
  }

  onDelete(i) {
    console.log("atencao");
    console.log(this.pontos[i]);
    const myponto = new Ponto(
      this.pontos[i].name,
      this.pontos[i].npubs,
      this.pontos[i].date,
      this.pontos[i].id
    );

    this.authService.deleteponto(myponto).subscribe(result => {
      console.log(result);
      this.pontos.splice(i, 1);
    });
  }

  onEdit(i) {
    this.selectedFile = null;
    console.log(this.pontos);
    this.pontoForm.setValue({
      name: this.pontos[i].name,
      npubs: this.pontos[i].npubs,
      address: this.pontos[i].address,
      obs: this.pontos[i].obs,
      fileimg: null
    });

    
    this.edit = true;
    this.pontoindex = i;
    this.display = "block";
  }

  onClose() {
    this.display = "none";
  }

  validMyForm() {
    if (!this.pontoForm.valid) return true;

    return false;
  }

  onNewPonto() {

    this.pontoForm.reset();
    this.edit = false;
    this.display = "block";
  }

  onAuth(){
    if(this.authService.isAuthenticated())this.auth = false;
  }
}
