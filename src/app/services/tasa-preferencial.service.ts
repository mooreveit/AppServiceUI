import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

import { TasaPreferencialQueryFilter } from '../interfaces/tasa-preferencial-query-filter';
import { getLocaleDateTimeFormat } from '@angular/common';
import { TPaTasaReferencialGetDto } from '../models/t-pa-tasa-referencial-get-dto';

@Injectable({
  providedIn: 'root'
})
export class TasaPreferencialService {
    
    tasa$ = new ReplaySubject<any>();
    
    basePath: string;
    accionPath: string;
    controller: string;
    
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

    GetTasa(): Observable<any> {
      
        let data: any;
        let fechaActual = new Date();    
        let tasaPreferencialQueryFilter: TasaPreferencialQueryFilter;
        //let tPaTasaReferencialGetDto: TPaTasaReferencialGetDto;

        tasaPreferencialQueryFilter = {
            fechaTasa: fechaActual
        };

        data = tasaPreferencialQueryFilter

        this.controller = 'TPaTasaReferencial/';

        this.accionPath = "GetTasaReferecial";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
  
    }

}
