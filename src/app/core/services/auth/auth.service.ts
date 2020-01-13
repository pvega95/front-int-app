import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.url_API
  constructor(
    public router: Router,
    private _http: HttpClienteService,
    // private _localStorageService:LocalStorageService,
    // private _encrDecrService:EncrDecrService,
  ) { }

  login(username,password): Observable<any>  {
    const query = `${this.url}/user/validate?username=${username}&password=${password}`;
    const data = ''
    return this._http.post(query, data);

    // ASI DEBERIA SER
    // const data = JSON.stringify({
    //   body: this._encrDecrService.set(obj)
    // });
    // return this._http.post(query, data);
  }

}