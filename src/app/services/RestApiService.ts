import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { apiResponseModel } from '../models/apiResponse.model';
@Injectable({
  providedIn: 'root',
})
export class restApiService {
  // Define API
  apiURL = 'http://localhost:64773/api';
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch employees list
  getUsers() {
    return this.http.get<apiResponseModel>(this.apiURL + '/users/list');
  }

  addUser(model: any) {
    return this.http.post<apiResponseModel>(this.apiURL + '/users/create', JSON.stringify(model), this.httpOptions);
  }
 
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}