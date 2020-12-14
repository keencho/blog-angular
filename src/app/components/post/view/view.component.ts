import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';
import DateUtils from '../../../utils/date.utils';
import {AuthService} from '../../../services/auth.service';
import * as marked from 'marked';
import {PostHeading} from '../../../models/post-heading';
import StringUtils from '../../../utils/string.utils';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private postService: PostService
  ) {
    // header anchor 클릭 감지후 #으로 split하여 결과가 있으면 위로 52만큼 scroll
    router.events.subscribe((val) => {
      // @ts-ignore
      if (StringUtils.hasText(val.url)) {
        // @ts-ignore
        const url = val.url;
        if (url.split('#').length > 1) {
          window.scrollBy({top: -52, left: 0, behavior: 'smooth'});
        }
      }
    });
  }

  post: Post;
  postHeadings: PostHeading[] = [];
  isAdmin = false;
  isShowData = false;
  currentUrl = this.router.url.split('#')[0];

  dateFormatter = DateUtils.dateFormatter;

  onClickTag(tag): void {
    this.router.navigateByUrl('/post/archives?tag=' + tag);
  }

  update(): void {
    this.router.navigateByUrl('/post/write?path=' + this.post.path);
  }

  test(): void {
    console.log('test');
  }

  delete(): void {
    const chk = confirm('정말 삭제하시겠습니까?');

    if (chk) {
      this.postService.deletePost(this.post)
        .subscribe(
          res => {
            if (res.success) {
              this.router.navigateByUrl('/post/archives')
                .then(() => alert('삭제가 완료되었습니다.'));
            } else {
              alert(res.error);
            }
          },
          error => {
            alert(error.error.message);
          }
        );
    }
  }

  initData(): void {
    const params = {
      path: this.route.snapshot.paramMap.get('path')
  };

    this.postService.getPost(params)
      .subscribe(
        res => {
          if (res.success) {
            this.post = res.data;
            this.isShowData = true;

            // @ts-ignore
            marked.lexer(res.data.contents).filter(l => l.type === 'heading').forEach(h => {
              this.postHeadings.push({
                // @ts-ignore
                depth: h.depth,
                // @ts-ignore
                text: h.tokens[0].text,
                // @ts-ignore
                anchor: h.tokens[0].text
                  .replace(/\./g, '')
                  .replace(/[\(\)]/g, '')
                  .replace(/\s/g, '-')
                  .toLowerCase()
              });
            });
          } else {
            alert(res.error);
            this.router.navigateByUrl('/post/archives')
              .then();
          }
        },
        error => {
          alert(error.error.message);
          this.router.navigateByUrl('/post/archives')
            .then();
        }
      );
  }

  ngOnInit(): void {
    this.initData();

    if (this.authService.chkTokenExists()) {
      this.authService.authentication()
        .subscribe(
          res => {
            if (res.success) {
              this.isAdmin = true;
            }
          },
        );
    }
  }
}
