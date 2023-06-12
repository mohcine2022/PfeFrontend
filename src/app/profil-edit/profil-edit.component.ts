import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Profil} from "../models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../setting/setting.service";

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss']
})
export class ProfilEditComponent implements OnInit {


  profilForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private setting: SettingService, private fb: FormBuilder, private dialogRef: MatDialogRef<any>) {
    this.profilForm = this.fb.group(new Profil());
  }

  ngOnInit() {
    if (this.data?.id) this.profilForm.patchValue(this.data);
  }


  enregistrer(value: Profil) {
    this.setting.enregistrerProfil(value).subscribe((resultat: Profil) => {
      if (resultat) this.dialogRef.close()
    })
  }
}
