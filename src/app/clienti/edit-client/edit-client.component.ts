import { Component, ViewChild, OnInit } from "@angular/core";
import { ModalBackdropComponent, ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { ClientiComponent } from '../clienti.component';
import { Client } from 'src/app/shared/client.model';
import { ClientDetail } from 'src/app/shared/client-detail.model';
import { Abonament } from 'src/app/shared/abonament.model';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit{
  @ViewChild('editClient') editModal: ModalDirective;
  editClientForm: FormGroup;
  currentClient= new ClientDetail();

  constructor(public fb: FormBuilder, private api: ApiService){}


  ngOnInit(){

    console.log("ngOnInit",this.currentClient);
    
    this.editClientForm = this.fb.group({
      nume: [null, Validators.required],
      prenume: [null, Validators.required],
      telefon: [null, Validators.required],
      email: [null, Validators.required],
      idAntrenori: ['', Validators.required],
      idClase: ['', Validators.required],
      denumire: [null, Validators.required],
      pret: [null, Validators.required],

    }); 

    
  }

  afiseaza(){
    console.log("edit", this.currentClient.client);
    console.log("edit", this.currentClient.abonament);
    console.log("edit", this.editClientForm);
    const editedClient = new Client(this.currentClient.client);
    const editedAbonament = new Abonament(this.currentClient.abonament);

    if(this.editClientForm.value.nume != null) editedClient.nume = this.editClientForm.value.nume;
    if(this.editClientForm.value.prenume != null) editedClient.prenume = this.editClientForm.value.prenume;
    if(this.editClientForm.value.email != null) editedClient.email = this.editClientForm.value.email;
    if(this.editClientForm.value.telefon != null) editedClient.telefon = this.editClientForm.value.telefon;
    if(this.editClientForm.value.idAntrenori != null) editedClient.antrenorClientId = this.transformInNumberArray(this.editClientForm.value.idAntrenori);
    if(this.editClientForm.value.idClase != null) editedClient.clasaClientId = this.transformInNumberArray(this.editClientForm.value.idClase);
    if(this.editClientForm.value.denumire != null) editedAbonament.denumire = this.editClientForm.value.denumire;
    if(this.editClientForm.value.pret != null) editedAbonament.pret = this.editClientForm.value.pret;

    this.api.editClient(editedClient).subscribe(()=>{
      console.log(editedClient);
    },
    (error: Error) => {
      console.log('err', error);

    });

    this.api.editAbonament(editedAbonament).subscribe(()=>{
      console.log(editedAbonament);
    },
    (error: Error) => {
      console.log('err', error);

    });

    this.editModal.hide();
  }

  
  initialize(id:number): void{
    
    this.api.getClient(id).subscribe((client: Client)=>{
      this.currentClient.client = new Client(client);
      this.currentClient.client.id = id;
      this.editModal.show();
      //console.log("client", this.currentClient.client);
      //console.log("editClientForm", this.editClientForm);
      //console.log("detail", this.currentClient);
      this.api.getAbonament(this.currentClient.client.abonamentId).subscribe((abonament: Abonament)=>{
        this.currentClient.abonament = new Abonament(abonament);
        this.currentClient.abonament.id = this.currentClient.client.abonamentId;
      },
      (error: Error) => {
        console.log('err', error);
  
      });
      
    },
    (error: Error) => {
      console.log('err', error);

    });

    
    
  }

  

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }
}