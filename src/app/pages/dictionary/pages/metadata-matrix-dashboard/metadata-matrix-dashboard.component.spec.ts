import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataMatrixDashboardComponent } from './metadata-matrix-dashboard.component';

describe('MetadataMatrixDashboardComponent', () => {
  let component: MetadataMatrixDashboardComponent;
  let fixture: ComponentFixture<MetadataMatrixDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataMatrixDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataMatrixDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
