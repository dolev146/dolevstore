import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { LoginService } from '../../../services/login.service'
import { CartService } from '../../../services/cart.service'

@Component({
  selector: 'app-dialogadd',
  templateUrl: './dialogadd.component.html',
  styleUrls: ['./dialogadd.component.css']
})
export class DialogaddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogaddComponent>,
    public login: LoginService,
    public cart: CartService
  ) { }

  addToCartForm: FormGroup
  ngOnInit(): void {
    this.addToCartForm = new FormGroup({
      quantity: new FormControl('', Validators.required),
    })
  }

  onAddToCart() {
    const { quantity } = this.addToCartForm.value
    console.log({ quantity, product_id: this.data.product_id, cart_id: this.login.loggedUser.cart_id, General_price: quantity * this.data.product_price })
    let body = { quantity, product_id: this.data.product_id, cart_id: this.login.loggedUser.cart_id, General_price: quantity * this.data.product_price }
    this.cart.addToCart(body).subscribe(
      (res: any) => {
        console.log(res)
        this.cart.GetCartItems({ cart_id: this.login.loggedUser.cart_id }).subscribe(
          (res: any) => {
            this.cart.CartitmeTableArray = res
            this.cart.totalPrice = this.getSum()
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
    this.dialogRef.close()
    this.addToCartForm.reset()
  }


  getSum() { 
    return this.cart.CartitmeTableArray.reduce((currentTotal, item) => {
      return item.General_price + currentTotal
    }, 0)
  }
}   
