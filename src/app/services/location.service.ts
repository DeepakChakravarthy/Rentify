import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'https://localhost:7141/api/Location';

  constructor(private http: HttpClient) {}

  getStates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/State`);
  }

  getCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Cities`);
  }
}
