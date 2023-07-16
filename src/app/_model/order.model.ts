import { Product } from "./product.model";

export interface myOrderDetails{
    orderId:number;
    orderFullName:string;
    orderFullOrder:string;
    orderContactNumber:number;
    orderAlternateContactNumber:number;
    orderAmount:number;
    orderStatus:string;
    product:Product;
    user:any;
}