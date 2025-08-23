import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/Product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct?: Product;
  cartQuantity = 0;   // quantity of the *currently selected* product
  error = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /* ---------- product list ---------- */
  private loadProducts(): void {
    this.dataService.getAllProduct().subscribe({
      next: (products) => {
        this.products = products;
        if (products.length) {
          this.selectProduct(products[0]);
        }
      },
      error: () => (this.error = 'Failed to load products.')
    });
  }

  /* ---------- selection ---------- */
  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.refreshQuantity(product.id);
  }

  /* ---------- quantity helpers ---------- */
  private refreshQuantity(productID: number): void {
    this.dataService.getCartProductQty(productID).subscribe({
      next: (cartRow) => (this.cartQuantity = cartRow.quantity),
      error: () => (this.cartQuantity = 0)        // product not yet in cart
    });
  }

  /* ---------- add / remove ---------- */
  incrementQuantity(productID: number, price: number): void {
    this.dataService.insertCart(productID, 1, price).subscribe(() =>
      this.refreshQuantity(productID)
    );
  }

  decrementQuantity(productID: number): void {
    // read current qty first (might be 0)
    this.dataService.getCartProductQty(productID).subscribe({
      next: (cartRow) => {
        const newQty = Math.max(0, cartRow.quantity - 1);
        const obs = newQty
          ? this.dataService.updateCartQty(productID, newQty)
          : this.dataService.deleteCartByID(productID);

        obs.subscribe(() => this.refreshQuantity(productID));
      }
    });
  }
}