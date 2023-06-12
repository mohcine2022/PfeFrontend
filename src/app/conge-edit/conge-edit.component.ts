import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Conge, Enseignant, Responsable} from "../models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../setting/setting.service";
import {assign} from "lodash";
import {ResourceService} from "../resource.service";

@Component({
  selector: 'app-conge-edit',
  templateUrl: './conge-edit.component.html',
  styleUrls: ['./conge-edit.component.scss']
})
export class CongeEditComponent implements OnInit {

  congeForm!: FormGroup;
  enseignants: Enseignant[] = [];
  responsables: Responsable[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private setting: SettingService, private resourceService: ResourceService, private fb: FormBuilder, private dialogRef: MatDialogRef<any>) {
    this.congeForm = this.fb.group(assign(new Conge(), {
      dateDebut: [null, Validators.required],
      dateFin: [null, Validators.required],
      enseignant: this.fb.group({id: [null, Validators.required]}),
      responsableDeFormation: this.fb.group({id: [null, Validators.required]}),
    }));

    this.setting.getEnseignants().subscribe(value => this.enseignants = value);
    this.setting.getResponsables().subscribe(value => this.responsables = value);
  }

  ngOnInit() {
    if (this.data?.id) this.congeForm.patchValue(this.data);
  }


  enregistrer(value: Conge) {
    this.resourceService.creerConge(value).subscribe((resultat: Conge) => {
      if (resultat) this.dialogRef.close(true)
    })
  }
}
