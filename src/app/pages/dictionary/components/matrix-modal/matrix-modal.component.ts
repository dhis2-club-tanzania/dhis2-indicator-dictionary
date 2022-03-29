import { Component, Input, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as async from 'async';

@Component({
  selector: 'app-matrix-modal',
  templateUrl: './matrix-modal.component.html',
  styleUrls: ['./matrix-modal.component.css'],
})
export class MatrixModalComponent implements OnInit {
  @Input() metadataGroup: any;
  metadataData: any = {};
  errors: any = {};
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  ngOnInit(): void {
    async.mapLimit(
      this.metadataGroup[this.metadataGroup?.key],
      10,
      async.reflect((metadata, callback) => {
        this.httpClient
          .get(`indicators/${metadata?.id}.json?fields=*`)
          .subscribe(
            (results) => {
              this.metadataData[metadata?.id] = results;
              callback(null, results);
            },
            (err) => {
              this.errors[metadata?.id] = err;
              callback(err, null);
            }
          );
      })
    );
  }

  onClose(event: Event): void {
    event.stopPropagation();
  }

  download(event: Event, format, category): void {
    // event.stopPropagation();
    console.log(format);
    console.log(category);
  }
}
