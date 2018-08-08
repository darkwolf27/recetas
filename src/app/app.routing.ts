import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { ListRecetasComponent } from './modules/recetas/components/list-recetas/list-recetas.component';
import { RecetaComponent } from './modules/recetas/components/receta/receta.component';
import { BuscarRecetasComponent } from './modules/recetas/components/buscar-recetas/buscar-recetas.component';
import { MenuSemanaComponent } from './modules/menu-semana/components/menu-semana/menu-semana.component';

const ROUTES: Routes = [
    { path: '', component: ListRecetasComponent },
    { path: 'home', component: HomeComponent },
    { path: 'buscar-recetas/:busqueda/:ingredientes', component: BuscarRecetasComponent },
    { path: 'recetas', component: ListRecetasComponent  },
    { path: 'receta/:id', component: RecetaComponent  },
    { path: 'menu-semama', component: MenuSemanaComponent  },
    { path: '', pathMatch: 'full', redirectTo: 'recetas' },
    { path: '**', pathMatch: 'full', redirectTo: 'recetas' }


];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
