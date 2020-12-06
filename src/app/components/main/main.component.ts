import {Component, HostListener, OnInit} from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../models/post';
import StringUtils from '../../utils/string.utils';
import DateUtils from '../../utils/date.utils';
import ScreenUtils from '../../utils/screen.utils';
import {limitDefault} from '../../models/paging';
import {SidebarLocation} from '../../models/sidebar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  start: number;
  tags: string;
  date: string;
  requestAvailable = true;

  constructor(
      private postService: PostService,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  faAngleRight = faAngleRight;
  faGithub = faGithub;

  postListRows: Post[] = [] as any;
  postListCount: number;
  postListEmpty = false;

  hasText = StringUtils.hasText;
  dateFormatter = DateUtils.dateFormatter;
  sidebarLocation = SidebarLocation.MAIN;

  @HostListener('window:scroll')
  onScroll(): void {
    const list = document.querySelectorAll('.article');
    const lastElement = list[list.length - 1];

    // lastElement가 보이고, archives total이 archives array length와 같지 않으면 조회함
    if (ScreenUtils.isVisible(lastElement) && this.postListCount !== this.postListRows.length) {
      this.listPost(this.start);
    }
  }

  goToView(path: string): void{
    this.router.navigateByUrl('/post/view/' + path);
  }

  onClickTag(tag): void {
    this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: tag === 'ALL' ? null : {tag}
        });
    window.scrollTo({top: 0});
  }

  listPost(start: number): void {
    if (this.requestAvailable) {
      this.requestAvailable = false;

      const params = {
        start,
        tags: StringUtils.hasText(this.tags) ? this.tags : null,
        date: StringUtils.hasText(this.date) ? this.date : null
      };

      this.postService.listPost(params)
          .subscribe(result => {
            this.postListRows = this.postListRows.concat(result.data.rows);
            this.postListCount = result.data.count;
            this.postListEmpty = result.data.count === 0;
            this.start += limitDefault;
            this.requestAvailable = true;
          });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.tags = params.tag;
      this.date = params.date;
      this.start = 0;

      // 초기화 해주지 않으면 url param이 바뀔 경우 제대로 concat 되지 않는다.
      this.postListRows = [];
      this.postListCount = 0;

      this.listPost(this.start);
    });
  }

}
