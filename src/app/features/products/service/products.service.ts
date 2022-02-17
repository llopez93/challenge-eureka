import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../../../shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly http: HttpClient) {
  }

  get(): Observable<Product[]> {
    return this.http.get('https://kabsa.yallababy.com/api/v1/products/best-selling-products-by-subcategory', {
      headers: {
        secretKey: '1DIPIkKeq8'
      }
    }).pipe(
      map( productList => {
        return (productList as any[]).map( p => {
          let product = new Product(p.title, p.product_type, p.image.src, p.quantitySold);
          p.variants.forEach( (variant: any) => product.addVariant(Number(variant.price)));
          return product;
        })
      })
    );
  }
}
