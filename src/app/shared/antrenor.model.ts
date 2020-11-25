import { Angajat } from './angajat.model';

export class Antrenor{
  id: number;
  angajatId: number;
  antrenorClientId: number[];
  clasaId: number[];
  angajat: Angajat;

  constructor(input?: any){
    Object.assign(this, input);
  }
}