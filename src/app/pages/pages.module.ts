import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {ProductsListComponent} from './products-list/products-list.component';
import {SharedModule} from "../shared/shared.module";
import {FeaturesModule} from "../features/features.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {StoreModule} from "@ngrx/store";
import * as fromProductListReducer from "../features/products/store/products.reducer";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    ProductsListComponent
  ],
  imports: [
    StoreModule.forFeature('products-list', fromProductListReducer.reducer),
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FeaturesModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})
export class PagesModule {
}
