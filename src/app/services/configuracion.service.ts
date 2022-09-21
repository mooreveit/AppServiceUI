import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, ReplaySubject } from 'rxjs';
import { AppConfigGetDto } from '../models/app-config-get-dto';


@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private basePath: string;
  private controller : string;
  private accionPath : string;

  allConfig$ = new ReplaySubject<any>();

  constructor(private http: HttpClient,private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  GetAllAppConfig(data): void{

    this.controller = 'AppConfigApp/';
    this.accionPath = "AppConfigAppGetAllFilter";

    this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).subscribe(result => {

      this.allConfig$.next(result.data);
   
    });

  }
  
  InsertConfig(data):Observable<any> {

    this.controller = 'AppConfigApp/';
    this.accionPath = "CreateAppConfig";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
  
  }

  UpdateConfig(data):Observable<any> {

    this.controller = 'AppConfigApp/';
    this.accionPath = 'UpdateAppConfig';

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
  
  }

  DeleteConfig(data):Observable<any>{

    this.controller = 'AppConfigApp/';
    this.accionPath = 'DeleteAppConfig';

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

  getParametrosMaquina():Observable<any> {

    this.controller = 'AppConfigApp/';
    this.accionPath = 'GetParametrosMaquina';

    return this.http.get<any>(this.basePath + this.controller + this.accionPath).pipe();
  
  }

}
