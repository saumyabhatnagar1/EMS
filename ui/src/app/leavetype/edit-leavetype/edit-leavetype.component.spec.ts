import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeavetypeComponent } from './edit-leavetype.component';

describe('EditLeavetypeComponent', () => {
  let component: EditLeavetypeComponent;
  let fixture: ComponentFixture<EditLeavetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeavetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeavetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
