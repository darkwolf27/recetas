import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecetasComponent } from './components/list-recetas/list-recetas.component';
import { MaterialModule } from '../../shared/material/material.module';
import { NewRecetaComponent } from './components/new-receta/new-receta.component';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { RecetaService } from './services/receta.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgxChartsModule
  ],
  exports: [
    ListRecetasComponent
    ],
  declarations: [ListRecetasComponent, NewRecetaComponent],
  providers: [RecetaService]
})
export class RecetasModule { }
