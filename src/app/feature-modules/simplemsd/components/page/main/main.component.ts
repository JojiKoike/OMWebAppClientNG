import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  readonly contentTitle: string = '1次元バネマスダンパ系';

  constructor() { }

  ngOnInit() {
  }

}
