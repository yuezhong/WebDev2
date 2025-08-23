/**
 *  Product Class, stores information about products.
 * @export
 * @class Product
 */
export class Product {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: number;

  constructor(id:number, name:string, description:string, image:string, quantity:number, price:number)
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.quantity = quantity;
    this.price = price;
  }
}
