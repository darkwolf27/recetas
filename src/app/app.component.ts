import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  menuAuxiliar = false;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private _router: Router
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ocultarMenu(snav) {
    if (this.mobileQuery.matches) {
      snav.toggle();
    }
  }

  buscarRecetas(busqueda, ingredientes) {
    this._router.navigate(['/buscar-recetas', busqueda, ingredientes]);
  }

  ocultarMeanuAuxiliar(event) {
    const boton = event.path.filter(e => e.id === 'btnBuscar');

    if (boton.length !== 0 && this.menuAuxiliar === false) {
      this.menuAuxiliar = true;
      return;
    }

    const menu = event.path.filter(e => e.id === 'Auxiliar');

    if (menu.length === 0) {
      this.menuAuxiliar = false;
    }
  }
}
