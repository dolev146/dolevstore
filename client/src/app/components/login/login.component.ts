import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { CartService } from '../../services/cart.service'
import { CountingproductsService } from '../../services/countingproducts.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  loginForm: FormGroup
  constructor(
    public login: LoginService,
    public router: Router,
    private count: CountingproductsService,
    private snackBar: MatSnackBar,
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }
  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 2000 })
    snackBarRef.afterDismissed().subscribe(() => {
    })
    snackBarRef.onAction().subscribe(() => {
    })
  }

  onLogin() {
    this.login.submitLogin(this.loginForm.value).subscribe((res: any) => {
      console.log(res)
      this.login.loggedUser.customer_id = res.customer_id;
      this.login.loggedUser.islogged = true;
      let tokenInfo = this.login.getDecodedAccessToken(res.access_token)
      this.login.loggedUser.fname = tokenInfo.fname
      this.login.loggedUser.role = tokenInfo.role
      this.storeTokens(res.access_token, res.refresh_token)
      this.count.getCartStatuse().subscribe((res: any) => {
        console.log(res.customerCartStatus)
        this.login.loggedUser.customerCartStatus = res.customerCartStatus
      },
        err => console.log(err))
    },
      err => {
        this.snackBar.open('user not found please try diffrent email or password', 'dismiss', { duration: 4000 })
      }
    )
  }



  storeTokens(access_token, refresh_token) {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
  }

  async startShopping() {
    let req_body = { customerCartStatus: this.login.loggedUser.customerCartStatus, customer_id: this.login.loggedUser.customer_id }
    await this.login.StartResumeShopping(req_body).subscribe(
      (res: any) => {
        console.log(res)
        this.login.loggedUser.cart_id = res.cart_id
        this.cart.GetCartItems({ "cart_id": res.cart_id }).subscribe(
          (res: any) => {
            this.cart.CartitmeTableArray = res
            this.cart.totalPrice = this.getSum()
          },
          err => console.log(err)
        )
        this.router.navigateByUrl('/buyingmainpage')
      },
      err => console.log(err)
    )
  }


  getSum() {
    return this.cart.CartitmeTableArray.reduce((currentTotal, item) => {
      return item.General_price + currentTotal
    }, 0)
  }
}
