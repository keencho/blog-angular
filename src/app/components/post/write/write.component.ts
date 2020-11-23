import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Location} from '@angular/common';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';
import StringUtils from '../../../utils/string.utils';

@Component({
  selector: 'app-create',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private postService: PostService,
      private authService: AuthService
  ) { }

  title: string;
  tags: string;
  path: string;
  summary: string;
  thumbnail: string;
  contents: string;
  isShow = true;

  post: Post;
  isCreate: boolean;

  goBack(): void {
    this.location.back();
  }

  // true - goToMain
  authenticationFailure(isGoToMain: boolean): void {
    alert('권한이 없습니다.');
    if (isGoToMain) {
      this.router.navigateByUrl('/main');
    }
  }

  getArticleHeight(): number {
    return window.innerHeight - 114;
  }

  writePost(): void {
    const post: Post = {
      tags: StringUtils.hasText(this.tags) ? this.tags.split(',') : [],
      path: this.path,
      show: this.isShow,
      title: this.title,
      summary: this.summary,
      contents: this.contents,
      thumbnail: StringUtils.hasText(this.thumbnail) ? this.thumbnail : null
    };

    const validation = this.postService.validatePost(post);

    if (!validation.success) {
      alert(validation.error);
      return;
    }

    this.postService.writePost(post)
        .subscribe(
            res => {
              if (res.success) {
                this.router.navigateByUrl('/post/list');
              } else {
                alert(res.error);
              }
            },
            error => {
              alert(error.error.message);
            }
        );
  }

  ngOnInit(): void {
    // 무기력한 tab키 허용...
    document.getElementById('post').addEventListener('keydown', function(e) {
      if (e.keyCode === 9) {
        // @ts-ignore
        const start = this.selectionStart;
        // @ts-ignore
        const end = this.selectionEnd;

        // @ts-ignore
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        // @ts-ignore
        this.selectionStart = this.selectionEnd = start + 1;
        e.preventDefault();
      }
    });

    if (!this.authService.chkTokenExists()) {
      this.authenticationFailure(true);
      return;
    }
    this.authService.authentication()
        .subscribe(
            res => {
              if (!res.success) {
                this.authenticationFailure(true);
              }

              if (!StringUtils.hasText(this.route.snapshot.paramMap.get('path'))) {
                this.isCreate = true;
                return;
              }

              this.isCreate = false;

              const params = {
                path: this.route.snapshot.paramMap.get('path')
              };

              this.postService.getPost(params)
                  .subscribe(
                      post => {
                        if (post.success) {
                          this.post = post.data;
                        } else {
                          alert(res.error);
                          this.router.navigateByUrl('/post/list');
                        }
                      },
                      error => {
                        alert(error.error.message);
                        this.router.navigateByUrl('/post/list');
                      }
                  );
            },
            error => {
              if (error) {
                this.authenticationFailure(true);
              }
            }
        );
  }

}
