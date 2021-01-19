import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  EditForm: FormGroup
  constructor(private http: HttpClient) {
    this.EditForm = new FormGroup({
      product_name: new FormControl("", Validators.required),
      category_id: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      image_url: new FormControl("", Validators.required)
    })
  }

  isEditShow: boolean = false;
  isAddShow: boolean = false;
  itemToEdit: {
    product_name: "",
    category_id: number,
    price: number,
    image_url: ""
  }

  addProduct(body) {
    return this.http.post('/api/products/' + "addproduct", body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.access_token
      }
    })
  }

  updateEditForm(item) {
    this.EditForm.controls['product_name'].setValue(item.product_name)
    this.EditForm.controls['category_id'].setValue(item.category_id)
    this.EditForm.controls['price'].setValue(item.price)
    this.EditForm.controls['image_url'].setValue(item.image_url)
  }
}
