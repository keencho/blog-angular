import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // font-awesome 사용시 이런식으로 import 해와서 변수에 할당해줘야한다.
  faGithub = faGithub;
  faEnvelope = faEnvelope;
  faHome = faHome;

  goToURL(url): void {
    window.open(url, '_blank');
  }

  sendEmail(): void {
    window.open('mailto:seyoung050412@gmail.com');
  }

  constructor() {}

  ngOnInit(): void {
  }

}
