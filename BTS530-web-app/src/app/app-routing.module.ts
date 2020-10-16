import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home.component";
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { GuidesListComponent } from './guides-list.component';
import { GuideDetailComponent } from './guide-detail.component';
import { ForumsListComponent } from './forums-list.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game-guides', component: GuidesListComponent },
  { path: 'game-guides/detail/:id', component: GuideDetailComponent },
  { path: 'forums', component: ForumsListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
