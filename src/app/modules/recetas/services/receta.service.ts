import { URL } from './../../../shared/config';
import { Receta } from './../interfaces/receta.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  URL;

  constructor(
    private _http: HttpClient
  ) { }

  addReceta(receta: Receta): Observable<any> {
    const params = JSON.stringify(receta);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(params);
    return this._http.post(`${URL}/receta`, params, {headers: headers});
  }

  getRecetas(): Observable<any> {
    return this._http.get(`${URL}/recetas`);
  }
}
