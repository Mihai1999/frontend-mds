import { Component, ViewChild, OnInit } from "@angular/core";
import { ModalBackdropComponent, ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

import { Client } from 'src/app/shared/client.model';
import { ClientDetail } from 'src/app/shared/client-detail.model';
import { Abonament } from 'src/app/shared/abonament.model';
import { ThrowStmt } from '@angular/compiler';
import { Angajat } from 'src/app/shared/angajat.model';



@Component({
  selector: 'app-edit-angajat',
  templateUrl: './edit-angajat.component.html',
  styleUrls: ['./edit-angajat.component.css'],
})
export class EditAngajatComponent implements OnInit{
  @ViewChild('editAngajat') editModal: ModalDirective;
  editAngajatForm: FormGroup;
  currentAngajat: Angajat;

  constructor(public fb: FormBuilder, private api: ApiService){}


  ngOnInit(){

    console.log("ngOnInit",this.currentAngajat);
    
    this.editAngajatForm = this.fb.group({
      nume: [null, Validators.required],
      telefon: [null, Validators.required],
      job: [null, Validators.required],
      salariu: [null, Validators.required],

    }); 

    
  }

  afiseaza(){
    
    const editedAngajat = new Angajat(this.currentAngajat);

    if(this.editAngajatForm.value.nume != null) editedAngajat.nume = this.editAngajatForm.value.nume;
    if(this.editAngajatForm.value.telefon != null) editedAngajat.telefon = this.editAngajatForm.value.telefon;
    if(this.editAngajatForm.value.job != null) editedAngajat.job = this.editAngajatForm.value.job;
    if(this.editAngajatForm.value.salariu != null) editedAngajat.salariu = this.editAngajatForm.value.salariu;

    this.api.editAngajat(editedAngajat).subscribe(()=>{
      console.log(editedAngajat);
    },
    (error: Error) => {
      console.log('err', error);

    });


    this.editModal.hide();
  }

  
  initialize(id:number): void{
    
    this.api.getAngajat(id).subscribe((angajat: Angajat)=>{
      this.currentAngajat = new Angajat(Angajat);
      this.currentAngajat.id = id;
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