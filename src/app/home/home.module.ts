import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {OpenDiagramComponent} from './components/dialog/open-diagram/open-diagram.component';
import {MaterialModule} from '../material.module';
import {AddVariableComponent} from './components/dialog/add-variable/add-variable.component';
import {DeleteVariableComponent} from './components/dialog/delete-variable/delete-variable.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ActionComponent} from './components/action/action.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {JsplumbCanvasComponent} from './components/jsplumb/jsplumb-canvas/jsplumb-canvas.component';
import {JsplumbEndpointComponent} from './components/jsplumb/jsplumb-endpoint/jsplumb-endpoint.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent,
    OpenDiagramComponent,
    AddVariableComponent,
    DeleteVariableComponent,
    SettingsComponent,
    ActionComponent,
    JsplumbCanvasComponent,
    JsplumbEndpointComponent
  ],
  entryComponents: [
    OpenDiagramComponent,
    AddVariableComponent,
    DeleteVariableComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    HomeRoutingModule,
    TranslateModule,
    DragDropModule
  ]
})
export class HomeModule {
}
