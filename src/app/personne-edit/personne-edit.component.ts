import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Personne} from "../models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingService} from "../setting/setting.service";
import {assign} from "lodash";
import {InscriptionService} from "../inscription/inscription.service";

@Component({
  selector: 'app-personne-edit',
  templateUrl: './personne-edit.component.html',
  styleUrls: ['./personne-edit.component.scss']
})
export class PersonneEditComponent {

  personneForm!: FormGroup;
  personneType: any = 'Enseignant';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private inscriptionService: InscriptionService, private setting: SettingService, private fb: FormBuilder, private dialogRef: MatDialogRef<any>) {
    this.personneForm = this.fb.group(assign(new Personne(), {
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      diplome: '',
      classe: '',
      niveau: ''
    }));

    this.personneType = this.data.personneType;
  }

  ngOnInit() {
    if (this.data?.entity?.id) this.personneForm.patchValue(this.data.entity);
  }


  enregistrer(value: Personne) {

    if (this.personneType == 'Enseignant') {
      this.setting.enregistrerEnseignant(value).subscribe((resultat: Personne) => {
        if (resultat) this.dialogRef.close(true)
      })
    } else if (this.personneType == 'Responsable') {
      this.setting.enregistrerResponsable(value).subscribe((resultat: Personne) => {
        if (resultat) this.dialogRef.close(true)
      })
    } else {
      this.inscriptionService.enregistrerEtudiant(value).subscribe((resultat: Personne) => {
        if (resultat) this.dialogRef.close(true)
      })
    }

  }
}
