import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Post } from '../../../shared/Post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { API_URL } from '../../../utils/API_URL';

function formDataToJson(formData: FormData): any {
  const object: any = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return JSON.stringify(object);
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) { }

  private postSubject = new BehaviorSubject<Post[]>([]);
  post$ = this.postSubject.asObservable();

  

  getPosts(): Observable<Post[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${API_URL}/api/post/all`, { headers }).pipe(
      map(response => {
        const postsData = response.callback;
        
        return postsData.map((data: any) => new Post(
          data.id,
          data.message,
          data.img,
          data.user,
          data.appreciationTrueCount,
          data.appreciationFalseCount,
          data.commentCount,
        ));
      })
    );
  }

  

  addPost(data: any): Observable<any> {
    const token = localStorage.getItem('authorization');
    console.log("ici c est la data:",data)
    if (token) {
      // Créez une nouvelle instance de FormData pour envoyer les données
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      
  
      // N'ajoutez pas l'en-tête Content-Type ici car Angular le définira automatiquement sur multipart/form-data lors de l'utilisation de FormData
      return this._http.post<any>(`${API_URL}/api/post/create`, data, { headers: headers });
    } else {
      alert('Veuillez vous connecter');
      return new Observable();
      // return throwError('Token JWT introuvable dans les cookies.');
    }
  }

}