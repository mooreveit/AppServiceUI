import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {

  private basePath: string;
  private controller: string;
  private accionPath: string;

  allIngredients$ = new ReplaySubject<any>();


  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }


  GetAllAppIngredients(data): void {

    this.controller = 'AppIngredients/';
    this.accionPath = "GetAllAppIngredients";

    this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).subscribe(result => {

      this.allIngredients$.next(result);

    });



  }


  Create(data): Observable<any> {

    this.controller = 'AppIngredients/';
    this.accionPath = "CreateAppIngredient";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }
  Update(data): Observable<any> {

    this.controller = 'AppIngredients/';
    this.accionPath = "UpdateAppIngredient";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }
  Delete(data): Observable<any> {

    this.controller = 'AppIngredients/';
    this.accionPath = "DeteAppIngredient";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

}
