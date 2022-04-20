import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { omit } from 'lodash';

import * as async from 'async';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { downloadToJSON } from 'src/app/shared/helpers/downloads.helpers';

@Component({
  selector: 'app-matrix-modal',
  templateUrl: './matrix-modal.component.html',
  styleUrls: ['./matrix-modal.component.css'],
})
export class MatrixModalComponent implements OnInit {
  @Input() metadataGroup: any;
  metadataData: any = {};
  errors: any = {};
  selectedIndicators: any = {};
  searchingText: string;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private router: Router
  ) {}

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

  changeRoute(event: Event, route: string): void {
    localStorage.setItem('matrixUrl', route);
    this.router.navigate([route]);
  }

  download(event: Event, format: string, category: string, id?: string): void {
    // console.log(format);
    // console.log(category);
    if (format === 'json') {
      // console.log(this.metadataData);
      const formattedJSONData = Object.keys(
        category === 'all' ? this.metadataData : this.selectedIndicators
      ).map((key) => {
        return omit(this.metadataData[key], [
          'sharing',
          'legendSets',
          'indicatorGroups',
          'userAccesses',
          'createdBy',
          'user',
        ]);
      });
      downloadToJSON({ indicators: formattedJSONData });
    } else if (format == 'Excel') {
      const fileName = 'Indicators';
      event.stopPropagation();
      let htmlTable;

      htmlTable = document.getElementById(id).outerHTML;

      // const htmlTable = window.document.getElementById(id).outerHTML;
      if (htmlTable) {
        const uri = 'data:application/vnd.ms-excel;base64,',
          template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:' +
            'office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook>' +
            '<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
            '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
            '</head><body><table border="1">{table}</table><br /><table border="1">{table}</table></body></html>',
          base64 = (s) => window.btoa(unescape(encodeURIComponent(s))),
          format = (s, c) => s.replace(/{(\w+)}/g, (m, p) => c[p]);

        const ctx = { worksheet: 'Data', filename: fileName };
        let str =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office' +
          ':excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook>' +
          '<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
          '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';
        ctx['div'] = htmlTable;

        str += '{div}</body></html>';
        const link = document.createElement('a');
        link.download = fileName + '.xls';
        link.href = uri + base64(format(str, ctx));
        link.click();
      }
    }
  }

  getCheckIndicator(event: MatCheckboxChange, indicator: any): void {
    const checked: boolean = event['checked'];
    if (checked) {
      this.selectedIndicators[indicator?.id] = indicator;
    } else {
      this.selectedIndicators = omit(this.selectedIndicators, [indicator?.id]);
      this.selectedIndicators =
        Object.keys(this.selectedIndicators)?.length > 0
          ? this.selectedIndicators
          : null;
    }
  }

  applyFilter(event): void {
    this.searchingText = event?.target?.value;
  }
}
