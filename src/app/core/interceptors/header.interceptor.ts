import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from '@core/services/auth/auth.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    
    constructor(private inj: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if the request has "Authorization" we return the request
        if (req.headers.has('Authorization')) {
            return next.handle(req);
        }

        // I get here the AuthService
        const tok = this.inj.get(AuthService);

        const authHeader = tok.getToken();

        if (tok.isLoggedIn()) {
            if(!this.ignoreUrl(req.url)){
                const dupReq = req.clone({
                    headers: req.headers
                        .set('Content-Type', 'application/json; charset=utf-8')
                        .set('Authorization', `Bearer ${authHeader}`)
                });
                return next.handle(dupReq);
            }else{
                const dupReq = req.clone({
                    headers: req.headers
                        .set('Content-Type', 'application/json; charset=utf-8')
                });
                return next.handle(dupReq);
            }
        } else {
            const dupReq = req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/json; charset=utf-8')
            });
            return next.handle(dupReq);
        }
    }
    ignoreUrl(url){
        let respuesta:boolean= false;
        let urlsIgnore = [
            "https://api.cloudinary.com/v1_1/firbix/delete_by_token",
            "https://qa-back-admin.firbid.com/cpf/user-answer/"
        ];

        urlsIgnore.forEach(el => {
            if(el == url){
                respuesta = true;
            }
        });
        return respuesta;
    }
}
