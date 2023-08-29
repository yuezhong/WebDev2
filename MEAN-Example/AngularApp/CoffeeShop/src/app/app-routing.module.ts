import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

/**
 * Setup our routes to the different pages. Each route connects to a different component
 * URL: http://localhost:4200/ -> goes to Home page
 * URL: http://localhost:4200/products -> goes to Products page
 * URL: http://localhost:4200/cart -> goes to Cart page
 */
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
