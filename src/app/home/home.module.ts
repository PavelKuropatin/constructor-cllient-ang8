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
import {JsplumbCanvasComponent} from './components/jsplumb/jsplumb-canvas/jsplumb-canvas.component';
import {JsplumbObjectComponent} from './components/jsplumb/jsplumb-object/jsplumb-object.component';
import {JsplumbConnectionComponent} from './components/jsplumb/jsplumb-connection/jsplumb-connection.component';
import {JsplumbEndpointComponent} from './components/jsplumb/jsplumb-endpoint/jsplumb-endpoint.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ActionComponent} from './components/action/action.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent,
    OpenDiagramComponent,
    AddVariableComponent,
    DeleteVariableComponent,
    JsplumbCanvasComponent,
    JsplumbObjectComponent,
    JsplumbConnectionComponent,
    JsplumbEndpointComponent,
    SettingsComponent,
    ActionComponent
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
    TranslateModule
  ]
})
export class HomeModule {
}
