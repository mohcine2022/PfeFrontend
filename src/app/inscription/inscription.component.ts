import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Inscription} from "../models";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {union} from "lodash";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {INSCRIPTION_TABLE_CONF} from "./config";
import {InscriptionService} from "./inscription.service";
import {InscriptionEditComponent} from "../inscription-edit/inscription-edit.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  inscriptionDatasource = new MatTableDataSource<Inscription>();

  availableColumns: any[];
  displayedColumns: any[];

  filter: FormControl = new FormControl<any>('');

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private service: InscriptionService, private dialog:MatDialog) {
    this.availableColumns = INSCRIPTION_TABLE_CONF;
    this.displayedColumns = union(INSCRIPTION_TABLE_CONF.map(it => it.label), ['action']);

    this.filter.valueChanges.subscribe(key => this.getInscriptions(key));
  }

  ngOnInit() {
    this.getInscriptions('');
  }

  private getInscriptions(key: string = '') {
    this.service.getInscriptions(key).subscribe((data: Inscription[]) => {
      this.inscriptionDatasource.data = data;
    })
  }

  modifierInscription(row: Inscription = new Inscription()) {
    this.dialog.open(InscriptionEditComponent, {data: row, minWidth: '400px'}).afterClosed().subscribe(ok => {
      if (ok) this.getInscriptions();
    })
  }

  supprimerInscription(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.service.supprimerInscription(row.id).subscribe(res => {
        if (res) this.getInscriptions();
      })
    })
  }
}
