import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { Client } from '../../shared/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Abonament } from 'src/app/shared/abonament.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{
  @ViewChild('addClient') clientModal: ModalDirective;
  addClientForm: FormGroup;
  addAbonamentForm: FormGroup;
  succes: boolean;

  constructor(public fb: FormBuilder,private api: ApiService){}

  ngOnInit(){
    this.addClientForm = this.fb.group({
      nume: [null, Validators.required],
      prenume: [null, Validators.required],
      telefon: [null, Validators.required],
      email: [null, Validators.required],

    }); 

    this.addAbonamentForm = this.fb.group({
      denumire: [null, Validators.required],
      pret: [null, Validators.required],

    });
    
  }
  
  initialize():void{
    this.clientModal.show();
    console.log("addClientForm", this.addClientForm);
  }


  
  hide(){
    this.clientModal.hide();
  }

 add(){
    let abonament = new Abonament(this.addAbonamentForm.value);
    abonament.start_date = new Date();
    abonament.end_date = new Date();
    abonament.end_date.setDate(new Date().getDate()+30);
    console.log(abonament.start_date);
    let aux = new Client(this.addClientForm.value);
    aux.antrenorClientId = [];
    aux.clasaClientId = [];
    this.api.addAbonament(abonament).subscribe(()=>{
      console.log(abonament);
      this.api.getAbonamente().subscribe((data: Abonament[])=>{

        aux.abonamentId = data[data.length-1].id;
        this.api.addClient(aux).subscribe(()=>{
          console.log("Ok");
          this.clientModal.hide();
        },
        (error: Error)=>{
          console.log(error);
        });

      },
      (error: Error)=>{
        console.log(error);
      });
    },
    (error: Error)=>{
      console.log(error);
    });
  
   }


}