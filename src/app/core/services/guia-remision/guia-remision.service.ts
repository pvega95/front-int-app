import { Injectable } from '@angular/core';
import { HttpClienteService } from '../http-cliente.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuiaRemisionService {
  private url = environment.url_API;
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();
  
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

  setGuiaRemisionTwo(obj): Observable<any>  {
    const query = `${this.url}/api/guia-remision/createtwo`;
    const data = obj
    return this._http.post(query, data);
  }

  getPDF(id:number) {
    return this._http.getPDF(`${this.url}/api/guia-remision/get-pdf/${id}`)
      .pipe(map(data => { 
        console.log('databuffer',data)
        return new Blob([data], { type: 'application/pdf'  }) 
      }))
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }
  
}
