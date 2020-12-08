import {Component, OnInit} from '@angular/core';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {SidebarLocation} from '../../../models/sidebar';
import {PostService} from '../../../services/post.service';
import {Archives} from '../../../models/archives';
import DateUtils from '../../../utils/date.utils';

@Component({
  selector: 'app-main',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class PostArchivesComponent implements OnInit {

  constructor(
      private postService: PostService
  ) { }

  faCalendarAlt = faCalendarAlt;
  sidebarLocation = SidebarLocation.ARCHIVES;
  archivesData: Archives[];

  dateFormatter = DateUtils.dateFormatter;

  ngOnInit(): void {
    this.postService.listArchives()
        .subscribe(result => {
          if (!result.success) {
            alert('리스트 로딩에 실패했습니다. 페이지를 다시 불러와주세요.');
            return;
          }
          this.archivesData = result.data;
        });
  }
}
