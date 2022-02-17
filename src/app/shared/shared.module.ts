import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav/nav.component';
import {BaseLayoutComponent} from './base-layout/base-layout.component';
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    NavComponent,
    BaseLayoutComponent
  ],
  exports: [
    BaseLayoutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class SharedModule {
}
