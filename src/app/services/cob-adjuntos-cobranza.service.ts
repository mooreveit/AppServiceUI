import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';


@Injectable({providedIn: 'root'})
export class CobAdjuntosCobranzaService {
    //usuario: IUsuario;
    basePath: string;
    accionPath: string;
    controller: string;
   
    constructor(private http: HttpClient, private gensvc: GeneralService) { 
        this.basePath = gensvc.basePath;        
    }
    
    GetAdjuntos(): Observable<any> {

        this.controller = 'CobAdjuntosCobranza/GetAllAdjuntosCobranza/';

        let params = {
            "PageSize": "10",
            "PageNumber": "1"
        }

        return this.http.post<any>(this.basePath + this.controller, params).pipe(
        );
    }

    GetAdjuntosByDcumento(data): Observable<any> {
        this.controller = 'CobAdjuntosCobranza/';
        this.accionPath = "GetAllAdjuntosCobranza";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
        );
    }
   

}
