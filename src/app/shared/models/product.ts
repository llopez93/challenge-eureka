export class Product {
  title: string;
  productType: string;
  image: string;
  quantitySold: string;
  variants: number[] = [];


  constructor(title: string, productType: string, image: string, quantitySold: string) {
    this.title = title;
    this.productType = productType;
    this.image = image;
    this.quantitySold = quantitySold;
  }

  addVariant(price: number) {
    this.variants.push(price);
  }
}
