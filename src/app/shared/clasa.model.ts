export class Clasa{
  id: number;
  denumire: string;
  starDate: Date;
  endDate: Date;
  antrenorId: number;
  clasaClientId: number[];

  constructor(input?: any){
    Object.assign(this, input);
  }
}