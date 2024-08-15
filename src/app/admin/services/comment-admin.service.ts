import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Comment } from '../../../shared/Comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../../../utils/API_URL';

@Injectable({
  providedIn: 'root'
})
export class CommentAdminService {

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) { }

  private postSubject = new BehaviorSubject<Comment[]>([]);
  post$ = this.postSubject.asObservable();

  

  getComments(): Observable<Comment[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${API_URL}/api_admin/comments`, { headers }).pipe(
      map(response => {
        const commentsData = response.callback;
        console.log("commentsData : ")

        return commentsData.map((data: any) => new Comment(
          data._id,
          data.idPost,
          data.username,
          data.message,
          data.status
        ));
      })
    );
  }

  getTotalComment(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${API_URL}/api_admin/countComments`, { headers }).pipe(
      map(response => {
        const totalComments = response.callback;
        // console.log(totalComments)
        return totalComments
      })
    );
  }

  getTotalNegativesComment(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${API_URL}/api_admin/countNegativeComments`, { headers }).pipe(
      map(response => {
        const totalComments = response.callback;
        // console.log(totalComments)
        return totalComments
      })
    );
  }

  deleteComment(commentId:string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.delete<any>(`${API_URL}/api_admin/deleteComment/${commentId}`, { headers }).pipe(
      catchError(error => {
        // Gérez l'erreur ici, par exemple, en enregistrant l'erreur ou en retournant une observable d'erreur
        console.error('Erreur lors de la suppression du commentaire:', error);
        return throwError(error);
      })
    );
  }

}
