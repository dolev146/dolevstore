import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DevenvService } from './devenv.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient , public env : DevenvService) { }
  BaseUrl = this.env.localHostUrl + "/api/orders"
  checkoutTableArray;
  searchValueService = "";
  OccupiedDates = []
  order_id: any;



  getInputValueFromDoubleClick(body) {
    let url = this.BaseUrl +  "/getuserinformationbydoubleclick"
    return this.http.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  PlaceTheOrder(body) {
    let url = this.BaseUrl +  "/placeorder"
    return this.http.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  getOccupiedDates() {
    let url = this.BaseUrl +  "/getoccupieddates"
    return this.http.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }


  getRecieptInformation(body) {
    let url = this.BaseUrl + "/getrecieptinformation"
    return this.http.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }
}
