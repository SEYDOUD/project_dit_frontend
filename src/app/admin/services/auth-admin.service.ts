import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLog } from '../../../shared/UserLog';
import { Observable } from 'rxjs';
import { API_URL } from '../../../utils/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(
    private _http: HttpClient,
    private router: Router,

  ) { }

  private getStandardOptions(): any{
    return{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        credentials: 'include'
      })
    }
  }

  loginAdmin(credentials: UserLog): Observable<any> {
    const options = this.getStandardOptions();
    return this._http.post(`${API_URL}/api_admin/login`, credentials, options)
  }
}
