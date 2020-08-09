import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any, term: any, prop: string): any {
        if (!term || !prop) return items;
    
        return items.filter((item) => 
            item[prop].toString().toLowerCase().includes(term.toLowerCase()));
      }
}