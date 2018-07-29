import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../interfaces/receta.interface';

@Component({
  selector: 'app-new-receta',
  templateUrl: './new-receta.component.html',
  styles: [
    `
    .block{
      display: block;
    }
    `
  ]
})
export class NewRecetaComponent implements OnInit {

  // Chip etiquetas //// Variables ////////////

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  etiquetas: string[] = [];

  ////////////////////////////////////////////////

  receta: Receta = {
    titulo: '',
    tiempo: 0,
    ingredientes: [],
    instrucciones: '',
    tipo: ''
  };

  Ingredientes: string[] = [];
  Platos: string[] = ['Comida', 'Cena', 'Postre'];

  form: FormGroup;

  constructor(
    private recetaSV: RecetaService
  ) {
    this.form = new FormGroup({
      'titulo': new FormControl(this.receta.titulo, Validators.required),
      'tiempo': new FormControl(this.receta.tiempo, Validators.required),
      'tipo': new FormControl(this.receta.tipo, Validators.required),
      'ingrediente': new FormControl(),
      'instrucciones': new FormControl(this.receta.instrucciones, Validators.required),
      'consejos': new FormControl(this.receta.consejos),
      'hidratos': new FormControl(this.receta.hidratos, Validators.required),
      'proteinas': new FormControl(this.receta.proteinas, Validators.required),
      'vegetables': new FormControl(this.receta.vegetales, Validators.required),
      'frutas': new FormControl(this.receta.frutas, Validators.required),
      'lipidos': new FormControl(this.receta.lipidos, Validators.required)
    });
   }

  ngOnInit() {
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

    this.recetaSV.addReceta(this.receta)
    .subscribe((res: any) => {
      console.log(res);
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
