import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DevenvService } from './devenv.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient , public env : DevenvService) { }

  CartitmeTableArray = []
  totalPrice: number;
  isSideNavOpen: boolean = false

  BaseUrl = this.env.localHostUrl + "/api/items/"

  addToCart(body) {
    return this.http.post(this.BaseUrl + "addcartitem", body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  GetCartItems(body) {
    return this.http.post(this.BaseUrl + "getallcartitemsbycartid", body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  DeleteItemFromCart(body) {
    return this.http.post(this.BaseUrl + "deletecartitem", body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  ClearCart(body) {
    return this.http.post(this.BaseUrl + "clearitemsfromcart", body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }



}
