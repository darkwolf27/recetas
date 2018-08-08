import { Receta } from './../interfaces/receta.interface';
import { URL } from '../../../shared/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuitarAcentos } from '../../../shared/funciones';


@Injectable({
  providedIn: 'root'
})
export class RecetaService {

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

  getReceta(id): Observable<any> {
    return this._http.get(`${URL}/receta/${id}`);
  }

  updateReceta(id, receta: Receta): Observable<any> {
    const params = JSON.stringify(receta);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put(`${URL}/receta/${id}`, params, {headers: headers});
  }

  deleteReceta(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.delete(`${URL}/receta/${id}`, {headers: headers});
  }

  favoritoReceta(id, favorito: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put(`${URL}/receta/${id}/${favorito}`, {headers: headers});
  }

  menuReceta(id, menu: boolean, persona: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put(`${URL}/receta/${id}/${menu}/${persona}`, {headers: headers});
  }

  buscarRecetas(busqueda): Observable<any> {
    /* const url = URL + '/receta-search?busqueda=' + busqueda;
    return this._http.get(url); */

    return this._http.get(`${URL}/recetas`)
    .pipe(
      map( (data: any) => data.recetas.filter(receta => {
        const filtrado = QuitarAcentos(receta.titulo);

        busqueda = QuitarAcentos(busqueda);

        return filtrado.includes(busqueda);
      }))
    );
  }

  buscarIngredientes(busqueda): Observable<any> {
    /* const url = URL + '/receta-search?busqueda=' + busqueda;
    return this._http.get(url); */

    return this._http.get(`${URL}/recetas`)
    .pipe(
      map( (data: any) => {

        busqueda = QuitarAcentos(busqueda);
        const busquedas = busqueda.split(' ');

        console.log(busquedas);

        const recetas: Receta[] = [];

        busquedas.forEach(clave => {
          data.recetas.forEach(receta => {
          let ok = false;
          receta.ingredientes.forEach(ing => {
            const ingrediente = QuitarAcentos(ing);
            if (ingrediente.includes(clave)) {
              ok = true;
            }
          });
          if (ok) {
            let contar = 0;
            recetas.forEach(rec => {
              if (rec.titulo === receta.titulo) {
                contar++;
              }
            });
            if (contar === 0) {
              recetas.push(receta);
            }
          }
          });
        });


        return recetas;
      }));
  }

}
