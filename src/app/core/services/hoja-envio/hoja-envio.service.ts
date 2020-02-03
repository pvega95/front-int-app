import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HojaEnvioService {

  private url = environment.url_API
  
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  setHojaEnvio(obj): Observable<any>  {
    console.log('obj',obj)
    const query = `${this.url}/api/hoja-envio/create`;
    const data = obj
    return this._http.post(query, data);
  }

  getHojaEnvio(): Observable<any>{
    const query = `${this.url}/api/hoja-envio/get-all`
    return this._http.get(query);
  }

}
