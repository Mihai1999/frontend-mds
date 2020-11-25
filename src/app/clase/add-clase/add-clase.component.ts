import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Angajat } from 'src/app/shared/angajat.model';
import { Antrenor } from 'src/app/shared/antrenor.model';
import { Clasa } from 'src/app/shared/clasa.model';





@Component({
  selector: 'app-add-clase',
  templateUrl: './add-clase.component.html',
  styleUrls: ['./add-clase.component.css'],
})
export class AddClaseComponent implements OnInit{
  @ViewChild ('addClasa') clasaModal: ModalDirective;
  addClasaForm: FormGroup;

  succes: boolean;

  constructor(private api: ApiService, public fb: FormBuilder){}

  ngOnInit(){
    this.addClasaForm = this.fb.group({
      denumire: [null, Validators.required],
      antrenorId: [null, Validators.required],
      data: [null, Validators.required],
      ora: [null, Validators.required],
      durata: [null, Validators.required],
      participanti: [null, ],
    });


   
  }

  initialize():void{
    console.log(this.clasaModal);
    this.clasaModal.show();
      
  }

  hide(){
    this.clasaModal.hide();
  }

  add(){
    const parts = this.addClasaForm.value.data.split(" ");
    const ora = this.addClasaForm.value.ora.split(":");
    console.log("parti", parts);
    const startDate = new Date();
    startDate.setDate(parts[0]);
    startDate.setMonth(parts[1] - 1);
    startDate.setFullYear(parts[2]);
    startDate.setHours(ora[0]);
    startDate.setMinutes(ora[1]);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + this.addClasaForm.value.durata);
    
    console.log("startDate", startDate.toString());
    console.log("endDate", endDate);

    let clasa = new Clasa({
      denumire: this.addClasaForm.value.denumire,
      antrenorId: this.addClasaForm.value.antrenorId,
      start_date: startDate,
      end_date: endDate,
      clasaClientId: this.transformInNumberArray(this.addClasaForm.value.participanti),
    });

    console.log("clasa", clasa);

    this.api.addClasa(clasa).subscribe(()=>{
      
    },
    (error: Error)=>{
    console.log(error);
    });

    this.clasaModal.hide();
  }

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }
  
}