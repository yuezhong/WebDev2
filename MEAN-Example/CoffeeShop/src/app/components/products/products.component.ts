import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/Products';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Products[] = new Array();
  cartProducts: any = new Array();


  // Base constructor. Pulls in DataService
  constructor(private dataService: DataService) {
  }

  // Initialises the page to display the content
  ngOnInit(): void {
    this.getCartProducts();
    this.getProducts();
  }


  /**
   * Get all the Products
   * @memberof ProductsComponent
   */
  getProducts() {
    this.dataService.getAllProducts().subscribe(
      (data: any) => {
      this.products = data;
    });
  }

  /**
   * Get all Products from Cart
   * @memberof ProductsComponent
   */
  getCartProducts() {
    this.dataService.getCartProducts().subscribe(
      (data: any) => {
      this.cartProducts = data;
    });
  }

  /**
   * Increase Quantity of Product
   * Max 100
   * cartID is currently Hardcoded as 1, as this is just a small sample app
   * For a proper app, more model classes will need to be included.
   * @param {number} productID
   * @memberof ProductsComponent
   */
  increaseQty(productID: number, price: number) {
    this.dataService.insertCart(productID, 1, price).subscribe((d: any) => {
      alert("Added to Cart");
    });
  }
}
