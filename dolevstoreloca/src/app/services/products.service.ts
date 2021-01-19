import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  AllProducts: any
  constructor(public http: HttpClient) { }
  selectedTab = 0

  BaseUrl = "/api/products/"

  getAllProducts() {
    return this.http.get(this.BaseUrl + "allproducts")
  }

}
