import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModelingRoutingModule} from './modeling-routing.module';
import {ModelingComponent} from './modeling.component';
import {StartCountComponent} from './components/dialog/start-count/start-count.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {ModelingSidenavComponent} from './components/modeling-sidenav/modeling-sidenav.component';
import {ModelingSettingsComponent} from './components/modeling-settings/modeling-settings.component';
import {ModelingJsplumbCanvasComponent} from './components/jsplumb/modeling-jsplumb-canvas/modeling-jsplumb-canvas.component';
import {ModelingJsplumbObjectComponent} from './components/jsplumb/modeling-jsplumb-object/modeling-jsplumb-object.component';
import {ModelingJsplumbEndpointComponent} from './components/jsplumb/modeling-jsplumb-endpoint/modeling-jsplumb-endpoint.component';
import {ModelingJsplumbConnectionComponent} from './components/jsplumb/modeling-jsplumb-connection/modeling-jsplumb-connection.component';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [
    ModelingComponent,
    StartCountComponent,
    ModelingSidenavComponent,
    ModelingSettingsComponent,
    ModelingJsplumbCanvasComponent,
    ModelingJsplumbObjectComponent,
    ModelingJsplumbEndpointComponent,
    ModelingJsplumbConnectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ModelingRoutingModule,
    TranslateModule,
    FormsModule
  ]
})
export class ModelingModule {
}
