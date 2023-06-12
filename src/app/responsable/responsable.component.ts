import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Responsable} from "../models";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SettingService} from "../setting/setting.service";
import {MatDialog} from "@angular/material/dialog";
import {union} from "lodash";
import {PersonneEditComponent} from "../personne-edit/personne-edit.component";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {RESPONSABLE_TABLE_CONF} from "./config";

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class ResponsableComponent {
  responsableDatasource = new MatTableDataSource<Responsable>();

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private setting: SettingService, private dialog:MatDialog) {
    this.availableColumns = RESPONSABLE_TABLE_CONF;
    this.displayedColumns = union(RESPONSABLE_TABLE_CONF.map(it => it.label), ['action']);
  }

  ngOnInit() {
    this.getResponsables();
  }

  private getResponsables() {
    this.setting.getResponsables().subscribe((data: Responsable[]) => {
      this.responsableDatasource.data = data;
    })
  }

  modifierResponsable(row: Responsable = new Responsable()) {
    this.dialog.open(PersonneEditComponent, {data: {entity: row, personneType: 'Responsable'}}).afterClosed().subscribe(ok => {
      if (ok) this.getResponsables();
    })
  }

  supprimerResponsable(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.setting.supprimerResponsable(row.id).subscribe(res => {
        if (res) this.getResponsables();
      })
    })
  }
}
