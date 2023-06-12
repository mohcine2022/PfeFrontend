import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../setting/setting.service";
import {Personne, Profil, User} from "../models";
import {assign} from 'lodash';

@Component({
  selector: 'app-utilisateur-edit',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.scss']
})
export class UtilisateurEditComponent implements OnInit{


  utilisateurForm!: FormGroup;
  profils: Profil[] = [];
  personnes: Personne[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private setting: SettingService, private fb: FormBuilder, private dialogRef: MatDialogRef<any>) {
    this.utilisateurForm = this.fb.group(assign(new User(), {
      email: ['', Validators.required],
      password: ['', Validators.required],
      profil: this.fb.group({id: [null, Validators.required]}),
      personne: this.fb.group({id: null}),
    }));

    this.setting.getListeProfils().subscribe(profils => this.profils = profils);
    this.setting.getListePersonnes().subscribe(personnes => this.personnes = personnes);
  }

  ngOnInit() {
    if (this.data?.id) this.utilisateurForm.patchValue(this.data);
  }


  enregistrer(value: User) {
    if (value.personne?.id == null) value.personne = null;
    this.setting.enregistrerUtilisateur(value).subscribe((resultat: User) => {
      if (resultat) this.dialogRef.close(true)
    })
  }
}
