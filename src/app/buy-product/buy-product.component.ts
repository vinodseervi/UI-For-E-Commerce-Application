import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{
 
  errorMessage: string = '';
  successMessage: string='';
  productDetails:Product[]=[];
  isSingleProductCheckout:any = '';


  ngOnInit(): void {
    this.productDetails= this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach(x=> this.orderDetails.orderProductQuantityList.push(
      {productId:x.productId,quantity:5}
    ));
    console.log(this.productDetails);
     console.log(this.orderDetails);
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ){}

  orderDetails:OrderDetails={
    fullName: '',
    fullAddress: '', 
    gmail: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  public placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp: any)=>{
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      },
      (err: any)=>{
        console.log(err);
      }
    );
  }

  getQuantityForProduct(productId: any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
      console.log(filteredProduct[0].quantity);
    return filteredProduct[0].quantity;

  }

  getcalculatedTotal(productId: any, productDiscountedPrice: any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

   return  filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChange(q:any ,productId:any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal(){
    let grandTotal =0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuanity) => {
        const price = this.productDetails.filter(product => product.productId == productQuanity.productId)[0].productDiscountedPrice;
       grandTotal = grandTotal +  price * productQuanity.quantity;
      }
    );

    return grandTotal;
  }
}

