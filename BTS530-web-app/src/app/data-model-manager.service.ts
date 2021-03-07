import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

import { ApiUserAccount, ApiGameGuide, ApiGuideComment } from "./data-model-classes";
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

  apiGameGuideGetByAuthor(author: string): Observable<ApiGameGuide[]> {
    return this.http.get<ApiGameGuide[]>(`${this.urlApi}/game-guides/by-author/${author}`);
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

  apiGameGuideAddComment(id: string, newGuideComment: ApiGuideComment): Observable<ApiGuideComment> {
    return this.http.post<ApiGuideComment>(`${this.urlApi}/game-guides/${id}/add-comment`, newGuideComment, this.httpOptions)
      .pipe(
        tap((newGuideComment: ApiGuideComment) => console.log(`Added game guide `,{newGuideComment})),
        catchError(this.handleError<ApiGuideComment>('Comment add'))
      );
  }

  apiCommentGuideDeleteComment(id: string): Observable<ApiGuideComment> {
    return this.http.delete<ApiGuideComment>(`${this.urlApi}/game-guides/delete-comment/${id}`);
  }

 

}


