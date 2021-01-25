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
import { ForumDetailComponent } from './forum-detail/forum-detail.component';
import { ForumCreateComponent } from './forum-create/forum-create.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game-guides', component: GuidesListComponent },
  { path: 'game-guides/detail/:id', component: GuideDetailComponent },
  { path: 'forums', component: ForumsListComponent },
  {path: 'forums/detail/:id', component: ForumDetailComponent},
  {path: 'forums/add', component: ForumCreateComponent},
  { path: 'game-guides/add', component: GuideCreateComponent },
  { path: 'game-guides/edit/:id', component: GuideEditComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
