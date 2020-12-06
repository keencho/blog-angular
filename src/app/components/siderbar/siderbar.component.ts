import {Component, Input, OnInit} from '@angular/core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import UrlUtils from '../../utils/url.utils';
import {SidebarService} from '../../services/sidebar.service';
import {Sidebar, SidebarLocation} from '../../models/sidebar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss']
})
export class SiderbarComponent implements OnInit {

  constructor(
      private sidebarService: SidebarService,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) { }

  faGithub = faGithub;
  faEnvelope = faEnvelope;

  sidebarData: Sidebar = {} as any;
  sidebarTotal = 0;

  @Input() sidebarLocation: SidebarLocation;

  goToURL(url): void {
    UrlUtils.openURL(url);
  }

  getSidebarData(): void {
    this.sidebarService.getSidebarData()
        .subscribe(result => {
          this.sidebarData = result.data;
          result.data.tag.map(r => this.sidebarTotal += r.count);
        });
  }

  onClickDate(date): void {
    if (this.sidebarLocation === SidebarLocation.MAIN) {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: date === 'ALL' ? null : {date}
        });
      window.scrollTo({top: 0});
    } else if (this.sidebarLocation === SidebarLocation.ARCHIVES) {
      this.router.navigateByUrl('/main?date=' + date);
    }
  }

  onClickTag(tag): void {
    if (this.sidebarLocation === SidebarLocation.MAIN) {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: tag === 'ALL' ? null : {tag}
        });
      window.scrollTo({top: 0});
    } else if (this.sidebarLocation === SidebarLocation.ARCHIVES) {
      this.router.navigateByUrl('/main?tag=' + tag);
    }
  }

  ngOnInit(): void {
    this.getSidebarData();
  }

}
