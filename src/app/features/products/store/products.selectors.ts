import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProducts from './products.reducer';

export const selectProductListState =
  createFeatureSelector<fromProducts.IProductsList>('products-list');

export const selectProductListType = createSelector(
  selectProductListState,
  (state: fromProducts.IProductsList) => state.listType);

export const selectProducts = createSelector(
  selectProductListState,
  (state: fromProducts.IProductsList) => state.products);

export const selectProductsTypes = createSelector(
  selectProductListState,
  (state: fromProducts.IProductsList) => state.productTypes);

export const selectProductsCount = createSelector(
  selectProductListState,
  (state: fromProducts.IProductsList) => state.products.length);

export const selectProductsPriceRange = createSelector(
  selectProductListState,
  (state: fromProducts.IProductsList) => state.priceRange);

export const selectFilters = createSelector(
  selectProductListState,
  (state: fromProducts.IProductsList) => state.filters);

export const selectFetchState = createSelector(
  selectProductListState,
  (state: fromProducts.IProductsList) => state.fetchPending);

