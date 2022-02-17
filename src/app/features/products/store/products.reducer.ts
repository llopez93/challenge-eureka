import {ProductListTypes} from "../../../shared/enums/product-list-types";
import {ProductsActions, ProductsActionsTypes} from "./products.actions";
import {Product} from "../../../shared/models/product";
import {SortTypes} from "../../../shared/enums/sort-types";

export class Filters {
  private readonly INVALID_PRICE = -1;
  public productTypes: Set<string>;
  public priceRange: { min: number, max: number };
  public sort: SortTypes;

  constructor() {
    this.productTypes = new Set<string>();
    this.priceRange = {
      min: this.INVALID_PRICE,
      max: this.INVALID_PRICE,
    };
    this.sort = SortTypes.LOW_TO_HIGH;
  }

  public matchFilter(product: Product): boolean {
    let match = true;
    if (this.hasProductTypes()) {
      match = this.productTypes.has(product.productType);
    }

    if (this.isValidPriceRange()) {
      match = match && product.variants.filter(price => price >= this.priceRange.min && price <= this.priceRange.max).length > 0;
    }
    return match;
  }

  get sortFunction(): (p1: Product, p2: Product) => number {

    switch (this.sort) {
      case SortTypes.ALPHABETIC:
        return (p1: Product, p2: Product) => p1.title > p2.title ? 1 : p1.title === p2.title ? 0 : -1;
      case SortTypes.ALPHABETIC_INVERSE:
        return (p1: Product, p2: Product) => p1.title < p2.title ? 1 : p1.title === p2.title ? 0 : -1;
      case SortTypes.HIGH_TO_LOW:
        return (p1: Product, p2: Product) => {
          let p1MaxPrice = Math.max(...p1.variants);
          let p2MaxPrice = Math.max(...p2.variants);
          return p1MaxPrice < p2MaxPrice ? 1 : p1MaxPrice === p2MaxPrice ? 0 : -1;
        }
      case SortTypes.LOW_TO_HIGH:
        return (p1: Product, p2: Product) => {
          let p1MinPrice = Math.min(...p1.variants);
          let p2MinPrice = Math.min(...p2.variants);
          return p1MinPrice > p2MinPrice ? 1 : p1MinPrice === p2MinPrice ? 0 : -1;
        }
      default:
        return (p1: Product, p2: Product) => 0;
    }
  }

  public isValidPriceRange(): boolean {
    return this.priceRange.min !== this.INVALID_PRICE && this.priceRange.max !== this.INVALID_PRICE;
  }

  public hasProductTypes(): boolean {
    return this.productTypes.size > 0;
  }
}

export interface NumberRange {
  min: number;
  max: number;
}

export interface IProductsList {
  products: Product[];
  fetchPending: boolean;
  productTypes: Set<string>;
  listType: ProductListTypes;
  filters: Filters;
  priceRange: NumberRange | null;
}


export const initialState: IProductsList = {
  products: [],
  fetchPending: false,
  productTypes: new Set<string>(),
  listType: ProductListTypes.GRID_TYPE,
  filters: new Filters(),
  priceRange: null
};

export function reducer(
  state = initialState,
  action: ProductsActions,
): IProductsList {
  switch (action.type) {
    case ProductsActionsTypes.FETCH_ALL:
      return {
        ...state,
        fetchPending: true
      };
    case ProductsActionsTypes.FETCH_FULLFILED:
      let priceRange: NumberRange | null = null;
      if ((action.payload as Product[]).length > 0) {
        let prices: number[] = [];
        action.payload.map((p: Product) => p.variants).forEach((variants: number[]) => {
          variants.map(price => prices.push(Math.floor(price)));
        });
        priceRange = {
          min: Math.min(...prices),
          max: Math.max(...prices)
        };
      }
      return {
        ...state,
        fetchPending: false,
        products: action.payload,
        productTypes: new Set<string>((action.payload as Product[]).map(p => p.productType)),
        priceRange: priceRange,
        filters: new Filters()
      };
    case ProductsActionsTypes.FILTER_PRODUCTS:
      let filters = new Filters();
      Object.assign(filters, state.filters);
      if (action.payload.productType) {
        filters.productTypes = action.payload.productType;
      }
      if (action.payload.priceRange) {
        filters.priceRange = action.payload.priceRange;
      }

      if (action.payload.sortType) {
        filters.sort = action.payload.sortType;
      }
      return {
        ...state,
        filters: filters,
        fetchPending: true
      };
    case ProductsActionsTypes.FILTER_FULLFILED:
      return {
        ...state,
        products: action.payload,
        fetchPending: false
      };
    case ProductsActionsTypes.CHANGE_LIST_TYPE:
      return {
        ...state,
        listType: action.payload,
      };
    default:
      return state;
  }
}
