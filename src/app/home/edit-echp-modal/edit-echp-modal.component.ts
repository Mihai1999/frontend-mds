import { Component, ViewChild } from "@angular/core";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Echipament } from 'src/app/shared/echipament.model';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-edit-echp-modal',
  templateUrl: './edit-echp-modal.component.html',
  styleUrls: ['./edit-echp-modal.component.css']
})
export class EditEchpModalComponent{
  @ViewChild('editEchpModal') modal: ModalDirective;
  editEchpForm: FormGroup;
  currentObject = new Echipament();

  constructor(public fb: FormBuilder, private api: ApiService){}

  initialize(id: number): void{
    this.modal.show();
    this.api.getEchipament(id).subscribe((data: Echipament)=>{
      this.currentObject = data;
      this.currentObject.id = id;
      this.initializeFrom(this.currentObject);
    },
    (error: Error)=> {
      console.log('err', error);
    }
    );
  }

  initializeFrom(current: Echipament){
    this.editEchpForm = this.fb.group({
      denumire:[current.denumire, Validators.required],
      pret:[current.pret, Validators.required],
      marca:[current.brand, Validators.required],
      imgUrl:[current.image],
    })
  }

  editEchipament(){
    const editedEchp = new Echipament({
      id: this.currentObject.id,
      denumire: this.editEchpForm.value.denumire,
      pret: this.editEchpForm.value.pret,
      brand: this.editEchpForm.value.brand,
      image: this.editEchpForm.value.imgUrl,
    });
    this.api.editEchipament(editedEchp).subscribe(()=>
    {
      this.modal.hide();
    },
    (error: Error) => {
      console.log('err',error);
    });
  }

}