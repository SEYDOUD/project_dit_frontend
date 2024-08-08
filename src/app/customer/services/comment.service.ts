import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) { }

  addComment(postId: string,data: any): Observable<any> {
    const token = localStorage.getItem('authorization');
    console.log("ici c est la data:",data)
    if (token) {
      // Créez une nouvelle instance de FormData pour envoyer les données
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      // N'ajoutez pas l'en-tête Content-Type ici car Angular le définira automatiquement sur multipart/form-data lors de l'utilisation de FormData
      return this._http.post<any>(`http://localhost:5000/api/comment/create/${postId}`, data, { headers: headers });
    } else {
      alert('Veuillez vous connecter');
      return new Observable();
      // return throwError('Token JWT introuvable dans les cookies.');
    }
  }

  // changeAppreciation(postId: string,data: any): Observable<any> {
  //   const token = localStorage.getItem('authorization');
  //   console.log("ici c est la data:",data)
  //   if (token) {
  //     // Créez une nouvelle instance de FormData pour envoyer les données
  
  //     const headers = new HttpHeaders({
  //       'Authorization': `Bearer ${token}`
  //     });
  
  //     // N'ajoutez pas l'en-tête Content-Type ici car Angular le définira automatiquement sur multipart/form-data lors de l'utilisation de FormData
  //     return this._http.post<any>(`http://localhost:5000/api/comment/create/${postId}`, data, { headers: headers });
  //   } else {
  //     console.error('Token JWT introuvable dans les cookies.');
  //     return new Observable();
  //     // return throwError('Token JWT introuvable dans les cookies.');
  //   }
  // }
}
