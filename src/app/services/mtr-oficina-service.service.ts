import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/Operators';
import { IUsuario } from '../interfaces/iusuario';
@Injectable({
  providedIn: 'root'
})
export class MtrOficinaServiceService {
  basePath: string;
  accionPath: string;
  controller: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }



  GetAllOficinas(data): Observable<any> {
    this.controller = 'MtrOficina/';
    this.accionPath = "GetAllOficinas";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }





}
