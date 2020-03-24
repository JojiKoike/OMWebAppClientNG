import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  // アプリケーション起動時の初期化処理はngOnInit()に実装する。
  ngOnInit() {}
}
