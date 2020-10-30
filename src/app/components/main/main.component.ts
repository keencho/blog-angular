/* tslint:disable:no-trailing-whitespace */
import {Component, HostListener, OnInit} from '@angular/core';
import {isMobile} from '../../Utils/screen.utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  screenClass: string;

  chkScreen(): void {
    this.screenClass = isMobile() ? 'mobile' : 'pc';
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.chkScreen();
  }

  ngOnInit(): void {
    this.chkScreen();
  }

}
