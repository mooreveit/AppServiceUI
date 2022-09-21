import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RepeticionesService {
  private basePath: string;
  private controller: string;
  private accionPath: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }


  GetAllRepeticiones(data): Observable<any> {

    this.controller = 'AppOrdenProductoRepeticion/';
    this.accionPath = "GetAllFilter";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }
}
