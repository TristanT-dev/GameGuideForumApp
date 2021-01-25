import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

import { ApiUserAccount, ApiGameGuide, ApiGuideComment, ApiForum } from "./data-model-classes";
//import { ConsoleReporter } from 'jasmine';



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

  /*apiUserLogin(credentials: Credentials): Observable<any> {
    console.log(credentials);
    return this.http.post<any>(`${this.urlApi}/user-accounts/login`, credentials, this.httpOptions);
  }*/

  apiGameGuideGetAll(): Observable<ApiGameGuide[]> {
    return this.http.get<ApiGameGuide[]>(`${this.urlApi}/game-guides/all`);
  }

  apiGameGuideGetSome(word: string): Observable<ApiGameGuide[]> {
    word = encodeURIComponent(word);
    return this.http.get<ApiGameGuide[]>(`${this.urlApi}/game-guides/by-short-title/${word}`);
  }

  apiGameGuideGetById(id: string): Observable<ApiGameGuide> {
    return this.http.get<ApiGameGuide>(`${this.urlApi}/game-guides/by-id/${id}`);
  }

  apiGameGuideAdd(newGuide: ApiGameGuide): Observable<ApiGameGuide> {
    return this.http.post<ApiGameGuide>(`${this.urlApi}/game-guides/add`, newGuide, this.httpOptions)
      .pipe(
        tap((newGuide: ApiGameGuide) => console.log(`Added game guide ${newGuide.shortTitle}`)),
        catchError(this.handleError<ApiGameGuide>('Guide add'))
      );
  }

  apiGameGuideEdit(id: string, updatedGuide: ApiGameGuide): Observable<ApiGameGuide> {
    return this.http.put<ApiGameGuide>(`${this.urlApi}/game-guides/edit/${id}`, updatedGuide, this.httpOptions)
      .pipe(
        tap((updatedItem: ApiGameGuide) => console.log(`Edited guide ${updatedGuide.shortTitle}`)),
        catchError(this.handleError<ApiGameGuide>('Guide edit'))
      );
      }

//Forum


//GetAll
apiForumGetAll(): Observable<ApiForum[]> {
  return this.http.get<ApiForum[]>(`${this.urlApi}/forums/all`);
}
apiForumGetSome(word: string): Observable<ApiForum[]> {
  word = encodeURIComponent(word);
  return this.http.get<ApiForum[]>(`${this.urlApi}/forums/by-short-title/${word}`);
}

//Get by ID
apiForumByID(id:string): Observable<ApiForum>{
  return this.http.get<ApiForum>(`${this.urlApi}/forums/id/${id}`);
}

//Add Forum
apiForumAdd(newForum: ApiForum): Observable<ApiForum> {
  return this.http.post<ApiForum>(`${this.urlApi}/forums/add`, newForum, this.httpOptions)
    .pipe(
      tap((newForum: ApiForum) => console.log(`Added new Forum ${newForum._id}`)),
      catchError(this.handleError<ApiForum>('Forum add'))
    );
}
}


