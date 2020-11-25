import { Component, OnInit, ViewChild } from "@angular/core";
import { Antrenor } from '../shared/antrenor.model';
import { ApiService } from '../shared/api.service';
import { Angajat } from '../shared/angajat.model';
import { Clasa } from '../shared/clasa.model';
import { AddAngajatComponent } from './add-angajat/add-angajat.component';
import { AddAntrenorComponent } from './add-antrenor/add-antrenor.component';
import { EditAngajatComponent } from './edit-angajat/edit-angajat.component';
import { EditAntrenorComponent } from './edit-antrenor/edit-antrenor.component';

@Component({
  selector: 'app-antrenori',
  templateUrl: './antrenori.component.html',
  styleUrls: ['./antrenori.component.css']
})
export class AntrenoriComponent implements OnInit{
  @ViewChild('addAngajat') AddAngajatComp: AddAngajatComponent;
  @ViewChild('addAntrenor') AddAntrenorComp: AddAntrenorComponent;
  @ViewChild('editAngajat') EditAngajatComp: EditAngajatComponent;
  @ViewChild('editAntrenor') EditAntrenorComp: EditAntrenorComponent;
  antrenori: Antrenor[] = [];
  angajati: Angajat[] = [];
  notAntr: Angajat[] = [];
  afis: boolean;

  
  constructor(private api: ApiService){
  }

  ngOnInit(){
    this.getAntrenori();
    this.getAngajati();
    this.afis = false;

  }

  afiseaza(){
    this.notAntrenor();
    this.afis = true;
    console.log("notantrenorvecotr", this.notAntr);
    // console.log(this.angajati.length);
    // console.log("angajati", this.angajati);
    // for(let i=0; i < this.angajati.length; i++)
    //    console.log("X",this.angajati[i]);
 
  }


  getAntrenori(){

    this.api.getAntrenori().subscribe((data: Antrenor[])=>{
        for(let i=0; i<data.length; i ++){
          this.api.getAntrenor(data[i].id).subscribe((antrenor: Antrenor)=>{
            antrenor.id = data[i].id;
            this.antrenori.push(antrenor);
            console.log("aici", antrenor);

            this.api.getAngajat(this.antrenori[i].angajatId).subscribe((angajat: Angajat)=>{
              angajat.id = this.antrenori[i].angajatId;
              if (!angajat.image) {
                angajat.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSBu98gBu1u1veuHLuCuGd2TzpzQ-qEXxiyB4UTJCStM9bPG_9&usqp=CAU';
               }
              this.antrenori[i].angajat = new Angajat (angajat);

            });
          },
          (error: Error)=>{
            console.log(error);
          });

        }


    },
    (error: Error)=>{
      console.log(error);
    });
    
  }

  getAngajati(){
    this.api.getAngajati().subscribe((data: Angajat[])=>{
      for(let i=0; i<data.length;i++){
          this.api.getAngajat(data[i].id).subscribe((angajat: Angajat)=>{
            angajat.id = data[i].id;
            
            if (!angajat.image) {
              angajat.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSBu98gBu1u1veuHLuCuGd2TzpzQ-qEXxiyB4UTJCStM9bPG_9&usqp=CAU';
             }
             this.angajati.push(angajat);
          
          },
          (error: Error)=>{
            console.log(error);
          });
       

      }
    },
    (error: Error)=>{
      console.log(error);
    });
  }

  notAntrenor(){
    var listaAntr: number [] = [];
    console.log("length",this.antrenori.length);
    for(let i=0; i<this.antrenori.length;i++){
      listaAntr.push(this.antrenori[i].angajatId);
      console.log("verif",this.antrenori[i].angajatId);
    }
    console.log("lista antr",listaAntr);
    console.log("angajati length", this.angajati.length);
    for(let i=0; i<this.angajati.length ; i++){
      let Ok = 1;
      for(let j=0; j<listaAntr.length; j++){
        if(this.angajati[i].id == listaAntr[j]){
          Ok = 0;
        }
        
      }
      if(Ok == 1){
        console.log("notAntrenor", this.angajati[i]);
        this.notAntr.push(this.angajati[i]);
      }

    }
    
  }
  
  showAddM1(){
    console.log(this.AddAngajatComp);
    this.AddAngajatComp.initialize();
  }

  showAddM2(){
    console.log(this.AddAntrenorComp);
    this.AddAntrenorComp.initialize();
  }

  deleteAngajat(id:number){
    console.log("deleteangajati1", id);
    this.api.deleteAngajat(id).subscribe(()=>{
      this.getAngajati();
      this.getAntrenori();
    },
    (error: Error)=>{
      console.log(error);
    });
  }

  showEditAngajat(id: number){
    this.EditAngajatComp.initialize(id);
  }

  showEditAntrenor(id: number){
    this.EditAntrenorComp.initialize(id);
  }

}