import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CahierDeTextInteractif} from "../models";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {assign} from "lodash";
import {ResourceService} from "../resource.service";


@Component({
  selector: 'app-cahier-de-text-edit',
  templateUrl: './cahier-de-text-edit.component.html',
  styleUrls: ['./cahier-de-text-edit.component.scss']
})
export class CahierDeTextEditComponent implements OnInit {
  cdtForm!: FormGroup;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private fb: FormBuilder, private bsRef: MatBottomSheetRef, private resourceService: ResourceService) {
    this.cdtForm = this.fb.group(assign(new CahierDeTextInteractif(),{
      titre: [null, Validators.required],
      description: [null, Validators.required],
      typeDeTexte: ['ANNONCE', Validators.required]
    }));
  }

  save(cdt: CahierDeTextInteractif) {
    this.resourceService.creerCahierDeTextInteractif(cdt).subscribe(res => {
      if (res) this.bsRef.dismiss(res);
    })
  }

  close() {
    this.bsRef.dismiss(null);
  }

  ngOnInit(): void {
    if (this.data?.id) this.cdtForm.patchValue(this.data);
  }

}
