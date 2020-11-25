import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DetailModalComponent } from './home/detail-modal/detail-modal.component';
import { SearchPipe } from './shared/search.pipe';
import { AddEchpComponent } from './home/add-echp/add-echp.component';
import { EditEchpModalComponent } from './home/edit-echp-modal/edit-echp-modal.component';
import { ClientiComponent } from './clienti/clienti.component';
import { AddClientComponent } from './clienti/add-client/add-client.component';
import { EditClientComponent } from './clienti/edit-client/edit-client.component';
import { AntrenoriComponent } from './antrenori/antrenori.component';
import { AddAngajatComponent } from './antrenori/add-angajat/add-angajat.component';
import { AddAntrenorComponent } from './antrenori/add-antrenor/add-antrenor.component';
import { EditAngajatComponent } from './antrenori/edit-angajat/edit-angajat.component';
import { EditAntrenorComponent } from './antrenori/edit-antrenor/edit-antrenor.component';
import { ClaseComponent } from './clase/clase.component';
import { AddClaseComponent } from './clase/add-clase/add-clase.component';
import { EditClasaComponent } from './clase/edit-clase/edit-clase.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchPipe,
    DetailModalComponent,
    AddEchpComponent,
    EditEchpModalComponent,
    ClientiComponent,
    AddClientComponent,
    EditClientComponent,
    AntrenoriComponent,
    AddAngajatComponent,
    AddAntrenorComponent, 
    EditAngajatComponent,
    EditAntrenorComponent,
    ClaseComponent,
    AddClaseComponent,
    EditClasaComponent,

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
