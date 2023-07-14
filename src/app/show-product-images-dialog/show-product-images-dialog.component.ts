import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
 
@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css']
})
export class ShowProductImagesDialogComponent implements OnInit {
  ngOnInit(): void {
    this.receiveImages();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  receiveImages(){
    console.log(this.data.images);
  }

}
