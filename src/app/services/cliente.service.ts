import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { MtrClienteDto } from '../models/mtr-cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  basePath: string;
  accionPath: string;
  controller: string;
  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  ListClientesPorUsuario(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "ListClientesPorUsuario";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  ListContactosCliente(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "ListContactosCliente";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }


  ListDireccionesCliente(data): Observable<any> {
    this.controller = 'MtrClientes/';

    this.accionPath = "ListDireccionesCliente";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  GetAllSapTratamientoContacto(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "ListTratamientoContacto";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  ListGetAllSapCargoContacto(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "ListGetAllSapCargoContacto";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  GetAllSapDepartamentoContacto(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "ListGetAllSapDepartamentoContacto";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  ListGetAllSapPoderContacto(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "ListGetAllSapPoderContacto";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  CreateContactoAlTables(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "CreateContactoAlTables";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

  UpdateContactoAllTables(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "UpdateContactoAllTables";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }



  GetContactoById(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "GetContactoById";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }



  ListMunicipios(data): Observable<any> {
    this.controller = 'MtrClientes/';
    this.accionPath = "ListMunicipios";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe(
    );
  }

}
