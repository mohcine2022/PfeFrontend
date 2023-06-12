import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Salle} from "../models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../setting/setting.service";
import {assign} from "lodash";

@Component({
  selector: 'app-salle-edit',
  templateUrl: './salle-edit.component.html',
  styleUrls: ['./salle-edit.component.scss']
})
export class SalleEditComponent {


  salleForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private setting: SettingService, private fb: FormBuilder, private dialogRef: MatDialogRef<any>) {
    this.salleForm = this.fb.group(assign(new Salle(), {
      numeroDeSalle: [null, Validators.required]
    }));

  }

  ngOnInit() {
    if (this.data?.id) this.salleForm.patchValue(this.data);
  }


  enregistrer(value: Salle) {
    this.setting.enregistrerSalle(value).subscribe((resultat: Salle) => {
      if (resultat) this.dialogRef.close(true)
    })
  }
}
