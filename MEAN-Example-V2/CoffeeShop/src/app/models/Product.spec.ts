import { Product } from './product';

describe('Product', () => {
  it('should create an instance with given values', () => {
    const product = new Product(1, 'Latte', 'Milk Coffee', 'latte.jpg', 10, 5.99);
    expect(product).toBeTruthy();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Latte');
    expect(product.description).toBe('Milk Coffee');
    expect(product.image).toBe('latte.jpg');
    expect(product.quantity).toBe(10);
    expect(product.price).toBe(5.99);
  });
});
