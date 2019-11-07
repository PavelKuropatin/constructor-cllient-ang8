import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelingComponent} from './modeling.component';


const routes: Routes = [
  {path: 'modeling', component: ModelingComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ModelingRoutingModule {
}
