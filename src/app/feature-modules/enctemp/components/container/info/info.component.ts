import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromNTTEncTemp from '../../../store/reducers';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  loading$: Observable<boolean>;

  constructor(private store: Store<fromNTTEncTemp.State>) {
    this.loading$ = this.store.pipe(select(fromNTTEncTemp.getLoading));
  }
}
