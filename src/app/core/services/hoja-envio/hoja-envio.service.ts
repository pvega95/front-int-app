import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HojaEnvioService {

  private url = environment.url_API
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();
  
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  setHojaEnvio(obj): Observable<any>  {
    const query = `${this.url}/api/hoja-envio/create`;
    const data = obj
    return this._http.post(query, data);
  }

  getHojaEnvio(): Observable<any>{
    const query = `${this.url}/api/hoja-envio/get-all`
    return this._http.get(query);
  }

  getByID(id:string): Observable<any>{
    const query = `${this.url}/api/hoja-envio/get/${id}`
    return this._http.get(query);
  }

  setUpdateHoja(obj: any,id:string): Observable<any> {
    const query: string = `${this.url}/api/hoja-envio/update/${id}`;
    const data = obj
    return this._http.put(query, data);
  }

  setDeleteById(id:string){
    const query = `${this.url}/api/hoja-envio/${id}`
    return this._http.delete(query);
  }

  setHojaEnvioTwo(obj): Observable<any>  {
    const query = `${this.url}/api/hoja-envio/createtwo`;
    const data = obj
    return this._http.post(query, data);
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  getPDF(id:number) {
    return this._http.getPDF(`${this.url}/api/hoja-envio/get-pdf/${id}`)
      .pipe(map(data => { 
        return new Blob([data], { type: 'application/pdf'  }) 
      }))
  }


}
