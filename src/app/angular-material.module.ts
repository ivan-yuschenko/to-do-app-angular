import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

@NgModule({
    imports: [
        MatToolbarModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        MatTabsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule
    ],
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        MatTabsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule
    ]
})
  
export class AngularMaterialModule { }