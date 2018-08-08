import { APP_ROUTING } from './../../app.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecetasComponent, ModalRecetaAddenu } from './components/list-recetas/list-recetas.component';
import { MaterialModule } from '../../shared/material/material.module';
import { RecetaComponent } from './components/receta/receta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecetaService } from './services/receta.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BuscarRecetasComponent } from './components/buscar-recetas/buscar-recetas.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgxChartsModule,
    APP_ROUTING
  ],
  exports: [],
  declarations: [
    ListRecetasComponent,
    ModalRecetaAddenu,
    RecetaComponent,
    BuscarRecetasComponent
  ],
  entryComponents: [ModalRecetaAddenu],
  providers: [RecetaService]
})
export class RecetasModule { }
