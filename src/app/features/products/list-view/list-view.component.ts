import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../../shared/models/product";
import {ProductsService} from "../service/products.service";
import {select, Store} from "@ngrx/store";
import {IProductsList} from "../store/products.reducer";
import * as fromSelectorsProductsList from "../store/products.selectors";
import * as fromProductListActions from "../store/products.actions";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  $products: Observable<Product[]>;

  constructor(private readonly productsService: ProductsService,
              private store: Store<IProductsList>) {
    this.$products = this.store
      .pipe(select(fromSelectorsProductsList.selectProducts));
  }

  ngOnInit(): void {
  }

}
