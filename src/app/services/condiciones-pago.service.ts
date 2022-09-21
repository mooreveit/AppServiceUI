import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CondicionesPagoService {

  
  basePath: string;
  accionPath: string;
  controller: string;

  constructor(
              private http: HttpClient,
              private gensvc: GeneralService) 
              {
                this.basePath = gensvc.basePath
              }

  GetAllCondicionPago(data): Observable<any> {
    this.controller = 'MtrCondicionPago/';
    this.accionPath = "GetAll";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

}
