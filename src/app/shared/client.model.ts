
export class Client{
  id: number;
  nume: string;
  prenume: string;
  telefon: number;
  email: string;
  abonamentId: number;
  clasaClientId: number[];
  antrenorClientId: number[];

  constructor(input?: any){
    Object.assign(this, input);
 }


}