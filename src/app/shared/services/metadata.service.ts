import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MetadataGroupModel } from 'src/app/core/models/metadata.model';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getMetadataGroups(type: string): Observable<MetadataGroupModel[]> {
    return this.httpClient
      .get(`${type}.json?fields=id,name,${type.replace('Group', '')}[id,name]`)
      .pipe(
        map((response) => {
          return response[type].map((metadata) => {
            return {
              ...metadata,
              key: type.replace('Group', ''),
            };
          });
        }),
        catchError((error) => of(error))
      );
  }

  getMetadataGroup(type: string, id: string): Observable<MetadataGroupModel> {
    return this.httpClient
      .get(
        `${type}/${id}.json?fields=id,name,${type.replace(
          'Group',
          ''
        )}[id,name]`
      )
      .pipe(
        map((response) => {
          return { ...response, key: type.replace('Group', '') };
        }),
        catchError((error) => of(error))
      );
  }

  getExpressionDescription(expression: string): Observable<string> {
    return this.httpClient
      .post(`indicators/expression/description`, expression)
      .pipe(
        map((response: any) => {
          return response?.description;
        }),
        catchError((error) => of(error))
      );
  }
}
