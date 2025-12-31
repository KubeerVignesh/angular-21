import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, AuthResponse, LoginRequest, SignupRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth';
  
  // Signals for reactive state management
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);
  
  constructor() {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  /**
   * Sign up a new user
   */
  signup(data: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data).pipe(
      tap(response => {
        if (response.success) {
          this.handleAuthSuccess(response);
        }
      })
    );
  }

  /**
   * Login user
   */
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        if (response.success) {
          this.handleAuthSuccess(response);
        }
      })
    );
  }

  /**
   * Get current user profile
   */
  getMe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      tap(response => {
        if (response.success) {
          this.currentUser.set(response.data.user);
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Check if user is authenticated
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    const { user, token } = response.data;
    
    // Store token and user in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Update signals
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  /**
   * Load user from localStorage on app init
   */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        console.error('Error parsing user from storage:', error);
        this.logout();
      }
    }
  }
}

