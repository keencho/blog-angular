import { Component, OnInit } from '@angular/core';
import { mobileMaxWidth } from '../../assets/styles/size';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  mainListCols = 4;
  mainTileCols;
  sideTileCols;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
  ];

  chkWidth(): void {
    const width = window.innerWidth;

    if (width < mobileMaxWidth) {
      this.mainTileCols = 4;
      this.sideTileCols = 4;
    }  else {
      this.mainTileCols = 3;
      this.sideTileCols = 1;
    }
  }

  ngOnInit(): void {
    this.chkWidth();
  }

}
