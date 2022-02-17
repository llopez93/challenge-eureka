import {Action} from '@ngrx/store';

export enum ProductsActionsTypes {
  FETCH_ALL = '[PRODUCTS: FETCH ALL]',
  FETCH_FULLFILED = '[PRODUCTS: FETCH FULLFILED]',
  CHANGE_LIST_TYPE = '[PRODUCTS:  CHANGE LIST TYPE]',
  FILTER_PRODUCTS = '[PRODUCTS:  FILTER]',
  FILTER_FULLFILED = '[PRODUCTS:  FILTER FULLFILED]'
}

export class FetchAll implements Action {
  readonly type = ProductsActionsTypes.FETCH_ALL;
  constructor(public payload: any) {
  }
}

export class FetchFullfiled implements Action {
  readonly type = ProductsActionsTypes.FETCH_FULLFILED;

  constructor(public payload: any) {
  }
}

export class ChangeListType implements Action {
  readonly type = ProductsActionsTypes.CHANGE_LIST_TYPE;

  constructor(public payload: any) {
  }
}

export class FilterProducts implements Action {
  readonly type = ProductsActionsTypes.FILTER_PRODUCTS;

  constructor(public payload: {
    productType: any, sortType: any, priceRange: { min: number, max: number } | null
  }) {}
}

export class FilterFullfiled implements Action {
  readonly type = ProductsActionsTypes.FILTER_FULLFILED;

  constructor(public payload: any) {
  }
}


export type ProductsActions =
  | FetchAll
  | ChangeListType
  | FetchFullfiled
  | FilterProducts
  | FilterFullfiled;
