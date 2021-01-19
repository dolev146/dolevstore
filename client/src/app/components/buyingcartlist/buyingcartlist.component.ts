import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-buyingcartlist',
  templateUrl: './buyingcartlist.component.html',
  styleUrls: ['./buyingcartlist.component.css']
})
export class BuyingcartlistComponent implements OnInit {

  constructor(public cart: CartService,
    public login: LoginService) { } 
 
  ngOnInit(): void {

  }

}
