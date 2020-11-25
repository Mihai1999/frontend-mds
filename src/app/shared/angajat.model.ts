export class Angajat{
  id: number;
  nume: string;
  job: string;
  salariu: DoubleRange;
  telefon: number;
  image: string;

  constructor(input?: any){
    Object.assign(this, input);
  }
}