import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent  implements OnInit {
  showTable = false;
  showLoadMoreProductButton = false;
  pageNumber:number = 0;
  productDetails:Product[]=[];

  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price','Images','Edit','Delete'];

  constructor(
    private productService:ProductService,
    public imgDialog: MatDialog,
    private imgProcessigService: ImageProcessingService,
    private router: Router
  ){

  }
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
    
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imgProcessigService.createImages(product)))
    )
    .subscribe(
      (resp: Product[])=>{
       // console.log(resp);
        resp.forEach(product => this.productDetails.push(product));
        console.log(this.productDetails);
        this.showTable = true;

        if(resp.length == 4){
          this.showLoadMoreProductButton = true;
        }
        else{
          this.showLoadMoreProductButton = false;
        }
       // this.productDetails=resp;
      },
      (error:HttpErrorResponse)=>{
          console.log(error);
      }
    );
  }

  loadMoreProduct(){
    this.pageNumber++;
    this.getAllProducts();

  }

  deleteProducts(productId:number){
    this.productService.deleteProducts(productId).subscribe(
      (resp)=>{
        this.getAllProducts();
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }
  showImages(product:Product){
    this.imgDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images:product.productImages
      },
      height:'500px',
      width:'800px'
    });
  }

  editProductDetails(productId: any){
    this.router.navigate(["/addNewProduct",{productId:productId}]);
  }
}
