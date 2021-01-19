import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service'
import { ProductsService } from '../../../services/products.service'
import { AdminService } from '../../../services/admin.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public cart: CartService,
    public products: ProductsService,
    public admin: AdminService
  ) { }


  AddForm: FormGroup


  ngOnInit(): void {
    this.AddForm = new FormGroup({
      product_name: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image_url: new FormControl('', Validators.required)
    })
  }

  onADD() {
    console.log(this.AddForm.value)

    this.admin.addProduct(this.AddForm.value).subscribe(
      (res: any) => {
        console.log(res)
        this.AddForm.reset()
        this.cart.isSideNavOpen = false;
        //update list of procuts
        this.products.getAllProducts().subscribe(
          (res: any) => {
            console.log(res)
            this.products.AllProducts = res
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )



  }

  categories = [
    { cname: 'Milk & Dairy', cID: 1 },
    { cname: 'Vegetables & Fruits', cID: 2 },
    { cname: 'Meat & Fish', cID: 3 },
    { cname: 'Wine & Drinks', cID: 4 }
  ]
}  
