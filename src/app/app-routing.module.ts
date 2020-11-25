import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientiComponent } from './clienti/clienti.component';
import { AntrenoriComponent } from './antrenori/antrenori.component';
import { ClaseComponent } from './clase/clase.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clienti', component: ClientiComponent},
  { path: 'antrenori', component: AntrenoriComponent},
  { path: 'clase', component: ClaseComponent},
  { path: '**', component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
