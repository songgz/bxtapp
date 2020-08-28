import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class DictService {
  dicts: any[] = [];
  constructor(private rest: RestService) {
    this.load().then((data: any) => {
      this.dicts = data.result;
    });
   }
   async load() {
    return  await this.rest.index('dicts', {pre: 999}).toPromise();
  }
  getDictItems( dictMark: string) {
    for (const dict of this.dicts) {
      if (dict.mark === dictMark) {
        return dict.dict_items;
      }
    }
    return [];
  }
  getItems(dictMark: string) {
    return this.rest.index('dicts', {dict_mark: dictMark}).pipe(map((res: any) =>  res.result[0].dict_items));
  }

  getItemMap(dictMark: string) {
    return this.rest.index('dicts', {dict_mark: dictMark}).pipe(map((res: any) => {
      const h = {};
      for (const item of res.result[0].dict_items) {
        h[item.mark] = item.title;
      }
      return h;
    }));
  }
}
