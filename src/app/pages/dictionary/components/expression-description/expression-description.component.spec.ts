import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDescriptionComponent } from './expression-description.component';

describe('ExpressionDescriptionComponent', () => {
  let component: ExpressionDescriptionComponent;
  let fixture: ComponentFixture<ExpressionDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
