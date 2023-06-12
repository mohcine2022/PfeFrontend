import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Salle, User} from "../models";
import {BehaviorSubject} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SettingService} from "../setting/setting.service";
import {MatDialog} from "@angular/material/dialog";
import {union} from "lodash";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {SalleEditComponent} from "../salle-edit/salle-edit.component";
import {SALLE_TABLE_CONF} from "./config";

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent {

  salleDatasource = new MatTableDataSource<Salle>();

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private setting: SettingService, private dialog:MatDialog) {
    this.availableColumns = SALLE_TABLE_CONF;
    this.displayedColumns = union(SALLE_TABLE_CONF.map(it => it.label), ['action']);
  }

  ngOnInit() {
    this.getSalles();
  }

  private getSalles() {
    this.setting.getSalles().subscribe((data: Salle[]) => {
      this.salleDatasource.data = data;
    })
  }

  modifierSalle(row: Salle = new Salle()) {
    this.dialog.open(SalleEditComponent, {data: row}).afterClosed().subscribe(ok => {
      if (ok) this.getSalles();
    })
  }

  supprimerSalle(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.setting.supprimerSalle(row.id).subscribe(res => {
        if (res) this.getSalles();
      })
    })
  }
}
