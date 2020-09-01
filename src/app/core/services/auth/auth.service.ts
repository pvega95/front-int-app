import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { environment } from '@env/environment';
import { LocalStorageService } from '@core/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.url_API
  private token :string;
  constructor(
    public router: Router,
    private _http: HttpClienteService,
    private _localStorageService:LocalStorageService,
  ) {
    this.token = this.getToken();
   }

  getToken(): string {
    const tokenEncr = this._localStorageService.getItem('token');
    return (tokenEncr)?tokenEncr:null;
  }

  setToken(token: string) {
    this._localStorageService.setItem('token', token);
    this.token = this.getToken();
  }

  removeToken() {
    this._localStorageService.removeItem('token');
    this.token = this.getToken();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null
  }

  login(obj): Observable<any>  {
    const query = `${this.url}/api/users/signUp`;
    const data = obj
    return this._http.post(query, data);
  }

  signIn(obj): Observable<any>  {
    const query = `${this.url}/api/users/signIn`;
    const data = obj
    return this._http.post(query, data);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login']);
  }

}
