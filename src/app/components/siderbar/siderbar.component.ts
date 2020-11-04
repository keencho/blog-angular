import {Component, OnInit} from '@angular/core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {openURL} from '../../utils/url.util';
import {SidebarService} from '../../services/sidebar.service';
import {Sidebar} from '../../models/sidebar';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss']
})
export class SiderbarComponent implements OnInit {

  faGithub = faGithub;
  faEnvelope = faEnvelope;

  sidebarData: Sidebar = {} as any;

  goToURL(url: string): void {
    openURL(url);
  }

  constructor(private sidebarService: SidebarService) { }

  getSidebarData(): void {
    this.sidebarService.getSidebarData()
        .subscribe(result => this.sidebarData = result.data);
  }

  ngOnInit(): void {
    this.getSidebarData();
  }

}
