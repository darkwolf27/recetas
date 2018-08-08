import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Receta } from '../../interfaces/receta.interface';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-buscar-recetas',
  templateUrl: './buscar-recetas.component.html',
  styleUrls: ['./buscar-recetas.component.scss']
})
export class BuscarRecetasComponent implements OnInit {

  recetas: Receta[];
  recetasIngredientes: Receta[];
  TotalRecetas: number;

  meGusta: boolean;
  busqueda: string;
  busq_ingredientes: boolean;


  constructor(
    private recetaSV: RecetaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe(params => {
        this.recetas = [];
        this.recetasIngredientes = [];
        this.busqueda = params['busqueda'];
        if (params['ingredientes'] === 'true') {
          this.busq_ingredientes = true;
        } else {
          this.busq_ingredientes = false;
        }
        this.recetaSV.buscarRecetas(this.busqueda)
          .subscribe(data => {
            this.recetas = data;
            if (this.busq_ingredientes) {
        this.recetaSV.buscarIngredientes(this.busqueda)
          .subscribe(recetas => {
            this.recetasIngredientes = recetas;
          });
      }
      });
    });
  }

  EliminarReceta(id) {
    this.recetaSV.deleteReceta(id)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  cambioFavorito(index, id, favorito: boolean) {
    this.recetas[index].favorito = favorito;
    this.recetaSV.favoritoReceta(id, favorito)
      .subscribe(data => console.log(data));
  }

  mostrarMensaje() {
    if (this.busq_ingredientes && this.recetasIngredientes.length === 0) {
      return true;
    }
  }

  mostrarTitulo() {
    if (this.busq_ingredientes && this.recetasIngredientes.length > 0) {
      return true;
    }
  }

}
