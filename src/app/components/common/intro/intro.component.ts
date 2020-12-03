import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor() { }

  @Input() txt1: string;
  @Input() txt2: string;
  @Input() txt3: string;
  @Input() txt4: string;

  ngOnInit(): void {
  }

}
