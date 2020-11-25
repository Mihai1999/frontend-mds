export class Abonament{
  id: number;
  denumire: string;
  pret: DoubleRange;
  start_date: Date;
  end_date: Date;

  constructor(input?: any){
    Object.assign(this, input);
  }
}