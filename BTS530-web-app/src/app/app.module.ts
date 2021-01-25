import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderNavComponent } from './headerNav/header-nav.component';
import { GuidesListComponent } from './guidesList/guides-list.component';
import { ForumsListComponent } from './forumsList/forums-list.component';
import { GuideDetailComponent } from './guideDetail/guide-detail.component';


import { AuthService } from './auth.service';
import { GuardAuthService } from './guard-auth.service';
import { InterceptTokenService } from "./intercept-token.service";
import { DataModelManagerService } from "./data-model-manager.service";
import { GuideCreateComponent } from './guideCreate/guide-create.component';
import { GuideEditComponent } from './guide-edit/guide-edit.component';
import { ApiGameGuide } from './data-model-classes';




export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    HeaderNavComponent,
    GuidesListComponent,
    ForumsListComponent,
    GuideDetailComponent,
    GuideCreateComponent,
    GuideEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT'
      }
    })
  ],
  providers: [
    AuthService,
    DataModelManagerService,
    GuardAuthService,
    ApiGameGuide,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
