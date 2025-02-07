import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
}
    from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GuardInterceptor implements HttpInterceptor {
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        if (request.url.endsWith('/login')) {
            return next.handle(request); // Não aplicar o interceptor
        }
        const token = localStorage.getItem("token")
        request = request.clone({
         setHeaders: {
           Authorization: `Bearer ${token}`
         }
        });
        return next.handle(request);
       }
}