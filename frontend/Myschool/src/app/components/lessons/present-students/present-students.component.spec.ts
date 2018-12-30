import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentStudentsComponent } from './present-students.component';

describe('PresentStudentsComponent', () => {
  let component: PresentStudentsComponent;
  let fixture: ComponentFixture<PresentStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
