import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../../../../services/checkout.service'
import { LoginService } from '../../../../services/login.service'
import { CartService } from '../../../../services/cart.service'
import { validateDate } from 'src/app/validators/validateDate.validators';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-checkoutorder',
  templateUrl: './checkoutorder.component.html',
  styleUrls: ['./checkoutorder.component.css']
})
export class CheckoutorderComponent implements OnInit {

  constructor(public router: Router,
    public checkout: CheckoutService,
    public login: LoginService,
    private snackBar: MatSnackBar,
    public cart: CartService
  ) { }

  myFilter = (d: Date): boolean => {
    console.log('dolev filter')
    const time = d.getTime()
    return !this.checkout?.OccupiedDates.find(x => {
      console.log('time ', time)
      console.log('checkout ', x)
      return x == time
    })
  }


  orderForm: FormGroup



  ngOnInit(): void {
    this.checkout.getOccupiedDates().subscribe(
      (res: any) => {
        console.log("dolev on innit")
        console.log(res)
        this.checkout.OccupiedDates = res.map(e => new Date(e.date_for_delivery).getTime() - 7200000)
        console.log(this.checkout.OccupiedDates)
      }
    )

    this.orderForm = new FormGroup({
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      date_for_delivery: new FormControl('', [Validators.required, validateDate]),
      four_digits: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }


 

  onOrder = async () => {
    console.log(this.orderForm.value)
    console.log(this.orderForm.errors)
    let valueDate = await this.datestring(this.orderForm.value.date_for_delivery)
    let todayDate = await this.datestring(new Date())
    console.log(this.orderForm.value.date_for_delivery)
    console.log(valueDate)
    console.log(todayDate)
    let bodyOBJ = {
      customer_id: this.login.loggedUser.customer_id,
      cart_id: this.login.loggedUser.cart_id,
      total_price: this.cart.totalPrice,
      city: this.orderForm.value.city,
      street: this.orderForm.value.street,
      date_for_delivery: valueDate,
      date_of_purchase: todayDate,
      four_digits: this.orderForm.value.four_digits
    }
    this.checkout.PlaceTheOrder(bodyOBJ).subscribe(
      (res: any) => {
        console.log(res)
        this.router.navigateByUrl("/checkoutsuccess")
      },
      err => {
        console.log(err)
        this.snackBar.open('something went wrong, contact the developers', 'dismiss', { duration: 4000 })
      }
    )
  }


  datestring = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return (year + '-' + month + '-' + dt);
  }


  getInputValue(input_name) {
    console.log(input_name)
    this.checkout.getInputValueFromDoubleClick({ customer_id: this.login.loggedUser.customer_id }).subscribe(
      (res: any) => {
        console.log(res)
        this.orderForm.controls[`${input_name}`].setValue(res[0][`${input_name}`])
      },
      err => console.log(err)
    )
  }

}  
