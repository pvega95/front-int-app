import { Injectable } from '@angular/core';
import { HttpClienteService } from '../http-cliente.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private url = environment.url_API;

  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  findByRegex(nameCollection: 'proceso'|'carta'|'guia' , regex:string, postPerPage?: number, currentPage?: number): Observable<any> {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`
    const query = `${this.url}/api/todo/coleccion/${nameCollection}/${regex}` + queryParams;
    return this._http.get(query);
  }

}
