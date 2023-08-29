import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  // Setup array that can be accessible to the html part
  cartProducts: any[] = new Array();
  // This array is used by Mat Table to display the Column Headers
  displayedColumns: string[] = ['name', 'price', 'quantity'];


  // Base constructor. Pulls in DataService
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
    this.dataService.getCartProducts().subscribe(
      (data: any) => {
      this.cartProducts = data;
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
  decreaseQty(productID: number, quantity: number) {
    // Decrease the quantity in the cart if greater than 0
    if(quantity !== 0) {
      quantity -= 1;
      this.dataService.updateCartQty(productID, quantity).subscribe(
        () => {
          this.getTotalCost();
          this.ngOnInit();
        });
    }
    // Delete the product completely from the cart if quantity is already at 0
    if(quantity === 0) {
      this.dataService.deleteCartByID(productID).subscribe(() => {
        this.getTotalCost();
        this.ngOnInit();
      });
    }
  }

  /**
   * Increase the Quantity in the Cart
   * Max quantity is set to 100
   * @param {number} productID
   * @param {number} quantity
   * @memberof CartComponent
   */
  increaseQty(productID: number, quantity: number) {
    if(quantity < 100) {
      quantity += 1;
      this.dataService.updateCartQty(productID, quantity).subscribe(
        () => {
          this.getTotalCost();
          this.ngOnInit();
        });
    }
  }

  /**
   * Gets the total cost of all transactions.
   * @return {number} subTotal
   * @memberof CartComponent
   */
  getTotalCost() {
    let subTotal: number = 0;
    for(let items of this.cartProducts) {
      subTotal += items.price * items.quantity;
    }
    return subTotal;
  }

  /**
   * Empties the Cart
   * @memberof CartComponent
   */
  emptyCart() {
    for(let product of this.cartProducts) {
      this.dataService.deleteCartByID(product.id).subscribe((d:any) => {
       console.log("Deleting");
       this.ngOnInit();
      });
    }
    alert("Cart Emptied");
  }
}
