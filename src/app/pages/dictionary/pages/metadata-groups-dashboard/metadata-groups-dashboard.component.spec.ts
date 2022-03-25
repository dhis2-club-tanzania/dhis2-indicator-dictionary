import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataGroupsDashboardComponent } from './metadata-groups-dashboard.component';

describe('MetadataGroupsDashboardComponent', () => {
  let component: MetadataGroupsDashboardComponent;
  let fixture: ComponentFixture<MetadataGroupsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataGroupsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataGroupsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
