import {Component, OnInit} from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {openURL} from '../../utils/url.util';

interface Articles {
  article: string;
}

interface Tags {
  tag: string;
  count: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  faAngleRight = faAngleRight;
  faGithub = faGithub;
  faEnvelope = faEnvelope;

  articles: Articles[] = [
    { article: '2020년 8월' },
    { article: '2020년 7월' },
    { article: '2020년 6월' },
    { article: '2020년 2월' },
    { article: '2020년 1월' },
    { article: '2019년 12월' },
    { article: '2019년 10월' },
    { article: '2019년 9월' },
    { article: '2019년 8월' },
  ];

  tags: Tags[] = [
    { tag: 'DB', count: 1 },
    { tag: 'iOS / Swift' , count: 2 },
    { tag: 'Node', count: 4 },
    { tag: 'Angular', count: 3 },
    { tag: 'React', count: 10 },
    { tag: 'Web' , count: 11 },
    { tag: 'Spring', count: 12 },
  ]

  image = 'https://pfh.goodsflow.com/resources/image/2020-10-30/5755f651-79cb-4746-9f56-c564325665da.jpg';

  goToURL(url: string): void {
    openURL(url);
  }

  ngOnInit(): void {
  }

}
