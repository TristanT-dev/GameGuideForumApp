import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

import { ApiUserAccount, Credentials } from "./data-model-classes";

@Injectable({
  providedIn: 'root'
})
export class DataModelManagerService {

  constructor(private http: HttpClient) { }

   // Edit the base URL string to the web service
   private urlApi: string = "http://localhost:8080/api";
   //private urlApi: string = "https://reqres.in/api/users";
 
   //private urlCountry : string = "http://pam-2020-a2and3webapi.herokuapp.com/api/languages";
 
    // Options object for POST and PUT requests
   private httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };

   // Error handler, from the Angular docs
   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Data service operations

  apiUserAccountAdd(newAccount: ApiUserAccount): Observable<ApiUserAccount> {
    return this.http.post<ApiUserAccount>(`${this.urlApi}/user-accounts/register`, newAccount, this.httpOptions)
      .pipe(
        tap((newAccount: ApiUserAccount) => console.log(`Added user account ${newAccount.username}`)),
        catchError(this.handleError<ApiUserAccount>('Account add'))
      );
  }

  apiUserLogin(credentials: Credentials): Observable<any> {
    console.log(credentials);
    return this.http.post<any>(`${this.urlApi}/user-accounts/login`, credentials, this.httpOptions);
  }





}
