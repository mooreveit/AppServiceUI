import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculoVariablesService {

 private basePath: string;
 private controller : string;
 private accionPath : string;

 allVariables$ = new ReplaySubject<any>();
   

  constructor(private http: HttpClient,private gensvc: GeneralService) {
     this.basePath = gensvc.basePath;
   }


   GetAllAppVariable(data): void{

    this.controller = 'AppVariables/';
    this.accionPath = "GetAllAppVariable";

    this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).subscribe(result =>{

      this.allVariables$.next(result);
   
    });

  } 

    InsertVariable(data):Observable<any> {

    this.controller = 'AppVariables/';
    this.accionPath = "CreateVariables";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();
  
  }

   UpdateVariable(data) : Observable<any> {

    this.controller = 'AppVariables/';
    this.accionPath = "UpdateVariables";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

  DeleteVariable(data):Observable<any>{

    this.controller = 'AppVariables/';
    this.accionPath = "DeleteVariables";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }


}
