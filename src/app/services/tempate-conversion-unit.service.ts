import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TempateConversionUnitService {

  private basePath: string;
  private controller: string;
  private accionPath: string;

  allTemplateConversionUnit$ = new ReplaySubject<any>();
  templateConversionUnit$ = new ReplaySubject<any>();

  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  GetAllAppTemplateConversionUnit(data): void {

    this.controller = 'AppTemplateConversionUnit/';
    this.accionPath = "GetAllTemplateConversionUnit";

    this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).subscribe(result => {

      this.allTemplateConversionUnit$.next(result);

    });



  }

  Update(data): Observable<any> {

    this.controller = 'AppTemplateConversionUnit/';
    this.accionPath = "UpdateTemplateConversionUnit";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

  Create(data): Observable<any> {

    this.controller = 'AppTemplateConversionUnit/';
    this.accionPath = "CreateTemplateConversionUnit";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

  Delete(data): Observable<any> {

    this.controller = 'AppTemplateConversionUnit/';
    this.accionPath = "DeleteTemplateConversionUnit";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

}
