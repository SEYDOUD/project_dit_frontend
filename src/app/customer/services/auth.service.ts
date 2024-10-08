import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserLog } from '../../../shared/UserLog';
import { ApiResponse } from '../../../shared/ApiResponse';
import { User } from '../../../shared/User';
import { API_URL } from '../../../utils/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  loginCustomer(credentials: UserLog): Observable<any> {
    const options = this.getStandardOptions();
    return this._http.post(`${API_URL}/api/login`, credentials, options)
  }

  registerCustomer(credentials: User): Observable<any> {
    const options = this.getStandardOptions();
    return this._http.post(`${API_URL}/api/register`, credentials, options)
  }

  

}
