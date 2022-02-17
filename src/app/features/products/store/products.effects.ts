import {Actions, concatLatestFrom, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {ProductsService} from "../service/products.service";
import {ProductsActionsTypes} from "./products.actions";
import {Store} from "@ngrx/store";
import {Filters, IProductsList} from "./products.reducer";
import * as fromProductsSelectors from "./products.selectors"

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private _productsService: ProductsService,
    private readonly store: Store<IProductsList>
  ) {
  }

  @Effect() getAllProducts$ = this.actions$
    .pipe(ofType(ProductsActionsTypes.FETCH_ALL))
    .pipe(
      switchMap(() => {
        return this._productsService.get().pipe(
          map((response) => ({
            type: ProductsActionsTypes.FETCH_FULLFILED,
            payload: response,
          }))
        );
      }),
    );

  @Effect() filterProducts$ = this.actions$
    .pipe(
      ofType(ProductsActionsTypes.FILTER_PRODUCTS),
      concatLatestFrom(() => this.store.select(fromProductsSelectors.selectFilters)),
      switchMap(([action, filters]) => {
        return this._productsService.get().pipe(
          map(products => products.filter(p => (filters as Filters).matchFilter(p))),
          map(products => products.sort(filters.sortFunction)),
          map((products) => ({
            type: ProductsActionsTypes.FILTER_FULLFILED,
            payload: products,
          }))
        );
      }),
    );
}

