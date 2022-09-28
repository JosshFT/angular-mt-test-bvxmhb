import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';
import { Currency } from './table/table.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  rates = {
    USD: {
      currencies: [],
      currentPage: 0,
      totalCount: 0,
      date: '',
    },
    EUR: {
      currencies: [],
      currentPage: 0,
      totalCount: 0,
      date: '',
    }
  }

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getPage(0, true, 'USD');
    this.getPage(0, true, 'EUR');
  }

  getPage(page, refresh?: boolean, base?: string) {
    this.appService.getPage(page, refresh, base).subscribe((data) => {
      this.rates[base].currencies = data.results;
      this.rates[base].currentPage = data.page;
      this.rates[base].totalCount = data.totalCount;
      this.rates[base].date = data.date;
    });
  }

  refresh(base) {
    this.getPage(0, true, base);
  }
}
