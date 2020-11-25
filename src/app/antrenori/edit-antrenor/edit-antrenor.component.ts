import { Component, ViewChild, OnInit } from "@angular/core";
import { ModalBackdropComponent, ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

import { Client } from 'src/app/shared/client.model';
import { ClientDetail } from 'src/app/shared/client-detail.model';
import { Abonament } from 'src/app/shared/abonament.model';
import { ThrowStmt } from '@angular/compiler';
import { Angajat } from 'src/app/shared/angajat.model';
import { Antrenor } from 'src/app/shared/antrenor.model';



@Component({
  selector: 'app-edit-antrenor',
  templateUrl: './edit-antrenor.component.html',
  styleUrls: ['./edit-antrenor.component.css'],
})
export class EditAntrenorComponent implements OnInit{
  @ViewChild('editAntrenor') editModal: ModalDirective;
  editAntrenorForm: FormGroup;
  currentAntrenor: Antrenor;

  constructor(public fb: FormBuilder, private api: ApiService){}


  ngOnInit(){

    console.log("ngOnInit",this.currentAntrenor);
    
    this.editAntrenorForm = this.fb.group({
      angajatId: [null, Validators.required],
      antrenorClientId: [null],
      clasaId: [null,]
    }); 

    
  }

  afiseaza(){
    
    const editedAntrenor = new Antrenor(this.currentAntrenor);

    if(this.editAntrenorForm.value.angajatId != null) editedAntrenor.angajatId = this.editAntrenorForm.value.angajatId;
    if(this.editAntrenorForm.value.antrenorClientId != null) editedAntrenor.antrenorClientId= this.transformInNumberArray(this.editAntrenorForm.value.antrenorClientId);


    this.api.editAntrenor(editedAntrenor).subscribe(()=>{
      console.log(editedAntrenor);
    },
    (error: Error) => {
      console.log('err', error);

    });


    this.editModal.hide();
  }

  
  initialize(id:number): void{
    
    this.api.getAntrenor(id).subscribe((antrenor: Antrenor)=>{
      this.currentAntrenor = new Antrenor(antrenor);
      this.currentAntrenor.id = id;
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