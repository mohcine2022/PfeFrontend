import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Cours} from "../models";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SettingService} from "../setting/setting.service";
import {MatDialog} from "@angular/material/dialog";
import {union} from "lodash";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {COURS_TABLE_CONF} from "./config";
import {CoursEditComponent} from "../cours-edit/cours-edit.component";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent {
  coursDatasource = new MatTableDataSource<Cours>();

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private setting: SettingService, private dialog:MatDialog) {
    this.availableColumns = COURS_TABLE_CONF;
    this.displayedColumns = union(COURS_TABLE_CONF.map(it => it.label), ['action']);
  }

  ngOnInit() {
    this.getCourses();
  }

  private getCourses() {
    this.setting.getCourses().subscribe((data: Cours[]) => {
      this.coursDatasource.data = data;
    })
  }

  modifierCours(row: Cours = new Cours()) {
    this.dialog.open(CoursEditComponent, {data: row}).afterClosed().subscribe(ok => {
      if (ok) this.getCourses();
    })
  }

  supprimerCours(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.setting.supprimerCours(row.id).subscribe(res => {
        if (res) this.getCourses();
      })
    })
  }
}
