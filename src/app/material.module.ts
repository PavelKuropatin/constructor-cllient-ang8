import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatSliderModule,
  MatTableModule,
  MatToolbarModule,
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
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule
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
    MatListModule,
    MatDialogModule,
    MatTableModule
  ]
})
export class MaterialModule {
}
