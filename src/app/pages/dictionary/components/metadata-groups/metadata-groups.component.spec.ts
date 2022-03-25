import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataGroupsComponent } from './metadata-groups.component';

describe('MetadataGroupsComponent', () => {
  let component: MetadataGroupsComponent;
  let fixture: ComponentFixture<MetadataGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
