import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatCardModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule
} from '@angular/material';
// ---
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';

const MODULES = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatCardModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule
];

@NgModule({
  imports: [ CommonModule, ...MODULES],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  exports: [ ...MODULES ],
  declarations: [],
})
export class MyMaterialModule { }
