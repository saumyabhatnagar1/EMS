import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUpdateComponent } from './work-update.component';

describe('WorkUpdateComponent', () => {
  let component: WorkUpdateComponent;
  let fixture: ComponentFixture<WorkUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
