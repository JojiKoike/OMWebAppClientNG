import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'ntt',
    pathMatch: 'full'
  },
  {
    path: 'simplemsd',
    loadChildren: './feature-modules/simplemsd/simplemsd.module#SimplemsdModule'
  },
  {
    path: 'ntt',
    loadChildren: './feature-modules/enctemp/enctemp.module#NTTEncTempModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
