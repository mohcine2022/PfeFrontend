import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cours, Etudiant, Formation, Inscription, Personne, Profil, User} from "../models";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {assign} from "lodash";
import {FormationService} from "../formation/formation.service";
import {InscriptionService} from "../inscription/inscription.service";
import {PersonneEditComponent} from "../personne-edit/personne-edit.component";

@Component({
  selector: 'app-inscription-edit',
  templateUrl: './inscription-edit.component.html',
  styleUrls: ['./inscription-edit.component.scss']
})
export class InscriptionEditComponent {

  inscriptionForm!: FormGroup;
  formations: Formation[] = [];
  etudiants: Etudiant[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private inscriptionService: InscriptionService,private formationService: FormationService,
              private fb: FormBuilder, private dialogRef: MatDialogRef<any>, private dialog: MatDialog) {
    this.inscriptionForm = this.fb.group(assign(new Inscription(), {
      dateInscription: [new Date(), Validators.required],
      etudiant: this.fb.group({id: [null, Validators.required]}),
      formation: this.fb.group({id: [null, Validators.required]}),
    }));

    this.formationService.getFormations('').subscribe(formations => {
      this.formations = formations;

      this.inscriptionForm.get('formation')?.valueChanges.subscribe(selected => {
        let formation = formations.find(it => it.id == selected.id);

        if (formation) {

          let frais = formation?.cours?.map((it: Cours) => it.cout || 0).reduce((acc, p) => acc + p, 0);

          this.inscriptionForm.get('fraisInscription')?.patchValue(frais);

        }
      })
    });
    this.getEtudiant();
  }

  ngOnInit() {
    if (this.data?.id) this.inscriptionForm.patchValue(this.data);
  }

  enregistrer(value: Inscription) {
    if (value.etudiant?.id == null) value.etudiant = null;
    if (value.formation?.id == null) value.formation = null;
    this.inscriptionService.enregistrerInscription(value).subscribe((resultat: Inscription) => {
      if (resultat) this.dialogRef.close(true)
    })
  }

  private getEtudiant() {
    this.inscriptionService.getEtudiants('').subscribe(etudiants => this.etudiants = etudiants);
  }
  ajouterEtudiant() {
    this.dialog.open(PersonneEditComponent, {data:{entity: new Etudiant(), personneType: 'Etudiant'}, minWidth: '400px'}).afterClosed().subscribe(ok => {
      if (ok) this.getEtudiant();
    })
  }
}
