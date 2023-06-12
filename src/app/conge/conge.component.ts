import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Conge} from "../models";
import {FormControl} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {union} from "lodash";
import {ConfirmSuppressionComponent} from "../confirm-suppression/confirm-suppression.component";
import {CONGE_TABLE_CONF} from "./config";
import {ResourceService} from "../resource.service";
import {CongeEditComponent} from "../conge-edit/conge-edit.component";

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent {
  congeDatasource = new MatTableDataSource<Conge>();

  filter: FormControl = new FormControl<any>('');

  availableColumns: any[];
  displayedColumns: any[];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private resourceService: ResourceService, private dialog:MatDialog) {
    this.availableColumns = CONGE_TABLE_CONF;
    this.displayedColumns = union(CONGE_TABLE_CONF.map(it => it.label), ['action']);

    this.filter.valueChanges.subscribe(key => this.getConges(key));
  }

  ngOnInit() {
    this.getConges('');
  }

  private getConges(key: string = '') {
    this.resourceService.getConges(key).subscribe((data: Conge[]) => {
      this.congeDatasource.data = data;
    })
  }

  modifierConge(row: Conge = new Conge()) {
    this.dialog.open(CongeEditComponent, {data: row}).afterClosed().subscribe(ok => {
      if (ok) this.getConges('');
    })
  }

  supprimerConge(row: any) {
    this.dialog.open(ConfirmSuppressionComponent).afterClosed().subscribe(ok => {
      if (ok) this.resourceService.supprimerConge(row.id).subscribe(res => {
        if (res) this.getConges();
      })
    })
  }
}
