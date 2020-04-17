import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  private url = environment.url_API
  
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  setProcess(obj): Observable<any>  {
    console.log('obj',obj)
    const query = `${this.url}/api/process/create`;
    const data = obj
    return this._http.post(query, data);
  }

  getProcess(postPerPage: number, currentPage: number): Observable<any>{
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`
    const query = `${this.url}/api/process/get-all` + queryParams
    return this._http.get(query);
  }
  
  getTypeProcedure(): Observable<any>{
    const query = `${this.url}/api/type-procedure/get`
    return this._http.get(query);
  }

  getByID(id:string): Observable<any>{
    const query = `${this.url}/api/process/get/${id}`
    return this._http.get(query);
  }

  setUpdateProcess(obj: any,id:string): Observable<any> {
    const query: string = `${this.url}/api/process/update/${id}`;
    const data = obj
    return this._http.put(query, data);
  }

  setDeleteById(id:string){
    const query = `${this.url}/api/process/${id}`
    return this._http.delete(query);
  }

  getPDF() {
    return this._http.getPDF(`${this.url}/api/process/get-new-pdf`)
      .pipe(map(data => { 
        console.log('databuffer',data)
        return new Blob([data], { type: 'application/pdf'  }) 
      }))
  }

}
