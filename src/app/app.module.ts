import {NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {ModelingModule} from './modeling/modeling.module';
import {AppRoutingModule} from './app-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MaterialModule} from './material.module';
import {GestureConfig} from '@angular/material';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    ModelingModule,
    MaterialModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
