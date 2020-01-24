import { Injectable } from '@angular/core';
import { HttpClienteService } from '../http-cliente.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaService {
  private url = environment.url_API;
  
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  setCart(obj): Observable<any>  {
    console.log('obj',obj)
    const query = `${this.url}/api/letter-fiscal/create`;
    const data = obj
    return this._http.post(query, data);
  }
}
