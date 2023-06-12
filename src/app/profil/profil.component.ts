import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Profil} from "../models";
import {BehaviorSubject, catchError, debounceTime, map, merge, of, startWith, switchMap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PROFIL_TABLE_CONF} from "./config";
import {union} from 'lodash';
import {MatDialog} from "@angular/material/dialog";
import {ProfilEditComponent} from "../profil-edit/profil-edit.component";
import {SettingService} from "../setting/setting.service";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profilDatasource = new MatTableDataSource<Profil>();
  filter = new BehaviorSubject('');

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private setting: SettingService, private dialog:MatDialog) {
    this.availableColumns = PROFIL_TABLE_CONF;
    this.displayedColumns = union(PROFIL_TABLE_CONF.map(it => it.label), ['action']);
  }

  ngOnInit() {
    this.getProfils();
  }

  private getProfils() {
    this.setting.getProfils(this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort?.active || 'titre',
      this.sort?.direction || 'asc').subscribe((data: any) => this.profilDatasource.data = data['content'])
  }

  modifierProfil(row: Profil = new Profil()) {
    this.dialog.open(ProfilEditComponent, {data: row}).afterClosed().subscribe(_ => this.getProfils());
  }

  supprimerProfil(row: Profil) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.setting.supprimerProfil(row.id).subscribe(res => {
        if (res) this.getProfils();
      })
    })
  }
}
