import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map, pipe } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNumber:number = 0;
  productDetails:Product[]=[];
// for showing view more button
  showLoadButton = false;

  constructor(
    private productService:ProductService,
    private imgProcessigService: ImageProcessingService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword:any){
      console.log(searchKeyword);
      this.pageNumber = 0;
      this.productDetails = [];
      this.getAllProducts(searchKeyword);

  }

  public getAllProducts(searchKey:string=""){
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imgProcessigService.createImages(product)))
    )
    .subscribe(
      (resp: Product[])=>{
        console.log(resp);

        // for showing view more button
        if(resp.length == 4){
          this.showLoadButton = true;
        }
        else{
          this.showLoadButton = false;
        }
        //for old product not vanished so we push old data also in productDetails array
        resp.forEach(p=> this.productDetails.push(p));
        
        // this.productDetails=resp;
      },
      (error:HttpErrorResponse)=>{
          console.log(error);
      }
    );
  }

  loadMoreProduct(){
    console.log(this.pageNumber);
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  showProductDetails(productId: any){
    this.router.navigate(['/productViewDetails',{productId:productId}]);
  }

 
}