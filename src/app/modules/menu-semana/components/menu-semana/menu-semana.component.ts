import { Component, OnInit } from '@angular/core';
import { Receta } from '../../../recetas/interfaces/receta.interface';
import { MenuSemanaService } from '../../services/menu-semana.service';
import { Ingrediente } from '../../interfaces/ingrediente.interface';
import { RecetaService } from '../../../recetas/services/receta.service';


@Component({
  selector: 'app-menu-semana',
  templateUrl: './menu-semana.component.html',
  styleUrls: ['./menu-semana.component.scss']
})
export class MenuSemanaComponent implements OnInit {

  recetas: Receta[];
  Ingredientes: Ingrediente[];
  selectedOptionsIngredientes;

  constructor(
    private menuSemanaSV: MenuSemanaService,
    private recetaSV: RecetaService
  ) { }

  ngOnInit() {
    this.recetas = [];
    this.Ingredientes = [];
    this.menuSemanaSV.getRecetasSemana()
      .subscribe( recetas => {
        this.recetas = recetas;
      });
    this.menuSemanaSV.getIngredientesSemana()
      .subscribe(ingredientes => {
        console.log(ingredientes);
        ingredientes.forEach(ingred => {
          const ing: Ingrediente = {
            nombre: ingred,
            check: false
          };
          this.Ingredientes.push(ing);
        });
        console.log(this.Ingredientes);
        this.Ingredientes = this.Ingredientes.sort((a, b) => {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
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
      .subscribe();
  }

  cambioPersonaMenu(id, persona) {
    this.recetaSV.menuReceta(id, true, persona).subscribe();
  }

  limpiarMenuSemana() {
    this.menuSemanaSV.limpiarMenu().subscribe(() => this.ngOnInit());
  }

  quitarRecetaMenu(id) {
    this.menuSemanaSV.quitarRecetaMenu(id).subscribe(() => this.ngOnInit());
  }

  onNgModelChange(event) {
    this.Ingredientes.forEach(ing => {
      ing.check = false;
    });
    event.forEach(pos => {
      this.Ingredientes[pos].check = true;
    });
  }


}
