export class Echipament{
    id: number;
    denumire: string;
    pret: DoubleRange;
    brand: string;
    image: string;

    constructor(input?: any){
        Object.assign(this, input);
    
    }

}

