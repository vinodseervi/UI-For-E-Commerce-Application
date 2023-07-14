import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../_model/category.model';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  isNewProduct=true;
[x: string]: any;
  errorMessage: string = '';

  product: Product={
    productId:null,
    productName: '',
    productDescription: '',
    category: '',
    productDiscountedPrice: null,
    productActualPrice: null,
    productImages: [],
    quantity:null
  }
  successMessage: string='';

  constructor(
    private productService:ProductService,
    private sanitizer:DomSanitizer,
    private activateRoute: ActivatedRoute,
    private router: Router

  ){}
  ngOnInit(): void {
    this.product=this.activateRoute.snapshot.data['product'];
    if (this.product && this.product.productId) {
       this.isNewProduct=false;
    }
  }
  
  categoryDetails: Category[] = [];

  addProduct(productForm: NgForm) {
    if (
      this.product.productName === '' ||
      this.product.productDescription === '' ||
      this.product.category === ''||
      this.product.quantity===null||
      this.product.productActualPrice === null ||
      this.product.productDiscountedPrice === null ||
      this.product.productImages.length === null
    ) {
      this.errorMessage = 'All fields are required';
    } else {
      this.errorMessage = '';
      const productFormData = this.prepareFormData(this.product);
      this.productService.addProduct(productFormData).subscribe(
        (response: Product) => {
          productForm.reset();
          this.product.productImages=[];
          this.showSuccessMessage('Product added successfully');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }
  
  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 2000); // Adjust the duration (in milliseconds) as per your requirement
  }


  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }
  

  onFileSelected(event:any){
    if(event.target.files){
     const file= event.target.files[0];

     const fileHandle: FileHandle={
       file: file,
       url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
       )
     }
     this.product.productImages.push(fileHandle);

    }
  }

  removeImage(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle:FileHandle){
    this.product.productImages.push(fileHandle);
  }
}