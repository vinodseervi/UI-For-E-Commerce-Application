import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { myOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  displayedColumns: string[] = ['id','Name', 'Address', 'ContactNumber','AlternateNumber','Amount','Status','Action'];

  dataSource  = [];
  status: string = "All";

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter:string){
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (response:any) => {
        console.log(response);
        this.dataSource = response;
      },
      (error:any) => {
        console.log(error);
      }
    );

  }

  markAsDelivered(orderId:any){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response)=>{
        console.log(response);
        this.getAllOrderDetailsForAdmin(this.status);
      },
      (error)=>{
        console.log(error);
      }
    );

  }
  

}
