import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';
import DateUtils from '../../../utils/date.utils';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private postService: PostService
  ) { }

  post: Post;
  isShowData = false;
  dateFormatter = DateUtils.dateFormatter;

  onClickTag(tag): void {
      this.router.navigateByUrl('/post/list?tag=' + tag);
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
  }
}
