import { OrderQuantity } from "./order.quantity.model";

export interface OrderDetails{
    fullName :String ,
    fullAddress: String ,
    gmail: String ,
    contactNumber: String ,
    alternateContactNumber: String ,
    transactionId: string,
    orderProductQuantityList: OrderQuantity[];
}