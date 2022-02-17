import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {IProductsList, NumberRange} from "../store/products.reducer";
import {filter, Observable, ReplaySubject, Subscription, takeUntil, tap} from "rxjs";
import * as fromSelectorsProductsList from "../store/products.selectors";
import * as fromProductListActions from "../store/products.actions";
import {map} from "rxjs/operators";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {MatSliderChange} from "@angular/material/slider";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.scss']
})
export class ListFiltersComponent implements OnInit, OnDestroy {

  public $filtersSetted: Observable<boolean>;
  public filtersForm: FormGroup;
  public priceRange: NumberRange | null = null;
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<IProductsList>,
              private readonly fb: FormBuilder
  ) {

    this.filtersForm = this.fb.group({
      productTypes: this.fb.group({}),
      priceSelected: this.fb.control(0)
    });

    this.store
      .pipe(
        select(fromSelectorsProductsList.selectProductsTypes),
        takeUntil(this.$destroy))
      .subscribe(productTypes => {
        productTypes.forEach(type => {
          (this.filtersForm.get('productTypes') as FormGroup)?.addControl(type, this.fb.control(false), {emitEvent: false});
        })
      });

    this.store
      .pipe(
        select(fromSelectorsProductsList.selectProductsPriceRange),
        filter(range => range !== null),
        takeUntil(this.$destroy)
      )
      .subscribe(range => {
        this.priceRange = range as NumberRange;
      });

    this.$filtersSetted = this.store
      .pipe(
        select(fromSelectorsProductsList.selectFilters),
        map(filters => filters && (filters.isValidPriceRange() || filters.hasProductTypes())),
        takeUntil(this.$destroy)
      );
  }

  ngOnInit(): void {

    this.filtersForm.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(value => {
      let productTypes: string[] = Object.keys(value.productTypes);
      let priceRange: NumberRange | null = null
      productTypes = productTypes.filter(type => value.productTypes[type]);

      if (value.priceSelected && value.priceSelected !== 0) {
        priceRange = {
          min: this.priceRange?.min as number,
          max: value.priceSelected
        }
      }

      this.store.dispatch(
        new fromProductListActions.FilterProducts({
            productType: new Set<string>(productTypes),
            priceRange: priceRange,
            sortType: null
          }
        ));
    })
  }

  public cleanFilters(): void {
    this.filtersForm.reset({}, {emitEvent: false});
    this.store.dispatch(
      new fromProductListActions.FetchAll({}));
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

  get formControlsNames(): string[] {
    return Object.keys((this.filtersForm.controls['productTypes'] as FormGroup).controls);
  }

}
