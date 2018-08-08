import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { APP_ROUTING } from '../../app.routing';
import { MenuSemanaComponent } from './components/menu-semana/menu-semana.component';
import { MenuSemanaService } from './services/menu-semana.service';
import { RecetaService } from '../recetas/services/receta.service';
import { FormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    APP_ROUTING
  ],
  declarations: [MenuSemanaComponent],
  providers: [MenuSemanaService, RecetaService]
})
export class MenuSemanaModule { }
