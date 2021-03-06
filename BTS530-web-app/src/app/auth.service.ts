import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

import { map } from 'rxjs/operators';
//import { Credentials } from './login.component';
import { Credentials } from "./data-model-classes";
import { stringify } from 'querystring';

@Injectable()
export class AuthService {

  // Properties

  private url: string = 'http://localhost:8080/api';
  private activeUser: string;

  // Initialization

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  // Methods

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  /*isAuthorized(): boolean {
    const token = localStorage.getItem('access_token');

    let tokenRaw = localStorage.getItem('access_token');
    let tokenDecoded = this.jwtHelper.decodeToken(tokenRaw);

    if (tokenDecoded) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }*/

  currentUser(): string {
    const token = localStorage.getItem('access_token');
    const empty = '';

    if(token){
      let tokenDecoded = this.jwtHelper.decodeToken(token);
      return tokenDecoded.username;
    }else{
      return empty;
    }
  }

  setActiveUser() {
    const token = localStorage.getItem('access_token');
    const empty = '';
    if(token){
      let tokenDecoded = this.jwtHelper.decodeToken(token);
      this.activeUser = tokenDecoded.username;
    }else{
      this.activeUser = empty;
    }
  }

  getActiveUser(): string {
    return this.activeUser;
  }
  

  

  login(credentials: Credentials): Observable<any> {

    // Uncomment if you want to see the passed-in credentials
    //console.log(credentials);

    // Attempt to login
    // ##### EDIT the following to match the path to your web API login resource
    return this.http.post<any>(`${this.url}/user-accounts/login`, credentials);
  }

  logoutUser(){
    localStorage.removeItem('access_token');
    this.setActiveUser();
  }

}

