import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModelingRoutingModule} from './modeling-routing.module';
import {ModelingComponent} from './modeling.component';
import {StartCountComponent} from './components/dialog/start-count/start-count.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {ModelingSidenavComponent} from './components/modeling-sidenav/modeling-sidenav.component';
import {ModelingSettingsComponent} from './components/modeling-settings/modeling-settings.component';
import {MaterialModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import {OpenDiagramComponent} from '../home/components/dialog/open-diagram/open-diagram.component';
import {SortablejsModule} from 'ngx-sortablejs';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ModelingComponent,
    StartCountComponent,
    ModelingSidenavComponent,
    ModelingSettingsComponent
  ],
  entryComponents: [
    OpenDiagramComponent,
    ModelingSettingsComponent,
    StartCountComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ModelingRoutingModule,
    TranslateModule,
    FormsModule,
    SortablejsModule,
    DragDropModule
  ]
})
export class ModelingModule {
}
