import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { AppUnitsGetDto } from '../models/app-units-get-dto';

@Injectable({
    providedIn: 'root'
})
export class UnidadesMedidaService {

    basePath: string;
    accionPath: string;
    controller: string;

    constructor(private http: HttpClient, private gensvc: GeneralService) {
        this.basePath = gensvc.basePath;
    }

    GetAllAppUnits(data): Observable<any> {

        this.controller = 'AppUnits/';

        this.accionPath = "GetAllAppUnits";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
    }

    GetAppUnitsWithConversion(data): Observable<any> {

        this.controller = 'AppUnits/';

        this.accionPath = "GetAppUnitsWithConversion";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
    }

}
