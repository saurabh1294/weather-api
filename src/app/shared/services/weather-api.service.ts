import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // singleton service
})
export class WeatherAPIService {
  port = '3456';
  baseUrl = `http://localhost:${this.port}`;
  numRetries = 3;
  errorOutput;

  constructor(private http: HttpClient) {}

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.errorOutput.weatherDataOutput = errorMessage;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getWeatherData(data, model): Observable<any> {
    console.log('Request payload', data);
    this.errorOutput = model;
    return this.http.post<any>(`${this.baseUrl}/getWeatherData`, data).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
