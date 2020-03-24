import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSimpleMSD from '../../../store/reducers';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  loading$: Observable<boolean>;

  constructor(private store: Store<fromSimpleMSD.State>) {
    this.loading$ = this.store.pipe(select(fromSimpleMSD.getLoading));
  }
}
