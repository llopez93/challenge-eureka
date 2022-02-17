import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridViewComponent} from './grid-view/grid-view.component';
import {ListViewComponent} from './list-view/list-view.component';
import {ListControlsComponent} from './list-controls/list-controls.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {StoreModule} from "@ngrx/store";
import * as fromProductListReducer from "./store/products.reducer"
import {EffectsModule} from "@ngrx/effects";
import {ProductsEffects} from "./store/products.effects";
import {MatGridListModule} from "@angular/material/grid-list";
import { ListFiltersComponent } from './list-filters/list-filters.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    GridViewComponent,
    ListViewComponent,
    ListControlsComponent,
    ListFiltersComponent
  ],
  exports: [
    ListControlsComponent,
    GridViewComponent,
    ListViewComponent,
    ListFiltersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('products-list', fromProductListReducer.reducer),
    EffectsModule.forFeature([ProductsEffects]),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSliderModule,
  ]
})
export class ProductsModule {
}
