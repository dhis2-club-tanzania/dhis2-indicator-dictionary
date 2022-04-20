import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName',
})
export class SearchByNamePipe implements PipeTransform {
  transform(values: any[], searchingText: string): any {
    if (!searchingText) {
      return values;
    }
    return (
      values.filter(
        (value) =>
          value?.name.toLowerCase()?.indexOf(searchingText.toLowerCase()) > -1
      ) || []
    );
  }
}
