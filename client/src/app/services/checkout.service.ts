import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkoutTableArray;
  searchValueService = "";
  OccupiedDates = []
  order_id: any;



  getInputValueFromDoubleClick(body) {
    let url = "/api/orders/getuserinformationbydoubleclick"
    return this.http.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  PlaceTheOrder(body) {
    let url = "/api/orders/placeorder"
    return this.http.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  getOccupiedDates() {
    let url = "/api/orders/getoccupieddates"
    return this.http.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }


  getRecieptInformation(body) {
    let url = "/api/orders/getrecieptinformation"
    return this.http.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }



}
