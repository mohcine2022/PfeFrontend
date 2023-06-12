import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cours, Formation} from "../models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {assign} from "lodash";
import {FormationService} from "../formation/formation.service";
import {SettingService} from "../setting/setting.service";

@Component({
  selector: 'app-formation-edit',
  templateUrl: './formation-edit.component.html',
  styleUrls: ['./formation-edit.component.scss']
})
export class FormationEditComponent {

  formationForm!: FormGroup;
  courses: Cours[] = [];
  selectedCourses: Cours[] = [];
  compareCourses = (c1: any, c2:any): boolean => c1.id === c2.id;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private setting: SettingService, private service: FormationService, private fb: FormBuilder, private dialogRef: MatDialogRef<any>) {
    this.formationForm = this.fb.group(assign(new Formation(), {
      titre: [null, Validators.required]
    }));

    this.setting.getCourses().subscribe(value => this.courses = value);
  }

  ngOnInit() {
    if (this.data?.id) {
      this.formationForm.patchValue(this.data);
      this.selectedCourses = this.data.cours;
    }
  }


  enregistrer(value: Formation) {
    if (this.selectedCourses.length > 0) value.cours = this.selectedCourses;
    this.service.creerFormation(value).subscribe((resultat: Formation) => {
      if (resultat) this.dialogRef.close(true)
    })
  }
}
