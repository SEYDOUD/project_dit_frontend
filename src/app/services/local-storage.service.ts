import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorageKey = 'authorization';

  constructor(
    private router: Router
  ) { }

  loginUser(token: string): void {
    // alert("token:"+token)
    localStorage.setItem(this.localStorageKey, token);
  }

  getCurrentUser(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.localStorageKey);
    }
    return null;
  }
  
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  logoutUser(): void {
    localStorage.removeItem(this.localStorageKey);
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  logoutAdmin(): void {
    localStorage.removeItem(this.localStorageKey);
    this.router.navigate(['admin/login']); // Redirect to login page after logout
  }
}