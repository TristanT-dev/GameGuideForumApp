import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

import { DataModelManagerService } from "../data-model-manager.service";

import { ApiUserAccount, RegisterForm } from "../data-model-classes";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Data-holding properties
  newRegisterForm: RegisterForm;
  newAccountAdd: ApiUserAccount;
  newAccountResult: ApiUserAccount;

  constructor(private m: DataModelManagerService, private router: Router ) {
    this.newRegisterForm = new RegisterForm();
    this.newAccountAdd = new ApiUserAccount();
    this.newAccountResult = new ApiUserAccount();
  }

  ngOnInit(): void {
  }

  accountSave(): void {

    // Prepare the data for saving
    let newAccount = new ApiUserAccount();
    

    newAccount.username = this.newRegisterForm.username;
    newAccount.password = this.newRegisterForm.password;


    if(this.newRegisterForm.password !== this.newRegisterForm.password2){
      alert("Error: Passwords do not match!");
    }else{
      this.newAccountAdd = newAccount;
      console.log(this.newAccountAdd);

      this.m.apiUserAccountAdd(this.newAccountAdd).subscribe(u => {
        this.newAccountResult = u;
      });

    }

    


    

  }

}
