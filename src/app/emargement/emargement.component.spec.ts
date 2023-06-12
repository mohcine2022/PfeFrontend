import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmargementComponent } from './emargement.component';

describe('EmargementComponent', () => {
  let component: EmargementComponent;
  let fixture: ComponentFixture<EmargementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmargementComponent]
    });
    fixture = TestBed.createComponent(EmargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
