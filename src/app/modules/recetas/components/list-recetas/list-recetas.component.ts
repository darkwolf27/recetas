import { Component, OnInit, ViewChild, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Receta } from '../../interfaces/receta.interface';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-list-recetas',
  templateUrl: './list-recetas.component.html',
  styleUrls: ['./list-recetas.component.css']
})
export class ListRecetasComponent implements OnInit {
  recetas: Receta[] = [];
  TotalRecetas: number;

  public colores = [
    {backgroundColor: ['orange', 'blue', 'yellow', 'green', 'pink']}
  ];

  viewChart = [250, 50];

  

  public doughnutChartLabels: string[] = ['Hidratos', 'Proteínas', 'Lípidos', 'Vegetales', 'Frutas'];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

  meGusta: boolean;
  

  constructor(
    private recetaSV: RecetaService,
    private renderer: Renderer2
  ) { }

  

  ngOnInit() {
    this.recetaSV.getRecetas()
      .subscribe( data => {
        this.recetas = data.recetas;
        this.TotalRecetas = data.count;
      });
  }



}
