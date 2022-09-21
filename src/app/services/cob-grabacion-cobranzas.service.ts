import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, of } from 'rxjs';
import { delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CobGrabacionCobranzasService {

  basePath: string;
  accionPath: string;
  controller: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  GetAllGrabacionCobranzas(data): Observable<any> {
    this.controller = 'CobGrabacionCobranzas/';
    this.accionPath = "GetAllGrabacionCobranza";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  
  insert(data): Observable<any> {
    this.controller = 'CobGrabacionCobranzas/';
    this.accionPath = "Insert";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  update(data): Observable<any> {
    this.controller = 'CobGrabacionCobranzas/';
    this.accionPath = "Update";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  delete(data): Observable<any> {
    this.controller = 'CobGrabacionCobranzas/';
    this.accionPath = "Delete";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  checkCotizacion(data){


    this.controller = 'OfdCotizacion/';
    this.accionPath = "ValidarCotizacionCliente";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    
    );

    
  }




  
}
