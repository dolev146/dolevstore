import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CountingproductsService {

  BaseUrl = "/api/homepage/"

  constructor(private http: HttpClient) { }

  getAllNumberProducts() {
    return this.http.get(this.BaseUrl + "numberofproducts")
  }

  getCartStatuse() {
    return this.http.get(this.BaseUrl + "cartstatus", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }




}
