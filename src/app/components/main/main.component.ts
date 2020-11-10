import {Component, HostListener, OnInit} from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {PostService} from '../../services/post.service';
import {Post, PostListData} from '../../models/post';
import StringUtils from '../../utils/string.utils';
import ScreenUtils from '../../utils/screen.utils';
import DateUtils from '../../utils/date.utils';
import {ActivatedRoute} from '@angular/router';
import {limitDefault} from '../../models/paging';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  start: number;
  tag: string;
  date: string;
  requestAvailable = true;

  constructor(
      private postService: PostService,
      private route: ActivatedRoute
  ) {}

  faAngleRight = faAngleRight;
  faGithub = faGithub;

  postListRows: Post[] = [] as any;
  postListCount: number;

  hasText = StringUtils.hasText;
  dateFormatter = DateUtils.dateFormatter;

  @HostListener('window:scroll')
  onScroll(): void {
    const list = document.querySelectorAll('.article');
    const lastElement = list[list.length - 1];

    // lastElement가 보이고, list total이 list array length와 같지 않으면 조회함
    if (ScreenUtils.isVisible(lastElement) && this.postListCount !== this.postListRows.length) {
      this.listPost(this.start);
    }
  }

  listPost(start: number): void {
    if (this.requestAvailable) {
      this.requestAvailable = false;

      const params = {
        start,
        tag: StringUtils.hasText(this.tag) ? this.tag : null,
        date: StringUtils.hasText(this.date) ? this.date : null
      };

      this.postService.listPost(params)
          .subscribe(result => {
            this.postListRows = this.postListRows.concat(result.data.rows);
            this.postListCount = result.data.count;
            this.start += limitDefault;
            this.requestAvailable = true;
          });
    }
  }

  ngOnInit(): void {
    // infinite scroll로 바꾸자.
    this.route.queryParams.subscribe(params => {
      this.tag = params.tag;
      this.date = params.date;
      this.start = 0;

      this.listPost(this.start);
    });
  }

}
