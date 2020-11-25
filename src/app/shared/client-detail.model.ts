import { Client } from './client.model';
import { Antrenor } from './antrenor.model';
import { Angajat } from './angajat.model';
import { Abonament } from './abonament.model';
import { Clasa } from './clasa.model';
import { OnInit } from '@angular/core';

export class ClientDetail {
  client: Client;
  antrenor: Antrenor[] = [];
  abonament: Abonament;
  clasa: Clasa[] = [];
  numeAntrenori: string;

  constructor(input?: any){
    Object.assign(this, input);
    this.numeAntrenori = "";
  }

}