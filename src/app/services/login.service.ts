import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';

@Injectable({ providedIn: 'root' })
export class LoginService {

  basePath: string;
  accionPath: string;
  controller: string;

  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  login(data): Observable<IUsuario> {

    this.controller = 'Token/';

    this.accionPath = 'Login/';
    this.basePath = this.gensvc.basePath;
    console.log("en la llamada del servicio", this.basePath + this.controller);

    return this.http.post<IUsuario>(this.basePath + this.controller, JSON.stringify(data)).pipe();

  }

  GetMenu(data): Observable<any> {

    this.controller = 'Menu/';

    this.accionPath = 'GetMenu/';
    this.basePath = this.gensvc.basePath;
    console.log("en la llamada del servicio", this.basePath + this.controller);

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();


  }






}
