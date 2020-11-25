import { Clasa } from './clasa.model';
import { Antrenor } from './antrenor.model';
import { Client } from './client.model';
import { Angajat } from './angajat.model';

export class ClasaDetail{
  clasa: Clasa;
  antrenor: Antrenor;
  angajat: Angajat;
  clienti: Client[];

  constructor(input?: any){
    Object.assign(this, input);
  }
}