import {Component, OnInit} from '@angular/core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import UrlUtils from '../../utils/url.utils';
import {SidebarService} from '../../services/sidebar.service';
import {Sidebar} from '../../models/sidebar';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss']
})
export class SiderbarComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  faGithub = faGithub;
  faEnvelope = faEnvelope;

  sidebarData: Sidebar = {} as any;

  goToURL(url): void {
    UrlUtils.openURL(url);
  }

  getSidebarData(): void {
    this.sidebarService.getSidebarData()
        .subscribe(result => this.sidebarData = result.data);
  }

  ngOnInit(): void {
    this.getSidebarData();
  }

}
