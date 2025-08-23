import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';

/**
 * Setup our routes to the different pages. Each route connects to a different component
 * URL: http://localhost:4200/ -> goes to Home page
 * URL: http://localhost:4200/products -> goes to Products page
 * URL: http://localhost:4200/cart -> goes to Cart page
 */

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'product', component: ProductComponent },
    { path: 'cart', component: CartComponent }
];
