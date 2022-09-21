import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CobTransaccionesService {
  basePath: string;
  accionPath: string;
  controller: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  listCobTransaccionesEfectivo(data): Observable<any> {
    this.controller = 'CobTransacciones/';
    this.accionPath = "GetTransaccionesEfectivo";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  listCobTransaccionesRetenciones(data): Observable<any> {
    this.controller = 'CobTransacciones/';
    this.accionPath = "GetTransaccionesRetenciones";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  GetTransaccionesRetencionesById(data): Observable<any> {
    this.controller = 'CobTransacciones/';
    this.accionPath = "GetTransaccionesRetencionesById";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

}
