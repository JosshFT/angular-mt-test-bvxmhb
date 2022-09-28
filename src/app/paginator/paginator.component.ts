import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'paginator',
  template: `
  <div class="container-fluid">
  <div class="row">
  <button class="col-2" [disabled]="page-1<0" (click)="getPage(page-1)"><</button>
  <input class="col-8" [value]="page+1" type="number" />
  <button class="col-2" [disabled]="isLastPage()" (click)="getPage(page+1)">></button>
  </div>
  </div>
  `,
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() totalCount: number;
  @Input() page: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {}

  getPage(page) {
    this.pageChange.emit(page);
  }

  isLastPage() {
    return Math.floor(this.totalCount / 5) === this.page;
  }
}
