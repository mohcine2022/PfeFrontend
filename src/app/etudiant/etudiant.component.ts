import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Etudiant} from "../models";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SettingService} from "../setting/setting.service";
import {MatDialog} from "@angular/material/dialog";
import {RESPONSABLE_TABLE_CONF} from "../responsable/config";
import {union} from "lodash";
import {PersonneEditComponent} from "../personne-edit/personne-edit.component";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {InscriptionService} from "../inscription/inscription.service";
import {filter} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent {
  etudiantDatasource = new MatTableDataSource<Etudiant>();

  filter: FormControl = new FormControl<any>('');

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private service: InscriptionService, private setting: SettingService, private dialog:MatDialog) {
    this.availableColumns = RESPONSABLE_TABLE_CONF;
    this.displayedColumns = union(RESPONSABLE_TABLE_CONF.map(it => it.label), ['action']);

    this.filter.valueChanges.subscribe(key => this.getEtudiants(key));
  }

  ngOnInit() {
    this.getEtudiants('');
  }

  private getEtudiants(key: string = '') {
    this.service.getEtudiants(key).subscribe((data: Etudiant[]) => {
      this.etudiantDatasource.data = data;
    })
  }

  modifierEtudiant(row: Etudiant = new Etudiant()) {
    this.dialog.open(PersonneEditComponent, {data: {entity: row, personneType: 'Etudiant'}}).afterClosed().subscribe(ok => {
      if (ok) this.getEtudiants('');
    })
  }

  supprimerEtudiant(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.service.supprimerEtudiant(row.id).subscribe(res => {
        if (res) this.getEtudiants();
      })
    })
  }
}
