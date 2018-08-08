import { Component, OnInit, Inject } from '@angular/core';
import { Receta } from '../../interfaces/receta.interface';
import { RecetaService } from '../../services/receta.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-list-recetas',
  templateUrl: './list-recetas.component.html',
  styleUrls: ['./list-recetas.component.scss']
})
export class ListRecetasComponent implements OnInit {
  recetas: Receta[] = [];
  TotalRecetas: number;
  meGusta: boolean;
  personaMenu: string;

  constructor(
    private recetaSV: RecetaService,
    public modal: MatDialog
  ) { }

  ngOnInit() {
    this.recetaSV.getRecetas()
      .subscribe( data => {
        this.recetas = data.recetas;
        this.TotalRecetas = data.count;
      });
  }

  EliminarReceta(id) {
    this.recetaSV.deleteReceta(id)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  cambioFavorito(index, id, favorito: boolean) {
    this.recetas[index].favorito = favorito;
    this.recetaSV.favoritoReceta(id, favorito)
      .subscribe();
  }

  openModalAddMenu(id) {
    const modalRef = this.modal.open(ModalRecetaAddenu, {
      data: {persona: this.personaMenu}
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        console.log('paso por aquí');
        this.recetaSV.menuReceta(id, true, result).subscribe();
      }
    });
  }


}

@Component({
  selector: 'app-modal-receta-add-menu',
  templateUrl: '../../modals/receta-add-menu.modal.html'
})
// tslint:disable-next-line:component-class-suffix
export class ModalRecetaAddenu {
  constructor(
    public dialogRef: MatDialogRef<ModalRecetaAddenu>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
