// Import required modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './models/Products';
import { Cart } from './models/Cart';

/**
 * DataService class for linking REST API calls
 * from Angular App to the NodeJS express server
 * @export
 * @class DataService
 */
@Injectable()

export class DataService {

  // Setup URL connection to REST API
  private url:string = "http://localhost:3060/api/";
  constructor (private http:HttpClient){
  }

/*****************************************************************************************************
 * Product Table
 */

  /**
   * Get all Products
   * Sample URL used: http://localhost:3060/api/product
   * @return {*}  {Observable<Products>}
   * @memberof DataService
   */
  public getAllProducts(): Observable<Products> {
    return this.http.get<Products>(this.url + "product");
  }

  /**
   * GET Product by id
   * Sample URL used: http://localhost:3060/api/product/1
   * @param {number} id
   * @return {*}  {Observable<Products>}
   * @memberof DataService
   */
  public getProductsByID(id:number): Observable<Products> {
    return this.http.get<Products>(this.url + "product/" + id);
  }

  /**
   * Insert a product
   * Sample URL used: http://localhost:3060/api/product
   * @param {string} name
   * @param {string} description
   * @param {image} image
   * @param {number} price
   * @return {*}  {Observable<Products>}
   * @memberof DataService
   */
  public insertProduct(name:string, description:string, image:string, price:number): Observable<Products> {
    return this.http.post<Products>(this.url, { "name": name,"description": description, "image": image, "price": price });
  }

  /**
   * Delete a product by ID
   * Sample URL used: http://localhost:3060/api/product/1
   * @param {number} id
   * @return {*}  {Observable<Products>}
   * @memberof DataService
   */
  public deleteProductByID(id:number): Observable<Products> {
    return this.http.delete<Products>(this.url + "product/" + id);
  }

/*****************************************************************************************************
 * Cart Table
 */
  /**
   * Get all items from Cart
   * Sample URL used: http://localhost:3060/api/cart
   * @return {*}  {Observable<Cart>}
   * @memberof DataService
   */
  public getAllCart(): Observable<Cart> {
    return this.http.get<Cart>(this.url+ "cart/");
  }

  /**
   * Get quantity by ID
   * Sample URL used: http://localhost:3060/api/cart/quantity/1
   * @param {number} id
   * @return {*}  {Observable<Cart>}
   * @memberof DataService
   */
  public getCartProductQty(id:number): Observable<Cart> {
    return this.http.get<Cart>(this.url + "cart/quantity/" + id);
  }


  /**
   * Get all the data from joining table Cart and Product
   * @return {*}  {Observable<any>}
   * @memberof DataService
   */
  public getCartProducts(): Observable<any> {
    return this.http.get<any>(this.url+ "cart/products");
  }

  /**
   * Insert an item into the Cart
   * Sample URL used: http://localhost:3060/api/cart
   * @param {number} productID
   * @param {number} quantity
   * @param {number} price
   * @return {*}  {Observable<Cart>}
   * @memberof DataService
   */
  public insertCart(productID: number, quantity: number, price: number): Observable<Cart> {
    return this.http.post<Cart>(this.url + "cart", { "productID": productID, "quantity": quantity, "price": price });
  }

  /**
   * Delete a product from Cart by ID
   * Sample URL used: http://localhost:3060/api/cart/1
   * @param {number} id
   * @return {*}  {Observable<Products>}
   * @memberof DataService
   */
  public deleteCartByID(id:number): Observable<Cart> {
    return this.http.delete<Cart>(this.url + "cart/" + id);
  }

  /**
   * Update a cart quantity by ID
   * Sample URL used: http://localhost:3060/api/cart
   * @param {number} productID
   * @param {number} quantity
   * @return {*}  {Observable<Products>}
   * @memberof DataService
   */
  public updateCartQty(productID: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(this.url + "cart", { "productID": productID, "quantity": quantity });
  }

}
