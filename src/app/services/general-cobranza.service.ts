import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralCobranzaService {
  basePath: string;
  accionPath: string;
  controller: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  GetAllGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "GetAllGeneralCobranzas";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  GetGeneralCobranzaPendienteVerificarPago(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "GetGeneralCobranzaPendienteVerificarPago";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  GetGeneralCobranzaPendienteAprobarPago(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "GetGeneralCobranzaPendienteAprobarPago";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  GetAllGeneralCobranzasByDocumento(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "GetGeneralCobranzasByDocumento";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  UpdateGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "Update";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  InsertGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "Insert";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  DeleteGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "Delete";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  EnviarAdmonGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "EnviarAdmon";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  ConfirmarPagonGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "ConfirmarPago";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  DevolverPagoGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "DevolverPagoGeneralCobranzas";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
  AprobarPagonGeneralCobranzas(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "AprobarPagonGeneralCobranzas";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  AnularCobranza(data): Observable<any> {
    this.controller = 'GeneralCobranzas/';
    this.accionPath = "AnularCobranza";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  GetAllGeneralCotizacion(data): Observable<any> {
    this.controller = 'AppGeneralQuotes/';
    this.accionPath = "GetAllAppGeneralQuotes";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  GetAllCondicionPago(data): Observable<any> {
    this.controller = 'MtrCondicionPago/';
    this.accionPath = "GetAll";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }


}
