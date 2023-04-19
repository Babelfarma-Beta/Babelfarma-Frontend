import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MatDateFormats, MAT_DATE_LOCALE } from '@angular/material/core';

const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    FormsModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    SlickCarouselModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    FormsModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    SlickCarouselModule,
    MatDatepickerModule,
    MatNativeDateModule
],
providers: [
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  // Aquí se agrega el proveedor de formato de fecha
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
],
})
export class AngularMaterialModule { }
