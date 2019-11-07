import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModelingRoutingModule} from './modeling-routing.module';
import {ModelingComponent} from './modeling.component';


@NgModule({
  declarations: [
    ModelingComponent
  ],
  imports: [
    CommonModule,
    ModelingRoutingModule
  ]
})
export class ModelingModule {
}
