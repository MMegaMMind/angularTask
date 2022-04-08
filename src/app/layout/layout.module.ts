import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule
  ],
  exports:[MainComponent]
})
export class LayoutModule { }
