import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
// import Razorpay from 'razorpay';

declare var Razorpay: any;


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
    transactionId: '',
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

  createTransactionAndPlaceOrder(orderForm:NgForm){
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response)=>{
        console.log(response);
        this.openTransaction(response, orderForm);
      },
      (error)=>{
        console.log(error);
      }

    );
  }

  openTransaction(response:any, orderForm: any){
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Bharat Communcation',
      description: 'payment of online shopping',
      image: 'https://cdn.pixabay.com/photo/2023/07/11/08/49/cat-8119896_640.jpg',
      handler: (response:any) =>{
        if(response != null && response.razorpay_payment_id != null){
        this.processPreponse(response, orderForm);
        }else{
          alert("Payment faild..")
        }
      },
      prefil: {
        name: 'LPY',
        email: 'LPY@gmail.com',
        contact: '90909090',
      },
      notes: {
        address: 'Online shopping'
      },
      theme: {
        color :'#F37254'
      }
    };

   var rezorPayObject = new Razorpay(options);
   rezorPayObject.open();
  }

  processPreponse(resp:any, orderForm: NgForm){
    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);
    console.log(resp);
  }


}

