import { FileHandle } from "./file-handel.model";

export interface Product{
    productName : string,
    productDescription : string,
    productDiscountedPrice : number,
    productActualPrice : number,
    productImages : FileHandle[]

} 