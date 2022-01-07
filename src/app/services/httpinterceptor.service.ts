import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from "@angular/router";
 

@Injectable()
export class HttpInterceptorService{

    constructor(public router: Router) {
    }
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      return next.handle(req).pipe(
        catchError((error) => {
          console.log('Error is intercepted')
          console.error(error);
          return throwError(error.message);
        })
      )
    }
}