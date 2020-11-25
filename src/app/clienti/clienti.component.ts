import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Client } from '../shared/client.model';
import { Abonament } from '../shared/abonament.model';
import { Antrenor} from '../shared/antrenor.model';
import { ClientDetail } from '../shared/client-detail.model';
import { Angajat } from '../shared/angajat.model';
import { stringify } from 'querystring';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

@Component({
  selector:  'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit{
  clientDetail: ClientDetail[] = [];
  numeAntrenori: string[];
  @ViewChild('addClient') addClient: AddClientComponent;
  @ViewChild('editClient') editClient: EditClientComponent;

  constructor(private api: ApiService){}
  
  ngOnInit(){
    this.getClienti();
    console.log("addClient", this.addClient);
    console.log("editClient", this.editClient);

  }


  getClienti(){
    this.api.getClienti().subscribe((data: Client[])=>{
      this.clientDetail = [];
      for(let i = 0 ; i< data.length; i++){
        let  aux = new ClientDetail();
        this.api.getClient(data[i].id).subscribe((client: Client) =>{

          //console.log("client", client);
          aux.client = new Client(client);
          aux.client.id = data[i].id;

          this.api.getAbonament(client.abonamentId).subscribe((abonament: Abonament = new Abonament())=>{
            //console.log("abonament", abonament);
            aux.abonament = new Abonament(abonament);
            abonament.id = client.abonamentId;
    
          },
          (error: Error)=>{
            console.log(error);
          });
          for(let j = 0; j< client.antrenorClientId.length ; j++){
            this.api.getAntrenor(client.antrenorClientId[j]).subscribe((antrenor: Antrenor)=>{
              //console.log("antrenor", antrenor);
              aux.antrenor.push(new Antrenor());
              antrenor.id = client.antrenorClientId[j];
              aux.antrenor[j] = antrenor ;
              
              this.api.getAngajat(aux.antrenor[j].angajatId).subscribe((angajat: Angajat) => {
                //console.log("angajat", angajat);
                angajat.id = aux.antrenor[j].angajatId;
                aux.antrenor[j].angajat = new Angajat(angajat);
                this.clientDetail[i].numeAntrenori += ", " + angajat.nume;

              },
              (error: Error) => {
                console.log(error);
              });
              
              //console.log("push", aux.antrenor);
            },
            (error: Error) => {
              console.log(error);
            });
          }


        },
        (error: Error) => {
          console.log(error);
        } );
        this.clientDetail.push(aux);
        //console.log("vector",this.clientDetail);
        
      }

    },
    (error: Error) =>{
      console.log(error);
    });

  }

  showAdd(){
    this.addClient.initialize();
    console.log("addClient", this.addClient);
  }
  
  showEdit(id:number){
    this.editClient.initialize(id);
    console.log("editClient", this.editClient);
  }

  delete(id:number){
    this.api.deleteClient(id).subscribe(()=>{
      this.getClienti();
    },
    (error: Error) =>{
      console.log(error);
    })
  }


}