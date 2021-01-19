import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CountingproductsService } from './countingproducts.service'
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BaseUrl = "/api/customers/"

  constructor(private http: HttpClient, private count: CountingproductsService) { }

  loggedUser = {
    islogged: false,
    customer_id: 0,
    cart_id: 0,
    customerCartStatus: "",
    last_day: "",
    open_cart: false,
    fname: "",
    role: ""
  }

  submitLogin(body) {
    return this.http.post(this.BaseUrl + 'login', body, {
      headers: { "Content-Type": "application/json" }
    })
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  StartResumeShopping(body) {
    const url = "/api/homepage/startresumeshopping"
    const httpOptions = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    }
    return this.http.post(url, body, httpOptions)
  }


}
