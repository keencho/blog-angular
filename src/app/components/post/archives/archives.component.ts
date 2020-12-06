import {Component, OnInit} from '@angular/core';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {SidebarLocation} from '../../../models/sidebar';

@Component({
  selector: 'app-main',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class PostArchivesComponent implements OnInit {

  constructor() { }

  faCalendarAlt = faCalendarAlt;
  sidebarLocation = SidebarLocation.ARCHIVES;

  ngOnInit(): void { }

}
