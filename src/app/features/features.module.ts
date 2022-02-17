import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsModule} from "./products/products.module";



@NgModule({
  declarations: [],
  imports: [
    ProductsModule,
    CommonModule
  ],
  exports: [
    ProductsModule
  ]
})
export class FeaturesModule { }
