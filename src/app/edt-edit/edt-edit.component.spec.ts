import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtEditComponent } from './edt-edit.component';

describe('EdtEditComponent', () => {
  let component: EdtEditComponent;
  let fixture: ComponentFixture<EdtEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdtEditComponent]
    });
    fixture = TestBed.createComponent(EdtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
