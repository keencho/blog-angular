import {Component, HostListener, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';

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

  // ViewChild로 html의 컴포넌트(?)를 가져올때 해당 컴포넌트에는 type이 지정되어 있어야 하는것같다.
  // 예를들어 아래와같은 경우 html에 #mobileMenu="MatMenuTrigger" 라고 선언이 되어 있어야 한다. 아니면 안됨ㅋ
  @ViewChild('mobileMenuTrigger') mobileMenu: MatMenuTrigger;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth > 766 && this.mobileMenu.menuOpen) {
      this.mobileMenu.closeMenu();
    }
  }

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
