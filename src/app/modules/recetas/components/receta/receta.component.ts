import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../interfaces/receta.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  // Chip etiquetas //// Variables ////////////

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  etiquetas: string[] = [];

  ////////////////////////////////////////////////

  receta: Receta;
  id: string;
  titulo: string;

  Ingredientes: string[] = [];
  Platos: string[] = ['Comida', 'Cena', 'Postre'];

  form: FormGroup;

  constructor(
    private recetaSV: RecetaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
      this.form = new FormGroup({
      'titulo': new FormControl('', Validators.required),
      'tiempo': new FormControl(0, Validators.required),
      'tipo': new FormControl('', Validators.required),
      'ingrediente': new FormControl(''),
      'instrucciones': new FormControl('', Validators.required),
      'consejos': new FormControl(),
      'hidratos': new FormControl(0, Validators.required),
      'proteinas': new FormControl(0, Validators.required),
      'vegetales': new FormControl(0, Validators.required),
      'frutas': new FormControl(0, Validators.required),
      'lipidos': new FormControl(0, Validators.required)
    });
   }

  ngOnInit() {

    this._activatedRoute.params
      .subscribe( params => {
         this.id = params['id'];
         if (this.id === 'nueva') {
          this.titulo = 'Nueva Receta';
          this.Ingredientes = [];
          this.etiquetas = [];
          this.form.reset();
          this.form.get('titulo').enable();
        } else {
          this.titulo = 'Editar Recetas';
          this.recetaSV.getReceta(this.id).subscribe( data => {
          this.receta = data.receta;
          this.Ingredientes = this.receta.ingredientes;
          this.etiquetas = this.receta.etiquetas;
          this.form.patchValue(this.receta);
          this.form.get('titulo').disable();
      });
    }
        });
  }

  addIngrediente( ing ) {

    if (!ing) {
      return;
    }

    this.Ingredientes.push(ing);

    this.form.get('ingrediente').reset();
  }

  guardarCambios() {

    this.receta = this.form.value;

    this.receta.ingredientes = this.Ingredientes;
    this.receta.etiquetas = this.etiquetas;

    if (this.id === 'nueva') {
      this.recetaSV.addReceta(this.receta)
    .subscribe(() => this._router.navigate(['/recetas']));
    } else {
      delete this.receta.titulo;
      this.recetaSV.updateReceta(this.id, this.receta)
        .subscribe(() => this._router.navigate(['/recetas']));
    }

  }

  quitarIngredientes(lista) {
    lista.selected.forEach((item) => {
      const ing = String(item._text.nativeElement.innerText);
      const i = this.Ingredientes.indexOf(ing);
      if (i > -1) {
        this.Ingredientes.splice(i, 1);
      }
    });
  }



  // Chip Etiquetas //// Funciones ////////////////
  addEtiqueta(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our etiqueta
    if ((value || '').trim()) {
      this.etiquetas.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeEtiqueta(etiqueta): void {
    const index = this.etiquetas.indexOf(etiqueta);

    if (index >= 0) {
      this.etiquetas.splice(index, 1);
    }
  }
  //////////////////////////////////////////////////

}
