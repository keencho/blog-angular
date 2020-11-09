import {Component, HostListener, OnInit} from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import StringUtils from '../../utils/string.utils';
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

  constructor(
      private postService: PostService,
      private route: ActivatedRoute
  ) {}

  faAngleRight = faAngleRight;
  faGithub = faGithub;

  postListData: Post[] = [] as any;

  hasText = StringUtils.hasText;
  dateFormatter = DateUtils.dateFormatter;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event): void {
    const list = document.querySelectorAll('.article');
    const lastElement = list[list.length - 1];

    // TODO: 스크롤 높이 계산...
    // console.log(event.scrollY);
    // console.log(lastElement.offsetTop);
  }

  listPost(start: number): void {
    const params = {
      start,
      tag: StringUtils.hasText(this.tag) ? this.tag : null,
      date: StringUtils.hasText(this.date) ? this.date : null
    };

    this.postService.listPost(params)
        .subscribe(result => {
          this.postListData = this.postListData.concat(result.data);
          this.start += limitDefault;
        });
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
