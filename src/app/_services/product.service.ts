import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { myOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }



  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product)
  }
  public getAllProducts(pageNumber: number, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchKeyword);
  }

  public deleteProducts(productId: number) {
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/" + productId);
  }

  public getProductDetailsById(productId: string) {
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/" + productId);

  }

  public getProductDetails(isSingleProductCheckout: any, productId: any) {
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/" + isSingleProductCheckout + "/" + productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout : any) {
    return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout , orderDetails);
  }

  public addToCart(productId: any) {
    return this.httpClient.get("http://localhost:9090/addToCart/" + productId);
  }

  public getCartDetails() {
    return this.httpClient.get("http://localhost:9090/getCartDetails");
  }


  public deleteCartItem(cartId:any){
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public getMyOders(): Observable<myOrderDetails[]>{
    return this.httpClient.get<myOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }





}
