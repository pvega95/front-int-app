import { Injectable } from '@angular/core';
import { HttpClienteService } from '../http-cliente.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MantenimientoService {
  private url = environment.url_API;

  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  getAnalista(): Observable<any> {
    const query = `${this.url}/api/analista/listar`;
    return this._http.get(query);
  }

  getConclusion(): Observable<any> {
    const query = `${this.url}/api/conclusion/listar`;
    return this._http.get(query);
  }

  getTipoDocumento(): Observable<any> {
    const query = `${this.url}/api/tipo-documento/listar`;
    return this._http.get(query);
  }

  getTipoContratista(): Observable<any> {
    const query = `${this.url}/api/tipo-contratista/listar`;
    return this._http.get(query);
  }

  getTipoEmpresa(): Observable<any> {
    const query = `${this.url}/api/tipo-empresa/listar`;
    return this._http.get(query);
  }

  crearTipoEmpresa(obj: any): Observable<any> {
    const query = `${this.url}/api/tipo-empresa/crear`;
    const data = obj
    return this._http.post(query, data);
  }

  getTipoEmpresaById(id: string): Observable<any> {
    const query = `${this.url}/api/tipo-empresa/${id}`;
    return this._http.get(query);
  }

  eliminarTipoEmpresa(id: string) {
    const query = `${this.url}/api/tipo-empresa/${id}`
    return this._http.delete(query);
  }

  actualizarTipoEmpresa(obj: any, id: string): Observable<any> {
    const query = `${this.url}/api/tipo-empresa/${id}`;
    const data = obj;
    return this._http.put(query, data);
  }

}
