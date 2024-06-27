import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = `${environment.apiUrl}/api/save-email`;

  constructor(private http: HttpClient) {}

  saveEmail(email: string): Observable<any> {
    console.log('Sending request to:', this.apiUrl);
    return this.http.post(this.apiUrl, { email });
  }
}