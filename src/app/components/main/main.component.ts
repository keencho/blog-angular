import {Component, HostListener, OnInit} from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

interface Articles {
  article: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  faAngleRight = faAngleRight;

  articles: Articles[] = [
    { article: '기사3' },
    { article: '기사4' },
    { article: '기사5' },
    { article: '기사5' },
    { article: '기사6' },
    { article: '기사7' },
    { article: '기사8' },
    { article: '기사9' },
    { article: '기사10' },
  ];

  image = 'https://pfh.goodsflow.com/resources/image/2020-10-30/5755f651-79cb-4746-9f56-c564325665da.jpg';

  ngOnInit(): void {
  }

}
