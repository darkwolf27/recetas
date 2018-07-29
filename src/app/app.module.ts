import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { HomeComponent } from './shared/components/home/home.component';
import { APP_ROUTING } from './app.routing';
import { RecetasModule } from './modules/recetas/recetas.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    RecetasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
