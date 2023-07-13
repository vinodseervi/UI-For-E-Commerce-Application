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
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> {
    const id = route.paramMap.get("ProductId");
    if(id){
      //we have to fatch details to backed
      return this.productService.getProductDetailsById(id)
      .pipe(
        map(p => this.imageProcessingService.createImages(p))
      );

    }else{
      //return empty product Observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails(){
    return{
        productName: "",
        productDescription: "",
        productDiscountedPrice: 0,
        productActualPrice: 0,
        productImages: [],
    }
  }


} 

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
  //   const id = route.paramMap.get("productId");
  //   if (id) {
  //     // Fetch details from the backend
  //     return this.productService.getProductDetailsById(id)
  //       .pipe(
  //         map((products: Product[]) => {
  //           const product = products[0];
  //           if (product) {
  //             console.log(this.imageProcessingService.createImages(product));
  //             return this.imageProcessingService.createImages(product);
  //           } else {
  //             return this.getProductDetails();
  //           }
  //         })
  //       );
  //   } else {
  //     // Return an empty product observable
  //     return of(this.getProductDetails());
  //   }
  // }
  
  

  // getProductDetails(): Product {
  //   return {
  //     productName: "",
  //     productDescription: "",
  //     productDiscountedPrice: 0,
  //     productActualPrice: 0,
  //     productImages: []
  //   };
  // }

