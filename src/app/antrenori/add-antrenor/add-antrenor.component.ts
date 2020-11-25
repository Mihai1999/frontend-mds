import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Angajat } from 'src/app/shared/angajat.model';
import { Antrenor } from 'src/app/shared/antrenor.model';



@Component({
  selector: 'app-add-antrenor',
  templateUrl: './add-antrenor.component.html',
  styleUrls: ['./add-antrenor.component.css'],
})
export class AddAntrenorComponent implements OnInit{
  @ViewChild ('addAntrenor') antrenorModal: ModalDirective;

  addAntrenorForm: FormGroup;
  succes: boolean;

  constructor(private api: ApiService, public fb: FormBuilder){}

  ngOnInit(){


    this.addAntrenorForm = this.fb.group({
      angajatId: [null],
      antrenorClientId: [null],
      clasaId: [null],
    });
   
  }

  initialize():void{
    console.log(this.antrenorModal);
    this.antrenorModal.show();
      
  }

  hide(){
    this.antrenorModal.hide();
  }

  add(){
    

    let antrenor = new Antrenor({
      angajatId: this.addAntrenorForm.value.angajatId,
      antrenorClientId: this.transformInNumberArray(this.addAntrenorForm.value.antrenorClientId),
    });

    this.api.addAntrenor(antrenor).subscribe(()=>{
      
    },
    (error: Error)=>{
      console.log(error);
    });

  }

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }
  
}