/**
 * Cart Class, stores information about the shopping cart.
 * @export
 * @class Products
 */
export class Cart {
  productID: number;
  quantity: number;
  price: number;

  constructor(productID: number, quantity: number, price: number)
  {
    this.productID = productID;
    this.quantity = quantity;
    this.price = price;
  }
}
