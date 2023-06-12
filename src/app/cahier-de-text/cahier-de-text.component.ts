import {Component, OnInit} from '@angular/core';
import {CahierDeTextInteractif} from "../models";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {ResourceService} from "../resource.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CahierDeTextEditComponent} from "../cahier-de-text-edit/cahier-de-text-edit.component";

@Component({
  selector: 'app-cahier-de-text',
  templateUrl: './cahier-de-text.component.html',
  styleUrls: ['./cahier-de-text.component.scss']
})
export class CahierDeTextComponent implements OnInit{
  listeDesCahiersDeTexte: CahierDeTextInteractif[] = [];
  filter: FormControl = new FormControl<any>('');

  constructor(private service: ResourceService, private dialog: MatDialog, private bs: MatBottomSheet) {
    this.filter.valueChanges.subscribe(key => {
      this.getCahiersDeTexte(key);
    });
  }


  ngOnInit() {
    this.getCahiersDeTexte();
  }

  private getCahiersDeTexte(key?: string) {
    return this.service.getCahiersDeTexte(key).subscribe(values => this.listeDesCahiersDeTexte = values);
  }

  supprimerCahierDeTexte(cahierDeTexte: CahierDeTextInteractif) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.service.supprimerCahierDeTextInteractif(cahierDeTexte.id).subscribe(res => {
        if (res) this.getCahiersDeTexte(this.filter.getRawValue());
      })
    })
  }

  modifierCahierDeTextInteractif(cahierDeTexte: CahierDeTextInteractif = new CahierDeTextInteractif()) {
    this.bs.open(CahierDeTextEditComponent, {data: cahierDeTexte}).afterDismissed().subscribe(ok => {
      if (ok) this.getCahiersDeTexte(this.filter.getRawValue());
    })
  }

  getType(typeDeTexte: any): string {
    switch (typeDeTexte) {
      case 'ANNONCE': return 'Annonce';
      case 'NOTE_DE_COURS': return 'Note de cours';
      case 'RAPPEL_DE_DEVOIR': return 'Rappel de devoir';
      case 'DATE_EVALUATION': return 'Date d\'évaluation';
      default: return 'Annonce';
    }
  }

  chipColor(typeDeTexte: any) {
    switch (typeDeTexte) {
      case 'ANNONCE': return 'aquamarine';
      case 'NOTE_DE_COURS': return '#dba6ff';
      case 'RAPPEL_DE_DEVOIR': return '#7d7fff';
      case 'DATE_EVALUATION': return '#60ffda';
      default: return 'aquamarine';
    }
  }
}
