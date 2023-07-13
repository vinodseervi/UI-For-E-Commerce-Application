import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handel.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
  };

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialization logic goes here
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        console.log(response);
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'Product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
  
    for (const image of product.productImages) {
      const file = image.file;
      if (file) {
        formData.append('imageFile', file, file.name);
      }
    }
  
    return formData;
  }
  

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
      };

      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number){
    this.product.productImages.splice(i,1);
  }

  fileDropped(fileHandle : FileHandle){
      this.product.productImages.push(fileHandle);
  }
}
