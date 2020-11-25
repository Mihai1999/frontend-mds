import { Component, ViewChild, OnInit } from "@angular/core";
import { ModalBackdropComponent, ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

import { Client } from 'src/app/shared/client.model';
import { ClientDetail } from 'src/app/shared/client-detail.model';
import { Abonament } from 'src/app/shared/abonament.model';
import { ThrowStmt } from '@angular/compiler';
import { Clasa } from 'src/app/shared/clasa.model';



@Component({
  selector: 'app-edit-clase',
  templateUrl: './edit-clase.component.html',
  styleUrls: ['./edit-clase.component.css'],
})
export class EditClasaComponent implements OnInit{
  @ViewChild('editClasa') editModal: ModalDirective;
  editClasaForm: FormGroup;
  currentClasa= new Clasa();

  constructor(public fb: FormBuilder, private api: ApiService){}


  ngOnInit(){

    console.log("ngOnInit",this.currentClasa);
    
    this.editClasaForm = this.fb.group({
      denumire: [null, Validators.required],
      antrenorId: [null, Validators.required],
      data: [null, Validators.required],
      ora: [null, Validators.required],
      durata: [null, Validators.required],
      participanti: [null, ],

    }); 

    
  }

  afiseaza(){

    const editedClasa = new Clasa(this.currentClasa);

    if(this.editClasaForm.value.denumire != null) editedClasa.denumire = this.editClasaForm.value.denumire;
    if(this.editClasaForm.value.antrenorId!= null) editedClasa.antrenorId = this.editClasaForm.value.antrenorId;
    if(this.editClasaForm.value.startDate != null) {
      const parts = this.editClasaForm.value.data.split(" ");
      const ora = this.editClasaForm.value.ora.split(" ");
      editedClasa.starDate.setDate(parts[0]);
      editedClasa.starDate.setMonth(parts[1]);
      editedClasa.starDate.setFullYear(parts[2]);
      editedClasa.starDate.setHours(ora[0]);
      editedClasa.starDate.setMinutes(ora[1]);
    }
    if(this.editClasaForm.value.durata != null) editedClasa.endDate.setHours(editedClasa.starDate +this.editClasaForm.value.durata) ;
    if(this.editClasaForm.value.participanti != null) editedClasa.clasaClientId = this.transformInNumberArray(this.editClasaForm.value.denumire);

    this.api.editClasa(editedClasa).subscribe(()=>{
      console.log(editedClasa);
    },
    (error: Error) => {
      console.log('err', error);

    });



    this.editModal.hide();
  }

  
  initialize(id:number): void{
    
    this.api.getClasa(id).subscribe((clasa: Clasa)=>{
      this.currentClasa = new Clasa(clasa);
      this.currentClasa.id = id;
      this.editModal.show();
      //console.log("client", this.currentClient.client);
      //console.log("editClientForm", this.editClientForm);
      //console.log("detail", this.currentClient);
      
    },
    (error: Error) => {
      console.log('err', error);

    });

    
    
  }

  

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }
}