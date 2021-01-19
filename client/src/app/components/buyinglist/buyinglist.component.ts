import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { LoginService } from '../../services/login.service'
import { AdminService } from '../../services/admin.service'
import { ProductsService } from '../../services/products.service'
import { SearchService } from '../../services/search.service'
@Component({
  selector: 'app-buyinglist',
  templateUrl: './buyinglist.component.html',
  styleUrls: ['./buyinglist.component.css']
})
export class BuyinglistComponent implements OnInit {

  constructor(public search:SearchService,public cart: CartService, public product: ProductsService, public login: LoginService, public admin: AdminService) { }




  ngOnInit(): void {
    this.product.getAllProducts().subscribe(
      (res: any) => {
        console.log(res)
        this.product.AllProducts = res
      },
      err => console.log(err))
  }

  logChange(i) {
    console.log(i)
  }

 
  toggleSideNav() {
    this.cart.isSideNavOpen = !this.cart.isSideNavOpen
  }

  AddItem() {
    this.admin.isEditShow = false;
    this.admin.isAddShow = true;
    this.cart.isSideNavOpen = !this.cart.isSideNavOpen
  }

}
