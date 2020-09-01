import { Injectable } from '@angular/core';
import { HttpClienteService } from '../http-cliente.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartaService {
  private url = environment.url_API;

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  setCart(obj): Observable<any> {
    const query = `${this.url}/api/letter-fiscal/create`;
    const data = obj
    return this._http.post(query, data);
  }

  setCartTwo(obj): Observable<any> {
    const query = `${this.url}/api/letter-fiscal/createtwo`;
    const data = obj
    return this._http.post(query, data);
  }

  getCart(): Observable<any> {
    const query = `${this.url}/api/letter-fiscal/getCarta`;
    return this._http.get(query);
  }

  setDeleteById(id: string) {
    const query = `${this.url}/api/letter-fiscal/${id}`
    return this._http.delete(query);
  }

  getByID(id: string): Observable<any> {
    const query = `${this.url}/api/letter-fiscal/get/${id}`
    return this._http.get(query);
  }

  setUpdateCarta(obj: any, id: string): Observable<any> {
    const query: string = `${this.url}/api/letter-fiscal/update/${id}`;
    const data = obj
    return this._http.put(query, data);
  }

  getPDF(id: number) {
    return this._http.getPDF(`${this.url}/api/letter-fiscal/get-pdf/${id}`)
      .pipe(map(data => {
        return new Blob([data], { type: 'application/pdf' })
      }))
  }

  getPDFTwo(id: number) {
    return this._http.getPDF(`${this.url}/api/letter-fiscal/get-pdf-two/${id}`)
      .pipe(map(data => {
        return new Blob([data], { type: 'application/pdf' })
      }))
  }


  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  /**
    * @function generateDocx
    * funcion que genera el archivo en word
    */
  generateDocx(obj) {
    const data = obj
    return this._http.getDOCX(`${this.url}/api/letter-fiscal/get-docx`,data)
      .pipe(map(data => {
        return new Blob([data], {type: 'application/msword'})
      }))
  }

}
