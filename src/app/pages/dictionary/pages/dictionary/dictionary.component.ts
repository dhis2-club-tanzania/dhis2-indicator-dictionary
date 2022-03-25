import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { MetadataGroupModel } from 'src/app/core/models/metadata.model';
import { State } from 'src/app/store/reducers';
import { uniq, indexOf, map } from 'lodash';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent implements OnInit {
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

  dictionaryItemId(listOfItemsObj: any): void {
    if (listOfItemsObj.selected == 'all') {
      this.metadataIdentifiers = listOfItemsObj['otherSelectedIds'];
      if (this.metadataIdentifiers.length > 0) {
        let identifiers = [];
        map(this.metadataIdentifiers, (identifier) => {
          if (identifier != 'all') {
            identifiers.push(identifier);
          }
        });
        this.metadataIdentifiers = identifiers;
        this.selectedItem = listOfItemsObj.selected;
        this.currentRoute =
          'dictionary/' +
          uniq(identifiers).join(',') +
          '/selected/' +
          listOfItemsObj.selected;
        this.router.navigate([this.currentRoute]);
      } else {
        this.currentRoute = 'dictionary/all';
        this.router.navigate([this.currentRoute]);
      }
    } else {
      let identifiers = [];
      listOfItemsObj['otherSelectedIds'].forEach((identifier) => {
        if (identifier != 'all') {
          identifiers.push(identifier);
        }
      });
      if (indexOf(identifiers, listOfItemsObj.selected) < 0) {
        identifiers.push(listOfItemsObj.selected);
      }
      this.metadataIdentifiers = uniq(identifiers);
      this.selectedItem = listOfItemsObj.selected;
      this.currentRoute =
        'dictionary/' +
        uniq(identifiers).join(',') +
        '/selected/' +
        listOfItemsObj.selected;
      this.router.navigate([this.currentRoute]);
    }
  }

  metadataInfo(metadataInfo: any): void {
    // console.log(metadataInfo);
  }

  metadataGroupsInfo(metadataGroups: MetadataGroupModel[]): void {
    this.metadataGroups = metadataGroups;
  }
}
