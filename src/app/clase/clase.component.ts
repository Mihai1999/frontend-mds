import { Component, OnInit, ViewChild } from "@angular/core";
import { Clasa } from '../shared/clasa.model';
import { ApiService } from '../shared/api.service';
import { Antrenor } from '../shared/antrenor.model';
import { Angajat } from '../shared/angajat.model';
import { Client } from '../shared/client.model';
import { AddClaseComponent } from './add-clase/add-clase.component';
import { ClasaDetail } from '../shared/clasa-detail.model';
import { EditClasaComponent } from './edit-clase/edit-clase.component';


@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css'],
})
export class ClaseComponent implements OnInit{
  @ViewChild('addClasa') AddClasaComp: AddClaseComponent;
  @ViewChild('editClasa') EditClasaComp: EditClasaComponent;
  listaClase: Clasa[] = [];
  antrenori: Antrenor[] = [];
  angajati: Angajat[] = [];
  listaClienti: string[] = [];
  clasaDetail: ClasaDetail[] = [];
  enableOn = 0;
  

  constructor(private api: ApiService){}

  ngOnInit(){
    this.getClase();
    console.log("lista", this.listaClase);
    console.log("antrenori", this.antrenori);
    console.log("angajati", this.angajati);

  }

  getClase(){
    this.listaClase = [];
    this.api.getClase().subscribe((data: Clasa[])=>{
      
      for(let i=0; i<data.length; i++){
        this.api.getClasa(data[i].id).subscribe((clasa: Clasa)=>{
          clasa.id = data[i].id;
          //console.log("clasa", clasa);
          this.listaClase.push(new Clasa(clasa));
          this.getAntrenor(clasa.antrenorId);
          

        })
      }
    },
    (error: Error)=>{
      console.log(error);
    });
  }

  getAntrenor(id: number){
    this.api.getAntrenor(id).subscribe((antrenor: Antrenor)=>{
      antrenor.id = id;
      console.log(antrenor);
      this.antrenori.push(new Antrenor(antrenor));
      this.getAngajat(antrenor.angajatId);
    },
    (error: Error)=>{
      console.log(error);
    });
    
  }

  getAngajat(id: number){
    this.api.getAngajat(id).subscribe((angajat: Angajat)=>{
      angajat.id = id;
      console.log(angajat);
      this.angajati.push(new Angajat(angajat));
    },
    (error: Error)=>{
      console.log(error);
    });
  }

  getClienti(index: number){
    var clasa = new Clasa(this.listaClase[index]);
    for(let i=0; i<clasa.clasaClientId.length;i++){
    this.api.getClient(clasa.clasaClientId[i]).subscribe((client: Client)=>{

    this.listaClienti[index] += ', ' + client.nume + " " + client.prenume;

    },
    (error: Error)=>{
      console.log(error);
    });   
    }
  }

  afiseaza(){
    if(this.enableOn <2){
      this.enableOn ++;
    console.log("length", this.listaClase.length);
    for(let i=0; i< this.listaClase.length;i++){
    this.listaClienti.push("");
    this.getClienti(i);

    var participanti = document.getElementsByClassName("participanti")[i];
    participanti.innerHTML = this.listaClienti[i].slice(2);
 
    }
    console.log("listaclienti", this.listaClienti);
  }
    
  }


  showAdd(){
    //console.log("addclasa", this.AddClasaComp);
    this.AddClasaComp.initialize();
  }

  deleteClasa(id:number){
    this.api.deleteClasa(id).subscribe(()=>{
      console.log("delete", id);
      this.getClase();
    },
    (error: Error)=>{
      console.log(error);
    });
  }

  showEdit(id:number){
    this.EditClasaComp.initialize(id);
  }
}