import { NgModule } from '@angular/core';
// Add material imports
// Provides a place for us to add Angular Material Components without clogging up
// app.module.ts
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';

// MatTableData Source is not a module, so not need to be included into the constant below
const MaterialComponents = [
    MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule,
    MatTableModule, MatCheckboxModule, MatGridListModule
];

@NgModule({
  imports: [ MaterialComponents],
  exports: [ MaterialComponents]
})
export class MaterialModule { }
