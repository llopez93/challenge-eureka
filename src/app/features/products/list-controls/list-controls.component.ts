import {Component, OnDestroy, OnInit} from '@angular/core';
import {SortTypes} from "../../../shared/enums/sort-types";
import {ProductListTypes} from "../../../shared/enums/product-list-types";
import {select, Store} from "@ngrx/store";
import {IProductsList} from "../store/products.reducer";
import * as fromProductListActions from "../store/products.actions";
import * as fromProductsSelectors from "../store/products.selectors"
import {Observable, ReplaySubject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-list-controls',
  templateUrl: './list-controls.component.html',
  styleUrls: ['./list-controls.component.scss']
})
export class ListControlsComponent implements OnInit, OnDestroy {

  sortTypes: SortTypes[] = [SortTypes.ALPHABETIC, SortTypes.ALPHABETIC_INVERSE, SortTypes.LOW_TO_HIGH, SortTypes.HIGH_TO_LOW];
  $totalProducts: Observable<number>;
  sortSelected: FormControl = new FormControl(null);
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<IProductsList>) {
    this.$totalProducts = this.store
      .pipe(select(fromProductsSelectors.selectProductsCount));

    this.store
      .pipe(select(fromProductsSelectors.selectFilters),
        map(filters => filters.sort),
        takeUntil(this.$destroy))
      .subscribe(sortType => this.sortSelected.setValue(sortType, {emitEvent: false}));
  }

  ngOnInit(): void {
    this.sortSelected.valueChanges.subscribe((sort: SortTypes) => {
      this.store.dispatch(
        new fromProductListActions.FilterProducts({
            productType: null,
            priceRange: null,
            sortType: sort
          }
        ));
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

  public changeListType(listType: ProductListTypes): void {
    this.store.dispatch(
      new fromProductListActions.ChangeListType(listType),
    );
  }

  get productListTypes(): typeof ProductListTypes {
    return ProductListTypes;
  }
}
