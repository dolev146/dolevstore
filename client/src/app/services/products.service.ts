import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DevenvService } from './devenv.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  AllProducts: any
  constructor(public http: HttpClient , public env : DevenvService) { }
  selectedTab = 0

  BaseUrl = this.env.localHostUrl + "/api/products/"

  getAllProducts() {
    return this.http.get(this.BaseUrl + "allproducts")
  }

}
