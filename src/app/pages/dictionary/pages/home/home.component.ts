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
  currentRoute: string = 'dictionary/all';
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
    if (this.router.url.indexOf('/dictionary') > -1) {
      this.currentRoute = localStorage.getItem('dictionaryUrl');
      this.currentDictionaryPage = 'dictionary';
      const params = this.route.snapshot.params;
      if (params['selected'] != undefined) {
        if (
          !this.currentRoute &&
          params['selected'] == 'all' &&
          !params['ids']
        ) {
          this.metadataIdentifiers = [];
          this.selectedItem = params['selected'];
          this.currentRoute = 'dictionary/all';
          localStorage.setItem('dictionaryUrl', this.currentRoute);
          this.router.navigate([this.currentRoute]);
        } else {
          if (!this.currentRoute) {
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
            this.currentRoute = this.currentRoute;
          }
          localStorage.setItem('dictionaryUrl', this.currentRoute);
          this.router.navigate([this.currentRoute]);
        }
      } else {
        localStorage.setItem('dictionaryUrl', this.currentRoute);
        this.router.navigate([this.currentRoute]);
      }
    } else if (this.router.url.indexOf('/matrixUrl') > -1) {
      this.currentRoute = localStorage.getItem('matrixUrl');
      this.currentDictionaryPage = 'matrix';
      this.router.navigate([this.currentRoute]);
    } else {
      this.currentDictionaryPage = 'dictionary';
      this.router.navigate([this.currentRoute]);
    }
  }

  getSharedLink(event: Event, pageType: string): void {
    event.stopPropagation();
    if (this.systemInfo) {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';

      selBox.value =
        (this.systemInfo.instanceBaseUrl
          ? this.systemInfo.instanceBaseUrl
          : this.systemInfo.contextPath
          ? this.systemInfo.contextPath
          : '') +
        '/api/apps/Indicator-Dictionary/index.html#/' +
        (pageType === 'dictionary'
          ? localStorage.getItem('dictionaryUrl')
          : localStorage.getItem('matrixUrl'));

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
    this.currentDictionaryPage = pageType;
    if (pageType === 'matrix') {
      this.currentRoute = localStorage.getItem('matrixUrl')
        ? localStorage.getItem('matrixUrl')
        : 'matrix';
      localStorage.setItem('matrixUrl', this.currentRoute);
      this.router.navigate([this.currentRoute]);
    } else {
      this.currentRoute = localStorage.getItem('dictionaryUrl')
        ? localStorage.getItem('dictionaryUrl')
        : 'dictionary/all';
      localStorage.setItem('dictionaryUrl', this.currentRoute);
      this.router.navigate([this.currentRoute]);
    }
  }
}
