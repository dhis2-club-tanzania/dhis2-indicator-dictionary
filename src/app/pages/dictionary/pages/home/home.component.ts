import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { uniq, indexOf, map } from 'lodash';
import { MetadataGroupModel } from 'src/app/core/models/metadata.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  metadataIdentifiers: string[] = ['all'];
  selectedItem: string;
  dictionaryConfig: any = {
    showAllBlock: true,
  };
  systemInfo: any;
  metadataIdentifiersArr: any[] = ['all'];
  metadataGroups: MetadataGroupModel[];
  currentDictionaryPage: string = 'dictionary';
  currentRoute: string;
  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit() {
    this.httpClient.get('system/info').subscribe((systemSettings) => {
      this.systemInfo = systemSettings;
    });
    this.route.params.forEach((params: Params) => {
      if (params['selected'] != undefined) {
        if (params['selected'] == 'all' && !params['ids']) {
          this.metadataIdentifiers = [];
          this.selectedItem = params['selected'];
          this.currentRoute = 'dictionary/all';
          this.router.navigate([this.currentRoute]);
        } else {
          this.selectedItem = params['selected'];
          let identifiers = [];
          params['ids'].split(',').forEach((param) => {
            identifiers.push(param);
          });
          if (this.selectedItem != 'all') {
            identifiers.push(this.selectedItem);
          }
          this.metadataIdentifiers = uniq(identifiers);
          this.currentRoute =
            'dictionary/' +
            uniq(identifiers).join(',') +
            '/selected/' +
            this.selectedItem;
          this.router.navigate([this.currentRoute]);
        }
      } else {
        this.metadataIdentifiers = this.metadataIdentifiersArr;
        this.selectedItem = 'all';
        this.currentRoute =
          'dictionary/' +
          uniq(this.metadataIdentifiers).join(',') +
          '/selected/' +
          this.selectedItem;
        this.router.navigate([this.currentRoute]);
      }
    });
  }

  getSharedLink(event: Event, identifiers: any[], pageType: string): void {
    event.stopPropagation();
    if (this.systemInfo) {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      if (pageType === 'dictionary') {
        if (identifiers.length > 0) {
          if (this.systemInfo.instanceBaseUrl) {
            selBox.value =
              this.systemInfo.instanceBaseUrl +
              '/api/apps/Indicator-Dictionary/index.html#/dictionary/' +
              uniq(identifiers).join(',') +
              '/selected/' +
              this.selectedItem;
          } else {
            selBox.value =
              this.systemInfo.contextPath +
              '/api/apps/Indicator-Dictionary/index.html#/dictionary/' +
              uniq(identifiers).join(',') +
              '/selected/' +
              this.selectedItem;
          }
        } else {
          selBox.value =
            this.systemInfo.contextPath +
            '/api/apps/Indicator-Dictionary/index.html#/dictionary/all';
        }
      } else {
        selBox.value =
          this.systemInfo.contextPath +
          '/api/apps/Indicator-Dictionary/index.html#/matrix';
      }

      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      let messagePart = document.getElementById('copied-message');
      setTimeout(function () {
        messagePart.style.display = 'inline-block';
        messagePart.style.marginBottom = '-20px';
      }, 100);
      setTimeout(function () {
        messagePart.style.display = 'none';
      }, 1000);
    }
  }

  togglePageType(event: Event, pageType: string): void {
    event.stopPropagation();
    console.log(pageType);
    this.router.navigate(['matrix']);
    this.currentDictionaryPage = pageType;
  }
}
