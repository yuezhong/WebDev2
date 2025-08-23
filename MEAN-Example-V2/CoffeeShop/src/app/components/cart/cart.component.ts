import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, CommonModule],  
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  // Setup array that can be accessible to the html part
  cart: any = new Array;

  /**
   * Constructor for the CartComponent
   * @param {DataService} dataService - The data service to fetch cart data.
   */
  constructor(private dataService: DataService) {
  }

  // Initialises the page to display the content
  ngOnInit(): void {
    this.getCartProducts();
  }

  /**
   * Get all Products from Cart table
   * @memberof ProductsComponent
   */
  getCartProducts() {
    this.dataService.getCartProduct().subscribe(
      (data: any) => {
      this.cart = data;
    });
  }


  /**
   * Decrease the Quantity in the Cart.
   * Decrease the quantity in the cart if greater than 0.
   * Delete the product completely from the cart if quantity is already at 0.
   * @param {number} productID
   * @param {number} quantity
   * @memberof CartComponent
   */
  decreaseQty(productID: number, qty: number): void {
    const newQty = Math.max(0, qty - 1);

    if (newQty > 1) {
      this.dataService.deleteCartByID(productID).subscribe(() => this.refresh());
    } else {
      this.dataService.updateCartQty(productID, newQty).subscribe(() => this.refresh());
    }
  }

  /**
   * Increase the Quantity in the Cart
   * Max quantity is set to 100
   * @param {number} productID
   * @param {number} quantity
   * @memberof CartComponent
   */
  increaseQty(productID: number, qty: number): void {
    if (qty >= 100) { return; }

    const newQty = qty + 1;
    this.dataService.updateCartQty(productID, newQty).subscribe(() => this.refresh());
  }

  /**
   * Reload the cart from the server (single place)
   */
  private refresh(): void {
    this.dataService.getCartProduct().subscribe(data => this.cart = data);
  }

  /**
   * Gets the total cost of all transactions.
   * @return {number} subTotal
   * @memberof CartComponent
   */
  getTotalCost() {
    let subTotal: number = 0;
    for(let items of this.cart) {
      subTotal += items.price * items.quantity;
    }
    return subTotal;
  }

  /**
   * Empties the Cart
   * @memberof CartComponent
   */
  emptyCart() {
    for(let product of this.cart) {
      this.dataService.deleteCartByID(product.productID).subscribe((d:any) => {
       console.log("Deleting");
       this.ngOnInit();
      });
    }
    alert("Cart Emptied");
  }
}
