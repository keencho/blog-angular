import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {limitDefault, Paging} from '../../../models/paging';
import ObjectUtils from '../../../utils/object.utils';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  constructor() { }

  currentPage: number;
  totalPage: number;
  totalPageArray: number[];

  onClickPageWrapper(page): void {
    if (page <= 0 || page > this.totalPage) {
      return;
    }
    if (Number(document.getElementById('pagination').getElementsByClassName('active')[0].innerHTML) === page) {
      return;
    }
    this.onClickPage(page * limitDefault - limitDefault);
  }

  @Input() pagingData: Paging;
  @Input() onClickPage;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pagingData && !ObjectUtils.isEmpty(changes.pagingData.currentValue)) {
      const d = changes.pagingData.currentValue;

      this.currentPage = Math.floor(d.start / d.limit) + 1;
      this.totalPage = Math.ceil(d.count / d.limit);
      console.log(this.totalPage);

      this.totalPageArray = [];
      for (let i = (this.currentPage - 3 <= 0 ? 1 : this.currentPage - 3); i <= this.currentPage + 3; i++) {
        if (i > this.totalPage) {
          break;
        }
        this.totalPageArray.push(i);
      }
    }
  }

  ngOnInit(): void {
  }

}
