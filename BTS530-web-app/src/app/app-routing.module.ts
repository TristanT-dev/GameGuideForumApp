import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GuidesListComponent } from './guidesList/guides-list.component';
import { GuideDetailComponent } from './guideDetail/guide-detail.component';
import { ForumsListComponent } from './forumsList/forums-list.component';
import { GuideCreateComponent } from './guideCreate/guide-create.component';
import { GuideEditComponent } from './guide-edit/guide-edit.component';

import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game-guides', component: GuidesListComponent },
  { path: 'game-guides/detail/:id', component: GuideDetailComponent },
  { path: 'forums', component: ForumsListComponent },
  { path: 'game-guides/add', component: GuideCreateComponent, canActivate: [GuardAuthService] },
  { path: 'game-guides/edit/:id', component: GuideEditComponent, canActivate: [GuardAuthService] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
