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
    return this.httpClient.post<Product>("http://103.116.86.167:9090/addNewProduct", product)
  }
  public getAllProducts(pageNumber: number, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>("http://103.116.86.167:9090/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchKeyword);
  }

  public deleteProducts(productId: number) {
    return this.httpClient.delete("http://103.116.86.167:9090/deleteProductDetails/" + productId);
  }

  public getProductDetailsById(productId: string) {
    return this.httpClient.get<Product>("http://103.116.86.167:9090/getProductDetailsById/" + productId);

  }

  public getProductDetails(isSingleProductCheckout: any, productId: any) {
    return this.httpClient.get<Product[]>("http://103.116.86.167:9090/getProductDetails/" + isSingleProductCheckout + "/" + productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout : any) {
    return this.httpClient.post("http://103.116.86.167:9090/placeOrder/"+isCartCheckout , orderDetails);
  }

  public addToCart(productId: any) {
    return this.httpClient.get("http://103.116.86.167:9090/addToCart/" + productId);
  }

  public getCartDetails() {
    return this.httpClient.get("http://103.116.86.167:9090/getCartDetails");
  }


  public deleteCartItem(cartId:any){
    return this.httpClient.delete("http://103.116.86.167:9090/deleteCartItem/"+cartId);
  }

  public getMyOders(): Observable<myOrderDetails[]>{
    return this.httpClient.get<myOrderDetails[]>("http://103.116.86.167:9090/getOrderDetails");
  }

  public getAllOrderDetailsForAdmin(status:any): Observable<myOrderDetails[]>{
    return this.httpClient.get<myOrderDetails[]>("http://103.116.86.167:9090/getAllOrderDetails/"+status);
  }

  public markAsDelivered(orderId:any){
    return this.httpClient.get("http://103.116.86.167:9090/markOrderAsDelivered/"+orderId);
  }

  public createTransaction(amount:number){
    return this.httpClient.get("http://103.116.86.167:9090/createTransaction/"+amount);
  }

}
