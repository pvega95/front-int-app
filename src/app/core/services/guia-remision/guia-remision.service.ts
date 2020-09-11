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
    const query = `${this.url}/api/guia-remision/create`;
    const data = obj
    return this._http.post(query, data);
  }

  getGuiaRemision(postPerPage: number, currentPage: number): Observable<any>{
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`
    const query = `${this.url}/api/guia-remision/get-all` + queryParams;
    return this._http.get(query);
  }

  getByID(id:string): Observable<any>{
    const query = `${this.url}/api/guia-remision/get/${id}`
    return this._http.get(query);
  }

  setUpdateGuia(obj: any,id:string): Observable<any> {
    const query: string = `${this.url}/api/guia-remision/update/${id}`;
    const data = obj
    return this._http.put(query, data);
  }

  setDeleteById(id:string){
    const query = `${this.url}/api/guia-remision/${id}`
    return this._http.delete(query);
  }

  setGuiaRemisionTwo(obj): Observable<any>{
    const query = `${this.url}/api/guia-remision/createtwo`;
    const data = obj
    return this._http.post(query, data);
  }

  getPDF(id:number) {
    return this._http.getPDF(`${this.url}/api/guia-remision/get-pdf/${id}`)
      .pipe(map(data => { 
        return new Blob([data], { type: 'application/pdf'  }) 
      }))
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }
  
}
