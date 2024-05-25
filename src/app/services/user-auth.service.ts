import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private apiUrl = 'https://localhost:7141/api/User'; // Adjust according to your API URL
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  validateCredentials(email: string, password: string): Observable<{data: string, error?: string}> {
    const credentials = { email, password };
    return this.http.post<{data: string, error?: string}>(`${this.apiUrl}/validate-credentials`, credentials);
  }

  createAccount(accountData: any): Observable<{isSuccess: boolean, data: any, errors: any}> {
    return this.http.post<{isSuccess: boolean, data: any, errors: any}>(`${this.apiUrl}`, accountData);
  }

  loginSuccess(userId: string): void {
    console.log('User logged in: ' + userId);
    localStorage.setItem('userId', userId);
    const storedUserId = localStorage.getItem('userId');
    console.log('Stored userId:', storedUserId);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.loggedIn.next(false);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('userId');
  }
  isUserLoggedIn(): boolean {
    return this.hasToken();
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${userId}`);
  }
}
