import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// PageComponents
import { MainComponent } from './components/page';

const nttEncTempRoutes: Routes = [
  { path: '', redirectTo: 'enctemp', pathMatch: 'full'},
  { path: 'enctemp', component: MainComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(nttEncTempRoutes),
  ],
  exports: [RouterModule]
})
export class NTTEncTempRoutingModule {}
