import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { URL } from '../../../shared/config';
import { Receta } from '../../recetas/interfaces/receta.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuSemanaService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  constructor(
    private _http: HttpClient
  ) { }

  getRecetasSemana(): Observable<any> {
    return this._http.get(`${URL}/recetas`)
      .pipe(
        map((data: any) => data.recetas.filter(receta => {
          return receta.menu === true;
        }))
      );
  }

  getIngredientesSemana(): Observable<any> {
    return this._http.get(`${URL}/recetas`)
      .pipe(
        map( (data: any) => {
          const ingredientes = [];
          data.recetas.forEach(receta => {
            if (receta.menu) {
              receta.ingredientes.forEach(ing => {
                ingredientes.push(ing);
              });
            }
          });

          return ingredientes;

        })
      );
  }

  limpiarMenu(): Observable<any> {
    return this._http.put(`${URL}/menu-semana/eliminar`, {headers: this.headers});
  }

  quitarRecetaMenu(id): Observable<any> {
    return this._http.put(`${URL}/menu-semana/eliminar/${id}`, {headers: this.headers});
  }

}
