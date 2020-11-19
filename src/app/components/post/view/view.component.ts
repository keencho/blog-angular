import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private postService: PostService
  ) { }

  post: Post;

  ngOnInit(): void {
    const params = {
      path: this.route.snapshot.paramMap.get('path')
    };

    this.postService.getPost(params)
        .subscribe(
            res => {
              if (res.success) {
                console.log(res);
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
