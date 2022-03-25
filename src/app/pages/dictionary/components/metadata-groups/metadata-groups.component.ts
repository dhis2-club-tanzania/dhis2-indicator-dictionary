import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MetadataGroupModel } from 'src/app/core/models/metadata.model';
import { MetadataService } from 'src/app/shared/services/metadata.service';
import { MatrixModalComponent } from '../matrix-modal/matrix-modal.component';

@Component({
  selector: 'app-metadata-groups',
  templateUrl: './metadata-groups.component.html',
  styleUrls: ['./metadata-groups.component.css'],
})
export class MetadataGroupsComponent implements OnInit {
  @Input() type: string;
  metadataGroups$: Observable<MetadataGroupModel[]>;
  constructor(
    private metadataService: MetadataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.metadataGroups$ = this.metadataService.getMetadataGroups(this.type);
  }

  onViewMatrix(event: Event, group: MetadataGroupModel): void {
    event.stopPropagation();
    this.router.navigate([`matrix/${this.type}/${group?.id}`]);
    // this.dialog.open(MatrixModalComponent, {
    //   width: '100%',
    //   data: {
    //     ...group,
    //   },
    // });
  }
}
