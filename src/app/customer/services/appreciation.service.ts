import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from '../../../utils/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AppreciationService {

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) { }

  changeAppreciation(postId:string,data: any): Observable<any> {
    const token = localStorage.getItem('authorization');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // N'ajoutez pas l'en-tête Content-Type ici car Angular le définira automatiquement sur multipart/form-data lors de l'utilisation de FormData
      return this._http.put<any>(`${API_URL}/api/appreciation/edit/${postId}`, data, { headers: headers });
    } else {
      alert('Veuillez vous connecter');
      return new Observable();
      // return throwError('Token JWT introuvable dans les cookies.');
    }
  }
}
