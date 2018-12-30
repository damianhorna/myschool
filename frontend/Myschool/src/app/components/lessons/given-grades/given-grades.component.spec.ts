import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivenGradesComponent } from './given-grades.component';

describe('GivenGradesComponent', () => {
  let component: GivenGradesComponent;
  let fixture: ComponentFixture<GivenGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivenGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivenGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
