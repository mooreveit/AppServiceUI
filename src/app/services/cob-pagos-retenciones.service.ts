import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CobPagosRetencionesService {

  basePath: string;
  accionPath: string;
  controller: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  GetAllCobPagosRetenciones(data): Observable<any> {
    this.controller = 'CobPagosRetenciones/';
    this.accionPath = "GetAllCobPagosRetenciones";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  insert(data): Observable<any> {
    this.controller = 'CobPagosRetenciones/';
    this.accionPath = "Insert";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  update(data): Observable<any> {
    this.controller = 'CobPagosRetenciones/';
    this.accionPath = "Update";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  delete(data): Observable<any> {
    this.controller = 'CobPagosRetenciones/';
    this.accionPath = "Delete";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

}
