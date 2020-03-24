import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// PageComponents
import { MainComponent } from './components/page';

const simplemsdRoutes: Routes = [
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(simplemsdRoutes),
  ],
  exports: [RouterModule]
})
export class SimplemsdRoutingModule {}
