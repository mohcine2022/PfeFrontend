import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Enseignant} from "../models";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SettingService} from "../setting/setting.service";
import {MatDialog} from "@angular/material/dialog";
import {union} from "lodash";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {ENSEIGNANT_TABLE_CONF} from "./config";
import {PersonneEditComponent} from "../personne-edit/personne-edit.component";

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent {
  enseignantDatasource = new MatTableDataSource<Enseignant>();

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private setting: SettingService, private dialog:MatDialog) {
    this.availableColumns = ENSEIGNANT_TABLE_CONF;
    this.displayedColumns = union(ENSEIGNANT_TABLE_CONF.map(it => it.label), ['action']);
  }

  ngOnInit() {
    this.getEnseignants();
  }

  private getEnseignants() {
    this.setting.getEnseignants().subscribe((data: Enseignant[]) => {
      this.enseignantDatasource.data = data;
    })
  }

  modifierEnseignant(row: Enseignant = new Enseignant()) {
    this.dialog.open(PersonneEditComponent, {data: {entity: row, personneType: 'Enseignant'}}).afterClosed().subscribe(ok => {
      if (ok) this.getEnseignants();
    })
  }

  supprimerEnseignant(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.setting.supprimerEnseignant(row.id).subscribe(res => {
        if (res) this.getEnseignants();
      })
    })
  }
}
