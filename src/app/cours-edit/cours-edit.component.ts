import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../setting/setting.service";
import {assign} from "lodash";
import {Cours, Enseignant, Personne} from "../models";

@Component({
  selector: 'app-cours-edit',
  templateUrl: './cours-edit.component.html',
  styleUrls: ['./cours-edit.component.scss']
})
export class CoursEditComponent {

  coursForm!: FormGroup;

  enseignants: Enseignant[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private setting: SettingService, private fb: FormBuilder, private dialogRef: MatDialogRef<any>) {
    this.coursForm = this.fb.group(assign(new Cours(), {
      titre: ['', Validators.required],
      cout: ['', Validators.required],
      enseignant: this.fb.group({
        id: [null, Validators.required]
      })
    }));

    this.setting.getEnseignants().subscribe(value => this.enseignants = value);
  }

  ngOnInit() {
    if (this.data?.id) this.coursForm.patchValue(this.data);
  }


  enregistrer(value: Cours) {
    if (value.enseignant?.id == null) value.enseignant = null;
    this.setting.enregistrerCours(value).subscribe((resultat: Cours) => {
      if (resultat) this.dialogRef.close(true)
    })
  }
}
