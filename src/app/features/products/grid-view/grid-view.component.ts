import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {select, Store} from "@ngrx/store";
import {IProductsList} from "../store/products.reducer";
import * as fromProductListActions from "../store/products.actions";
import * as fromSelectorsProductsList from "../store/products.selectors";
import {Observable} from "rxjs";
import {Product} from "../../../shared/models/product";

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  $products: Observable<Product[]>;

  constructor(private store: Store<IProductsList>) {
    this.$products = this.store
      .pipe(select(fromSelectorsProductsList.selectProducts));
  }

  ngOnInit(): void {
  }

}
