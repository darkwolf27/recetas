import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { ListRecetasComponent } from './modules/recetas/components/list-recetas/list-recetas.component';
import { NewRecetaComponent } from './modules/recetas/components/new-receta/new-receta.component';

const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recetas', component: ListRecetasComponent  },
    { path: 'nueva-receta', component: NewRecetaComponent  },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }


];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
