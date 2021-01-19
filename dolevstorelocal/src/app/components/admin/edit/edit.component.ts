import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service'
import { CartService } from '../../../services/cart.service'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    public cart: CartService,
    public products: ProductsService,
    public admin: AdminService

  ) { } 
 

  ngOnInit(): void {
  
  }
  onEdit(){

  }

  categories = [
    { cname: 'Milk & Dairy', cID: 1 },
    { cname: 'Vegetables & Fruits', cID: 2 },
    { cname: 'Meat & Fish', cID: 3 },
    { cname: 'Wine & Drinks', cID: 4 }
  ]
  

}
