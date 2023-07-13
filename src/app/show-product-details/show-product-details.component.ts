import { Component , OnInit} from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{
  productDetails : Product[] = [];
  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price','Images','Edit','Delete'];

  constructor(private productService: ProductService, 
    public ImagesDialog : MatDialog, 
    private imageProccessingService : ImageProcessingService,
    private router : Router ){}

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

  deleteProduct(productId :any){
      console.log(productId);
      this.productService.deleteProduct(productId).subscribe(
        (resp)=>{
          console.log(resp);
          this.getAllProduct();
        },
        (error : HttpErrorResponse)=>{
          console.log(error);
        }
      );
  }

  showImages(product : Product){
    console.log(product);
    this.ImagesDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images : product.productImages

      },
      height: '400px',
      width: '800px',
    });
  }

  editProductDetails(productId : any){
    console.log(productId);
    this.router.navigate(['/addNewProduct',{productId: productId}]);

  }

}
