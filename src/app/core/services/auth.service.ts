import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, AuthResponse, LoginRequest, SignupRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth';

  // Signals for reactive state management
  currentUser = signal<User | null>(null);

  /**
   * Sign up a new user
   */
  signup(data: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data);
  }

  /**
   * Login user
   */
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  /**
   * Get current user profile
   */
  getMe(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }

  /**
   * Update user profile
   */
  updateProfile(data: Partial<User>): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };
    return this.http.put<any>(`${this.apiUrl}/updatedetails`, data, { headers });
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUser();
  }

  /**
   * Get the token from local storage
   */
  private getToken(): string | null {
    return localStorage.getItem('token');
  }
}
