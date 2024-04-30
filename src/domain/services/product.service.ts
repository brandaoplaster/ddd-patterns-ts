import Product from "../product/entity/product";

export default class ProductService {
  static incrementPrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}
