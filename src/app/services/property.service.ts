import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'https://localhost:7141/api/Property';

  constructor(private http: HttpClient) {}

  postProperty(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  getProperties(page: number, size: number, filters: any): Observable<HttpResponse<any>> {
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());

    if (filters.title) {
      params = params.set('title', filters.title);
    }
    if (filters.numBedrooms) {
      params = params.set('numBedrooms', filters.numBedrooms.toString());
    }
    if (filters.numBathrooms) {
      params = params.set('numBathrooms', filters.numBathrooms.toString());
    }
    if (filters.hospitalsNearby !== null) {
      params = params.set('hospitalsNearby', filters.hospitalsNearby.toString());
    }
    if (filters.collegesNearby !== null) {
      params = params.set('collegesNearby', filters.collegesNearby.toString());
    }
    if (filters.petFriendly !== null) {
      params = params.set('petFriendly', filters.petFriendly.toString());
    }
    if (filters.balconyAvailable !== null) {
      params = params.set('balconyAvailable', filters.balconyAvailable.toString());
    }
    if (filters.parkingAreaAvailable !== null) {
      params = params.set('parkingAreaAvailable', filters.parkingAreaAvailable.toString());
    }
    if (filters.isCCTVAvailable !== null) {
      params = params.set('isCCTVAvailable', filters.isCCTVAvailable.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/all`, { observe: 'response', params });
  }

  getPropertyById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
