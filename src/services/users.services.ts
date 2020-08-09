import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {environment} from '../environments/environment';
import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = environment.API_URL ;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(User): Observable<User> {
    return this.httpClient.post<User>(this.apiServer + '/users/create', 
    JSON.stringify(User), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(id): Observable<User> {
    return this.httpClient.get<User>(`${this.apiServer}/users/get/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + '/users').pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiServer}/users/update/${id}`, JSON.stringify(User), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.get<User>(`${this.apiServer}/users/delete/${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}