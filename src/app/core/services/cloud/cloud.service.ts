import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private url = environment.url_API;
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) {
    
   }

  setCloudDocument(obj): Observable<any>  {
    const query = `${this.url}/api/documento-cloud/create`;
    const data = obj
    return this._http.post(query, data);
  }

  getCloudDocumentById(id:string): Observable<any>{
    const query = `${this.url}/api/documento-cloud/get/${id}`
    return this._http.get(query);
  }

}
