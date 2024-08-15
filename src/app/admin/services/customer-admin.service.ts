import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../../shared/User';
import { API_URL } from '../../../utils/API_URL';

@Injectable({
  providedIn: 'root'
})
export class CustomerAdminService {

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) { }

  private postSubject = new BehaviorSubject<User[]>([]);
  post$ = this.postSubject.asObservable();

  

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${API_URL}/api_admin/users`, { headers }).pipe(
      map(response => {
        const usersData = response.callback;
        return usersData.map((data: any) => new User(
          data._id,
          data.prenom,
          data.nom,
          data.username,
          data.email,
          data.password,
        ));
      })
    );
  }

  getTotalUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${API_URL}/api_admin/countUsers`, { headers }).pipe(
      map(response => {
        const totalUsers = response.callback;
        return totalUsers
      })
    );
  }

  deleteUser(userId:string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.delete<any>(`${API_URL}/api_admin/deleteUser/${userId}`, { headers }).pipe(
      catchError(error => {
        // Gérez l'erreur ici, par exemple, en enregistrant l'erreur ou en retournant une observable d'erreur
        console.error('Erreur lors de la suppression du commentaire:', error);
        return throwError(error);
      })
    );
  }
}
