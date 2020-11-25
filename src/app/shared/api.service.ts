import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Echipament } from '../../app/shared/echipament.model'
import { identifierModuleUrl } from '@angular/compiler';
import { Client } from './client.model';
import { Angajat } from './angajat.model';
import { Antrenor } from './antrenor.model';
import { Abonament } from './abonament.model';
import { Clasa } from './clasa.model';


@Injectable({
    providedIn: 'root'
  })
export class ApiService{
    constructor(private http: HttpClient){}
    header = new HttpHeaders({
        'Content-Type':'application/json'
    });
    baseUrl = 'https://localhost:44381/api';

    //GET

    getEchipament(id: number){
        return this.http.get(this.baseUrl + '/echipament/' + id.toString(),{ headers: this.header});
    }

    getEchipamente(){
        return this.http.get(this.baseUrl + '/echipament', {headers: this.header});
    }

    getClient(id: number){
        return this.http.get(this.baseUrl + '/client/' + id.toString(), {headers: this.header});

    }

    getClienti(){
        return this.http.get(this.baseUrl + '/client', {headers: this.header});
    }

    getAbonament(id: number){
        return this.http.get(this.baseUrl + '/abonament/' + id.toString(),{headers: this.header});
    }

    getAbonamente(){
        return this.http.get(this.baseUrl + '/abonament', {headers: this.header});
    }

    getAntrenor(id: number){
        return this.http.get(this.baseUrl + '/antrenor/' + id.toString(), {headers: this.header});
    }

    getAntrenori(){
        return this.http.get(this.baseUrl + '/antrenor', {headers: this.header});
    }

    getAngajat(id: number){
        return this.http.get(this.baseUrl + '/angajat/' + id.toString(), {headers: this.header});
    }

    getAngajati(){
        return this.http.get(this.baseUrl + '/angajat', {headers: this.header});
    }

    getClasa(id: number){
        return this.http.get(this.baseUrl + '/clasa/' + id.toString(), {headers: this.header});
    }

    getClase(){
        return this.http.get(this.baseUrl + '/clasa', {headers: this.header});
    }

    //ADD

    addEchipament( echipament: Echipament){
        return this.http.post(this.baseUrl + '/echipament', echipament, {headers: this.header});
    }

    addClient(client: Client){
        console.log("add",client);
        return this.http.post(this.baseUrl + '/client', client, {headers: this.header});
    }

    addAngajat(angajat: Angajat){
        return this.http.post(this.baseUrl + '/angajat', angajat, {headers: this.header});
    }

    addAntrenor(antrenor: Antrenor){
        return this.http.post(this.baseUrl + '/antrenor', antrenor, {headers: this.header});
    }

    addAbonament(abonament: Abonament){
        return this.http.post(this.baseUrl + '/abonament', abonament, {headers: this.header});
    }

    addClasa(clasa: Clasa){
        return this.http.post(this.baseUrl + '/clasa', clasa, {headers: this.header});
    }



    //DELETE

    deleteEchipament(id: number){
        return this.http.delete(this.baseUrl + '/echipament/'+ id.toString(),{headers: this.header});
    }

    deleteClient(id: number){
        return this.http.delete(this.baseUrl + '/client/' +id.toString(), {headers: this.header});
    }

    deleteAbonament(id: number){
        return this.http.delete(this.baseUrl + '/abonament/' + id.toString(), {headers: this.header});
    }

    deleteAngajat(id: number){
        console.log("merge", id);
        return this.http.delete(this.baseUrl + '/angajat/' + id.toString(),{headers: this.header});
        
    }

    deleteAntrenor(id: number){
        return this.http.delete(this.baseUrl + '/antrenor/' + id.toString(),{headers: this.header});
    }

    deleteClasa(id: number){
        return this.http.delete(this.baseUrl + '/clasa/' + id.toString(), {headers: this.header})
    }

    //EDIT

    editEchipament(echipament: Echipament){
        return this.http.put(this.baseUrl + '/echipament/' + echipament.id.toString(), echipament, {headers: this.header});
    }

    editClient(client: Client){
        return this.http.put(this.baseUrl + '/client/' + client.id.toString(), client, { headers: this.header});
    }

    editAbonament(abonament: Abonament){
        return this.http.put(this.baseUrl + '/abonament/' + abonament.id.toString(), abonament, {headers: this.header});
    }

    editAngajat(angajat: Angajat){
        return this.http.put(this.baseUrl + '/angajat/' + angajat.id.toString(), angajat, { headers: this.header});
    }

    editAntrenor(antrenor: Antrenor){
        return this.http.put(this.baseUrl + '/antrenor/' + antrenor.id.toString(), antrenor, { headers: this.header});
    }
    editClasa(clasa: Clasa){
        return this.http.put(this.baseUrl + '/clasa/' + clasa.id.toString(), clasa, { headers: this.header});
    }
}


