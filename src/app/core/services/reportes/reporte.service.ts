import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private url = environment.url_API
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  processPerYear(): Observable<any> {
    const query = `${this.url}/api/process/per-year/`
    return this._http.get(query);
  }

  processPerTypeProcedure(): Observable<any> {
    const query = `${this.url}/api/process/per-typeProcedure/`
    return this._http.get(query);
  }

  processPerConclusion(): Observable<any> {
    const query = `${this.url}/api/letter-fiscal/per-conclusion/`
    return this._http.get(query);
  }

  processPerContratista(): Observable<any> {
    const query = `${this.url}/api/process/per-typeContratista/`
    return this._http.get(query);
  }

  processPerAnalist(): Observable<any> {
    const query = `${this.url}/api/letter-fiscal/per-analist/`
    return this._http.get(query);
  }

  processPerMonth(): Observable<any> {
    const query = `${this.url}/api/process/per-month/`
    return this._http.get(query);
  }

  processReport(): Observable<any> {
    const query = `${this.url}/api/report/get-process/`
    return this._http.get(query);
  }


}
