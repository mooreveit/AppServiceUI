import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AppProductConversionService {

  basePath: string;
  accionPath: string;
  controller: string;

  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
}


GetAllByAppProduct(data): Observable<any> {

  this.controller = 'AppProductConversion/';
  this.accionPath = "GetAllByAppProduct";

  return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

}



}
