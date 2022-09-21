import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private basePath: string;
  private controller: string;
  private accionPath: string;

  //allRecipes$ = new ReplaySubject<any>();


  constructor(private http: HttpClient, private gensvc: GeneralService) {
    this.basePath = gensvc.basePath;
  }

  /* GetAllRecipes(data): void {

    this.controller = 'AppRecipes/';
    this.accionPath = "GetRecipesGetDtoByProductId";

    this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).subscribe(result => {

      this.allRecipes$.next(result);

    });



  } */

  GetAllRecipesNew(data): Observable<any> {

    this.controller = 'AppRecipes/';
    this.accionPath = "GetRecipesGetDtoByProductId";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();



  }


  Create(data): Observable<any> {

    this.controller = 'AppRecipes/';
    this.accionPath = "CreateAppRecipes";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

  Update(data): Observable<any> {

    this.controller = 'AppRecipes/';
    this.accionPath = "UpdateAppRecipes";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }
  Delete(data): Observable<any> {

    this.controller = 'AppRecipes/';
    this.accionPath = "DeleteAppRecipes";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }

  CopyRecipes(data): Observable<any> {

    this.controller = 'AppRecipes/';
    this.accionPath = "CopyRecipes";

    return this.http.post<any>(this.basePath + this.controller + this.accionPath, JSON.stringify(data)).pipe();

  }



}
