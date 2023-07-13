import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails : Product[] = [];

  constructor(private productService : ProductService, private imageProccessingService : ImageProcessingService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct(){
    this.productService.getAllProduct()
    .pipe(
      map((x : Product[], i) =>  x.map((product : Product) => this.imageProccessingService.createImages(product)))
    )
      .subscribe(
      (resp: Product[])=>{
        console.log(resp);
        this.productDetails = resp;
      },(error : HttpErrorResponse) =>{
        console.log(error);
      }
      );
    
  }

  showProductDetails(ProductId : any){
      this.router.navigate(['/productViewDetails', {productId: ProductId}]);
  }

}
