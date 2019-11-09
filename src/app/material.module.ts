import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatSliderModule,
  MatToolbarModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    MatToolbarModule,
    FlexModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    MatToolbarModule,
    FlexModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class MaterialModule {
}
