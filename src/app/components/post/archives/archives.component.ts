import {Component, OnInit} from '@angular/core';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class PostArchivesComponent implements OnInit {

  constructor() { }

  faCalendarAlt = faCalendarAlt;

  ngOnInit(): void { }

}
