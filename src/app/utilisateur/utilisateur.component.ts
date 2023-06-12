import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Profil, User} from "../models";
import {BehaviorSubject} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SettingService} from "../setting/setting.service";
import {MatDialog} from "@angular/material/dialog";
import {union} from "lodash";
import {USER_TABLE_CONF} from "./config";
import {UtilisateurEditComponent} from "../utilisateur-edit/utilisateur-edit.component";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {
  utilisateurDatasource = new MatTableDataSource<User>();
  filter = new BehaviorSubject('');

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private setting: SettingService, private dialog:MatDialog) {
    this.availableColumns = USER_TABLE_CONF;
    this.displayedColumns = union(USER_TABLE_CONF.map(it => it.label), ['action']);
  }

  ngOnInit() {
    this.getUtilisateurs();
  }

  private getUtilisateurs() {
    this.setting.getUtilisateurs().subscribe((data: User[]) => {
      this.utilisateurDatasource.data = data;
    })
  }

  modifierUtilisateur(row: User = new User()) {
    this.dialog.open(UtilisateurEditComponent, {data: row}).afterClosed().subscribe(ok => {
      if (ok) this.getUtilisateurs();
    })
  }

  supprimerUtilisateur(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.setting.supprimerUtilisateur(row.id).subscribe(res => {
        if (res) this.getUtilisateurs();
      })
    })
  }
}
