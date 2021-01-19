import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart.service'
import { CheckoutService } from '../../../../services/checkout.service'

@Component({
  selector: 'app-checkouttable',
  templateUrl: './checkouttable.component.html',
  styleUrls: ['./checkouttable.component.css']
})   
export class CheckouttableComponent implements OnInit {
              
  constructor( 
    public cart: CartService,
    public checkout: CheckoutService
 
  ) { }  
 
  ngOnInit(): void {
    this.checkout.checkoutTableArray = this.cart.CartitmeTableArray
    console.log(this.checkout.checkoutTableArray)
  }   

  

  displayedColumns: string[] = ['Name', 'Quantity', 'Price'];
 
}
  