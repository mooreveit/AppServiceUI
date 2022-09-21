import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CobEstadoCuentaService {

  basePath: string;
  accionPath: string;
  controller: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  getEstadoCuenta(data): Observable<any> {
    this.controller = 'CobEstadoCuenta/';
    this.accionPath = "GetEstadoCuenta";
    console.log("estado cuenta base adress:--->", this.basePath);
    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }
}
