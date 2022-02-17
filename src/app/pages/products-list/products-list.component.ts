import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {IProductsList} from "../../features/products/store/products.reducer";
import {Observable} from "rxjs";
import * as fromSelectorsProductsList from "../../features/products/store/products.selectors"
import {ProductListTypes} from "../../shared/enums/product-list-types";
import * as fromProductListActions from "../../features/products/store/products.actions";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public $listType: Observable<ProductListTypes>;
  public $fetchPending: Observable<boolean>;

  constructor(private store: Store<IProductsList>) {
    this.$fetchPending = this.store
      .pipe(select(fromSelectorsProductsList.selectFetchState));

    this.$listType = this.store
      .pipe(select(fromSelectorsProductsList.selectProductListType));
  }

  ngOnInit(): void {
    this.store.dispatch(
      new fromProductListActions.FetchAll({}),
    );
  }

  get productListTypes(): typeof ProductListTypes {
    return ProductListTypes;
  }

}
