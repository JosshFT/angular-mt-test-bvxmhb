import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from './table/table.model';

@Injectable()
export class AppService {
  private currencies = [];
  private date = '';
  constructor(private http: HttpClient) {}

  getCurrencies(base?: string) {
    return this.http.get(
      `https://api.apilayer.com/exchangerates_data/latest?apikey=MJxR2LESSGZhXdZj6hcKQFk97UWHd1yh&base=${base}`
    );
  }

  getPage(page, refresh?: boolean, base?: string) {
    if (refresh) {
      return this.getCurrencies(base).pipe(
        map((data: any) => {
          return this.convertData(data);
        }),
        map((data) => {
          this.currencies = data.rates;
          this.date = data.date;
          return {
            page: page++,
            results: this.currencies.slice((page - 1) * 5, page * 5),
            totalCount: this.currencies.length,
            date: this.date,
          };
        })
      );
    }
    return of({
      page: page++,
      results: this.currencies.slice((page - 1) * 5, page * 5),
      totalCount: this.currencies.length,
      date: this.date,
    });
  }

  convertData(data) {
    let arr = [];
    for (const rate in data.rates) {
      arr.push(new Currency(rate, data.rates[rate]));
    }

    return {
      date: data.date,
      rates: arr,
    };
  }
}
