import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MetadataService } from 'src/app/shared/services/metadata.service';

@Component({
  selector: 'app-metadata-matrix-dashboard',
  templateUrl: './metadata-matrix-dashboard.component.html',
  styleUrls: ['./metadata-matrix-dashboard.component.css'],
})
export class MetadataMatrixDashboardComponent implements OnInit {
  metadataGroup$: Observable<any>;
  metadataType: string;
  constructor(
    private route: ActivatedRoute,
    private metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    const metadataGroupId = this.route.snapshot.params['id'];
    this.metadataType = this.route.snapshot.params['type'];
    this.metadataGroup$ = this.metadataService.getMetadataGroup(
      this.metadataType,
      metadataGroupId
    );
  }
}
