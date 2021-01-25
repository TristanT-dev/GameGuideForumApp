import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

import { DataModelManagerService } from "../data-model-manager.service";
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../auth.service';
import { Credentials } from "../data-model-classes";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Data holding properties
  userCredentials: Credentials;
  loginError: string;
  loginStatus: boolean;

  // Token
  //tokenRaw?: string;
  //tokenDecoded?: any;
  //tokenIssuedTimestamp: any;

  constructor(
    
    //private m: DataModelManagerService, 
    private a: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService

    ) { 

    // Fetch the token from the browser's local storage
    //this.tokenRaw = localStorage.getItem('access_token');

    this.userCredentials = new Credentials();
    this.userCredentials.username = '';
    this.userCredentials.password = '';

    this.loginStatus = null;
    this.loginError = '';
  }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    //console.log(this.userCredentials);
    
    localStorage.removeItem('access_token');


    

    this.a.login(this.userCredentials).subscribe(u => {
      //console.log(u);
      this.loginStatus = u.loginStatus;
      //console.log(u.token);
      if(this.loginStatus == true){
        localStorage.setItem('access_token', u.token);
        this.a.setActiveUser();
        this.router.navigate(['/home']);
        //console.log(this.a.currentUser());
      }else{
        console.log("Login failed");
      }
      
      
    });

    
  }


}
