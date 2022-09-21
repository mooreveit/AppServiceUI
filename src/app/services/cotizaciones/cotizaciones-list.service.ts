import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { GeneralService } from '../general.service';
import { AppGeneralQuotesGetDto } from '../../models/app-general-quotes-get-dto';
import { AppDetailQuotesGetDto } from 'src/app/models/app-detail-quotes-get-dto';
import { AppGeneralQuotesQueryFilter } from 'src/app/interfaces/App-General-Quotes-Query-Filter';

@Injectable({
    providedIn: 'root'
})
export class CotizacionesListService {

    basePath: string;
    accionPath: string;
    controller: string;
    direccionFacturarCliente$ = new ReplaySubject<any>();
    direccionEntregaCliente$ = new ReplaySubject<any>();

    public cotizacion$ = new ReplaySubject<any>();
    respuesta: Observable<AppGeneralQuotesGetDto>;

    allCotizaciones$ = new ReplaySubject<any>();
    allCompetidores$ = new ReplaySubject<any>();

    public precioLista: number;
    public precioListaProduccion: number;

    constructor(
        private http: HttpClient,
        private gensvc: GeneralService
    ) {
        this.basePath = gensvc.basePath;
        this.precioLista = 0
        this.precioListaProduccion = 0
    }


    getCotizacion$(): Observable<AppGeneralQuotesGetDto> {
        return this.cotizacion$.asObservable();
    }

    setCotizacion$(cotiza: any): void {
        this.cotizacion$.next(cotiza)
    }

    //----------------------GENERAL COTIZACION ------------------------//

    GetAllGeneralCotizacion(data): Observable<any> {


        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "GetAllAppGeneralQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }
    GetAllSimpleGeneralCotizacion(data): Observable<any> {


        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "GetAllSimpleAppGeneralQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    CopiarCotizacion(data): Observable<any> {


        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "CopiarGeneralQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    
    RetornarAGrabacion(data): Observable<any> {


        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "RegresarAGrabacionCotizacion";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }


    GetAllUnits(data): Observable<any> {

        this.controller = 'AppUnits/';
        this.accionPath = "GetAllAppUnits";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
    }

    InsertGeneralCotizacion(data): Observable<any> {

        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "InsertGeneralQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    DeleteGeneralCotizacion(data): Observable<any> {

        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "DeleteGeneralQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();


    }

    UpdateGeneralCotizacion(data): Observable<any> {

        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "UpdateGeneralQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
    }

    //--------------------------DETALLE DE COTIZACION --------------------------------//

    GetListaDetalleCotizacionPorGeneralId(data): Observable<any> {

        this.controller = 'AppDetailQuotes/';
        this.accionPath = "GetListAppDetailQuoteByAppGeneralQuotesId";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    InsertDetalleCotizacion(data): Observable<any> {

        this.controller = 'AppDetailQuotes/';
        this.accionPath = "InsertDetailQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    UpdateDetalleCotizacion(data): Observable<any> {

        this.controller = 'AppDetailQuotes/';
        this.accionPath = "UpdateDetailQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe()
    }


    DeleteDetalleCotizacion(data): Observable<any> {

        this.controller = 'AppDetailQuotes/';
        this.accionPath = "DeleteDetailQuotes";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    // ---------------------------- ENVIAR COTIZACION ADMINISTRADOR ----------------------- //

    EnviarAlCliente(data) {


        this.controller = 'AppGeneralQuotes/';
        this.accionPath = "EnviarAlCliente";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    // ---------------------------- GANAR PERDER COTIZACION ----------------------- //

    GetAllMotivoGanarPerder(data) {

        this.controller = 'MotivoGanarPerder/';
        this.accionPath = "MotivoGanarPerderGetAllFilter";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

    }

    GetAllCompetidorGanarPerder(data) {

        this.controller = 'Competidores/';
        this.accionPath = "GetByAllFilter";

        this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).subscribe(result => {

            this.allCompetidores$.next(result)
        })

    }

    UpdateGanarPerder(data) {

        this.controller = 'AppDetailQuotes/';
        this.accionPath = "GanarPerder";

        return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe()
    }


}
