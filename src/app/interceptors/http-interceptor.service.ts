import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';

@Injectable({providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {

    constructor() { }

    //Cualquier peticion HTTP que lance la aplicación pasa por aqui.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('Token'),            
            'Content-type': 'application/json',
        });

        const reqClone = req.clone({
            headers
        });
              
        return next.handle(reqClone).pipe(
            //se puede usar pipe, map, retry, etc
            catchError(this.handleError)
        );
    }


    handleError(error: HttpErrorResponse) {        
        
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error ocurred
            console.log("A client-side or network error ocurred")
            console.error('An error ocrred:', error.error.message);
        }
        else
        {
            // The Backend returned an unsuccessfulcode
            console.log("The Backend returned an unsuccessfulcode")

            console.error('Backend returned code:' + error.status);

            console.error('Error body is: ' + error.error);
        }

        // return and observable with using-facing error message        
        return throwError(
            'Something bad happened; please try again later'
        );

    }
    
}
