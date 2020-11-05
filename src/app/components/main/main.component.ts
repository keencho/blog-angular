import {Component, OnInit} from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {PostService} from '../../services/post.service';
import {PostList} from '../../models/post';
import StringUtils from '../../utils/string.utils';
import DateUtils from '../../utils/date.utils';
import {Paging} from '../../models/paging';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private postService: PostService) {}

  faAngleRight = faAngleRight;
  faGithub = faGithub;

  postListData: PostList = {} as any;
  postListPaging: Paging = {} as any;

  isEmpty = StringUtils.isEmpty;
  dateFormatter = DateUtils.dateFormatter;

  onClickPage(start): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.listPost(start);
  }

  listPost(start): void {
    const params = {
      start
    };
    this.postService.listPost(params)
        .subscribe(result => {
          this.postListData = result.data[0];
          this.postListPaging = result.data[0].paging[0];
        });
  }

  ngOnInit(): void {
    this.listPost(0);
  }

}
