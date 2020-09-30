import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

import { DataModelManagerService } from "./data-model-manager.service";

import { Credentials } from "./data-model-classes";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Data holding properties
  userCredentials: Credentials;


  constructor(private m: DataModelManagerService, private router: Router ) { 
    this.userCredentials = new Credentials();
  }

  ngOnInit(): void {
  }

  loginAttempt(): void {
    this.m.apiUserLogin(this.userCredentials).subscribe(u => {
      console.log(u);
      
    });

    
  }


}
