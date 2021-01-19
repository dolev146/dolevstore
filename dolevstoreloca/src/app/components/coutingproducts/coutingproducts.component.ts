import { Component, OnInit } from '@angular/core';
import { CountingproductsService } from "../../services/countingproducts.service"
import { LoginService } from "../../services/login.service"

@Component({
  selector: 'app-coutingproducts',
  templateUrl: './coutingproducts.component.html',
  styleUrls: ['./coutingproducts.component.css']
})
export class CoutingproductsComponent implements OnInit {

  constructor(
    public count: CountingproductsService,
    public login: LoginService
  ) { }

  total_NumberOfOrders

  total_NumberOfProducts
 
  ngOnInit(): void {
    this.count.getAllNumberProducts().subscribe((res: any) => {
      this.total_NumberOfOrders = res.total_NumberOfOrders;
      this.total_NumberOfProducts = res.total_NumberOfProducts;
    },
      err => console.log(err)
    ) 
  } 

 





 
}
