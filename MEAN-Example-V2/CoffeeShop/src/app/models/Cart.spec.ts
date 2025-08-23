import { Cart } from './cart';

describe('Cart', () => {
  it('should create an instance with given values', () => {
    const cart = new Cart(1, 2, 9.99);
    expect(cart).toBeTruthy();
    expect(cart.productID).toBe(1);
    expect(cart.quantity).toBe(2);
    expect(cart.price).toBe(9.99);
  });
});
