import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-buyingcarttable',
  templateUrl: './buyingcarttable.component.html',
  styleUrls: ['./buyingcarttable.component.css']
})
export class BuyingcarttableComponent implements OnInit {

  constructor(public cart: CartService,
    public login: LoginService,
    public router: Router
  ) { }


 
  ngOnInit(): void {
    // this.cart.GetCartItems({ "cart_id": this.login.loggedUser.cart_id }).subscribe(
    //   (res: any) => {
    //     this.cart.CartitmeTableArray = res
    //     this.cart.totalPrice = this.getSum()
    //   },
    //   err => console.log(err)
    // )
  }

  getSum() {
    return this.cart.CartitmeTableArray.reduce((currentTotal, item) => {
      return item.General_price + currentTotal
    }, 0)
  }

  displayedColumns: string[] = ['Name', 'Quantity', 'Price', 'Actions'];

  removeItemFromCart(item_id) {
    console.log({ item_id })
    this.cart.DeleteItemFromCart({ item_id }).subscribe(
      (res: any) => {
        console.log(res)

      }, 
      err => console.log(err)
    )
    this.cart.GetCartItems({ "cart_id": this.login.loggedUser.cart_id }).subscribe(
      (res: any) => {
        console.log(res)
        this.cart.CartitmeTableArray = res
        this.cart.totalPrice = this.getSum()
      },
      err => console.log(err)
    )
  }

  deleteAllCartItems() {
    this.cart.ClearCart({ cart_id: this.login.loggedUser.cart_id }).subscribe(
      (res: any) => {
        console.log(res)
        this.cart.CartitmeTableArray = []
        this.cart.totalPrice = this.getSum()
      },
      err => console.log(err)
    )
  } 

  proceed_to_checkout() {
    this.cart.isSideNavOpen = !this.cart.isSideNavOpen
    this.router.navigateByUrl("/checkoutmainpage")
  }
} 
