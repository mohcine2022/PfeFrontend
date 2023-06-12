import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceEditComponent } from './presence-edit.component';

describe('PresenceEditComponent', () => {
  let component: PresenceEditComponent;
  let fixture: ComponentFixture<PresenceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresenceEditComponent]
    });
    fixture = TestBed.createComponent(PresenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
