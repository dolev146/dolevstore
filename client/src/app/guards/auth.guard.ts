import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service'
import jwt_decode from 'jwt-decode'
import { CountingproductsService } from '../services/countingproducts.service';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private login: LoginService,
    private router: Router,
    private count: CountingproductsService,
    public cart: CartService
  ) { }

    getSum() {
    return this.cart.CartitmeTableArray.reduce((currentTotal, item) => {
      return item.General_price + currentTotal
    }, 0)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    
    if (this.login.loggedUser.islogged) {
      return true;
    } else if (localStorage.access_token) {
      const token = localStorage.access_token;
      let decoded: any = jwt_decode(token);
      console.log(decoded.exp * 1000 - Date.now());
      if (Date.now() <= parseInt(decoded.exp) * 1000) {
        this.login.loggedUser.fname = decoded.fname
        this.login.loggedUser.role = decoded.role
        this.login.loggedUser.customer_id = decoded.customer_id
        this.login.loggedUser.islogged = true;
        this.count.getCartStatuse().subscribe(
          (res: any) => {
            this.login.loggedUser.customerCartStatus = res.customerCartStatus
            let req_body = { customerCartStatus: this.login.loggedUser.customerCartStatus, customer_id: this.login.loggedUser.customer_id }            
            this.login.StartResumeShopping(req_body).subscribe(
              (res: any) => {
                this.login.loggedUser.cart_id = res.cart_id                
                this.cart.GetCartItems({ "cart_id": res.cart_id }).subscribe(
                  (res: any) => {
                this.cart.CartitmeTableArray = res
                    this.cart.totalPrice = this.getSum()
                            return true;
                   }
                 )                
              }
            )            
          }
        )
      } else {
        return false;
      }
    }

  }
}