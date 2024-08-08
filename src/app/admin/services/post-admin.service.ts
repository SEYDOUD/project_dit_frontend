import { Injectable } from '@angular/core';
import { Post } from '../../../shared/Post';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostAdmin } from '../../../shared/PostAdmin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostAdminService {

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) { }

  private postSubject = new BehaviorSubject<Post[]>([]);
  post$ = this.postSubject.asObservable();

  

  getPosts(): Observable<PostAdmin[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>("http://localhost:5000/api_admin/posts", { headers }).pipe(
      map(response => {
        const postsData = response.callback;
        // console.log(commentsData)

        return postsData.map((data: any) => new PostAdmin(
          data._id,
          data.idUser,
          data.username,
          data.message,
        ));
      })
    );
  }

  getTotalPosts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>("http://localhost:5000/api_admin/countPosts", { headers }).pipe(
      map(response => {
        const totalPost = response.callback;
        return totalPost
      })
    );
  }

  deletePost(postId:string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.delete<any>(`http://localhost:5000/api_admin/deletePost/${postId}`, { headers }).pipe(
      catchError(error => {
        // Gérez l'erreur ici, par exemple, en enregistrant l'erreur ou en retournant une observable d'erreur
        console.error('Erreur lors de la suppression du commentaire:', error);
        return throwError(error);
      })
    );
  }
}
