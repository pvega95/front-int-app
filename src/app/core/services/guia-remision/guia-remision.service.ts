import { Injectable } from '@angular/core';
import { HttpClienteService } from '../http-cliente.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiaRemisionService {
  private url = environment.url_API
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  setGuiaRemision(obj): Observable<any>  {
    console.log('obj',obj)
    const query = `${this.url}/api/guia-remision/create`;
    const data = obj
    return this._http.post(query, data);
  }

  getGuiaRemision(): Observable<any>{
    const query = `${this.url}/api/guia-remision/get-all`
    return this._http.get(query);
  }
  
}
