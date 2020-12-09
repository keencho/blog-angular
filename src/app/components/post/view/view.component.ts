import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';
import DateUtils from '../../../utils/date.utils';
import {AuthService} from '../../../services/auth.service';
import * as marked from 'marked';

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
  ) { }

  post: Post;
  postHeadings: marked.Token[];
  isAdmin = false;
  isShowData = false;
  dateFormatter = DateUtils.dateFormatter;

  onClickTag(tag): void {
      this.router.navigateByUrl('/post/archives?tag=' + tag);
  }

  update(): void {
      this.router.navigateByUrl('/post/write?path=' + this.post.path);
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

  onClickHeading(header): void {
      alert('dd');
    this.router.navigate(['/post/view/' + this.post.path], { fragment: header });
  }

  ngOnInit(): void {
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
                this.postHeadings = marked.lexer(res.data.contents).filter(l => l.type === 'heading');
              } else {
                alert(res.error);
                this.router.navigateByUrl('/post/archives');
              }
            },
            error => {
              alert(error.error.message);
              this.router.navigateByUrl('/post/archives');
            }
        );

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
