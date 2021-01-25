import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DevenvService } from './devenv.service';

@Injectable({
  providedIn: 'root'
})
export class CountingproductsService {
  constructor(private http: HttpClient , public env : DevenvService ) { }

  BaseUrl = this.env.localHostUrl + "/api/homepage/"


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
