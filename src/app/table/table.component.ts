import { Component, Input } from '@angular/core';
import { Currency } from './table.model';

@Component({
  selector: 'rates-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.css' ]
})
export class TableComponent  {
  @Input() rows: Currency[];
}
