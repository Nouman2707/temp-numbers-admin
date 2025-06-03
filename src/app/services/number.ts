import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PhoneNumber } from '../models/number';

@Injectable({
  providedIn: 'root'
})
export class NumberService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getNumbers(): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>(`${this.apiUrl}/numbers`).pipe(
      catchError(this.handleError)
    );
  }

  updateNumberStatus(id: number, status: 'active' | 'inactive'): Observable<PhoneNumber> {
    return this.http.patch<PhoneNumber>(`${this.apiUrl}/numbers/${id}`, { status }).pipe(
      map(response => ({
        ...response,
        status: status // Ensure the status is set correctly
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
