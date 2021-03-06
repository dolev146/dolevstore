import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DevenvService } from './devenv.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient , public env : DevenvService) { }

  Url = this.env.localHostUrl + "/api/products/searchproductbyname"

  matTabDisabled: boolean = true;

  searchResultArray: [
    { product_id: number, product_name: string, category_id: number, price: number, image_url: string }
  ]

  Search(body) {
    return this.http.post(this.Url, body, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  }




}
