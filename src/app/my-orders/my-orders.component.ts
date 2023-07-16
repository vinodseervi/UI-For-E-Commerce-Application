import { Component , OnInit} from '@angular/core';
import { ProductService } from '../_services/product.service';
import { myOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Address', 'ContactNumber','AlternateNumber','Amount','Status'];

  myOrderDetails:myOrderDetails[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productService.getMyOders().subscribe(
      (response: myOrderDetails[]) => {
        console.log(response);

        this.myOrderDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
