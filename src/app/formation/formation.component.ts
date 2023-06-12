import {Component, OnInit} from '@angular/core';
import {FormationService} from "./formation.service";
import {Formation} from "../models";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {FormationEditComponent} from "../formation-edit/formation-edit.component";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {

  listeDesFormations: Formation[] = [];
  filter: FormControl = new FormControl<any>('');

  constructor(private service: FormationService, private dialog: MatDialog) {
    this.filter.valueChanges.subscribe(key => {
      this.getFormations(key);
    });
  }


  ngOnInit() {
    this.getFormations();
  }

  private getFormations(key?: string) {
    return this.service.getFormations(key).subscribe(values => this.listeDesFormations = values);
  }

  supprimerFormation(formation: Formation) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.service.supprimerFormation(formation.id).subscribe(res => {
        if (res) this.getFormations(this.filter.getRawValue());
      })
    })
  }

  modifierFormation(formation: Formation = new Formation()) {
    this.dialog.open(FormationEditComponent, {data: formation, minWidth: '400px'}).afterClosed().subscribe(ok => {
      if (ok) this.getFormations(this.filter.getRawValue());
    })
  }

  calculerFrais(formation: Formation): any {
    return formation.cours?.map(it => it.cout || 0).reduce((acc, p) => acc + p, 0);
  }
}
