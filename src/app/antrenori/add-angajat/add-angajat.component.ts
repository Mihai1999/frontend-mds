import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Angajat } from 'src/app/shared/angajat.model';
import { Antrenor } from 'src/app/shared/antrenor.model';



@Component({
  selector: 'app-add-angajat',
  templateUrl: './add-angajat.component.html',
  styleUrls: ['./add-angajat.component.css'],
})
export class AddAngajatComponent implements OnInit{
  @ViewChild ('addAngajat') angajatModal: ModalDirective;
  addAngajatForm: FormGroup;

  succes: boolean;

  constructor(private api: ApiService, public fb: FormBuilder){}

  ngOnInit(){
    this.addAngajatForm = this.fb.group({
      nume: [null, Validators.required],
      telefon: [null, Validators.required],
      job: [null, Validators.required],
      salariu: [null, Validators.required],
    });


   
  }

  initialize():void{
    console.log(this.angajatModal);
    this.angajatModal.show();
      
  }

  hide(){
    this.angajatModal.hide();
  }

  add(){
    let angajat= new Angajat({
      nume: this.addAngajatForm.value.nume,
      telefon: this.addAngajatForm.value.telefon,
      job: this.addAngajatForm.value.job,
      salariu: this.addAngajatForm.value.salariu,
    });



    this.api.addAngajat(angajat).subscribe(()=>{
      
    },
    (error: Error)=>{
      console.log(error);
    });

  }

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }
  
}