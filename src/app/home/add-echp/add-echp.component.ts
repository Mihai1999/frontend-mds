import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { Echipament } from '../../shared/echipament.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-echipament',
  templateUrl: './add-echp.component.html',
  styleUrls: ['./add-echp.component.css']
})
export class AddEchpComponent implements OnInit{
  @ViewChild('addEchp') addEchpModal: ModalDirective;
  addEchpForm: FormGroup;
  succes: boolean;
  

  constructor(public fb: FormBuilder,private api: ApiService){}

  ngOnInit(){
    this.addEchpForm = this.fb.group({
      denumire: [null, Validators.required],
      pret: [null, Validators.required],
      brand: [null, Validators.required],
      img: [null]
    });
  }

  initialize(): void{
    this.addEchpModal.show();
  }

  add(){
    this.api.addEchipament(this.addEchpForm.value).subscribe(() =>{
    this.succes = true;
    this.addEchpModal.hide();
    setTimeout(() => {
      this.succes = null;
      }, 3000);
    },
    (error: Error) => {
      console.log(error);
      console.log(this.addEchpForm.value);
      this.addEchpForm.reset();
      this.succes = false;
      setTimeout(()=> {
        this.succes = null;

      }, 3000);
    });

  }

  hide(){
    this.addEchpModal.hide();
  }

}
