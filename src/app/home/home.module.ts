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


@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent,
    OpenDiagramComponent
  ],
  entryComponents: [
    OpenDiagramComponent
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
