import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(
    private productService:ProductService,
    private imgProcessing: ImageProcessingService
  ) { }
  resolve(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot)
     :Observable<Product>  {
    const id=route.paramMap.get("productId");

    if(id){
     return this.productService.getProductDetailsById(id)
     .pipe(
      map(p=>this.imgProcessing.createImages(p))
     );
    }
    else{
      return of(this.getProductDetails());
    }
  }

  getProductDetails(){
    return{
      productId:null,
      productName: '',
      productDescription: '',
      category: '',
      productDiscountedPrice: null,
      productActualPrice: null,
      productImages: [],
      quantity:null
    };
  }

}
