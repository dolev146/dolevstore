import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service'
import { LoginService } from '../../../services/login.service'
import { AdminService } from '../../../services/admin.service'
import { CartService } from '../../../services/cart.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogaddComponent } from '../dialogadd/dialogadd.component';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

  constructor(
    public product: ProductsService,
    public dialog: MatDialog,
    public login: LoginService,
    public cart: CartService,
    public admin: AdminService
  ) { }

  ngOnInit(): void {
  }

  AddToCart(product_id, product_price) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    this.dialog.open(DialogaddComponent, { data: { product_id, product_price } });
  }

  editClicked(item) {
    console.log( item )
    this.admin.itemToEdit = item 
    this.admin.updateEditForm(item)
    this.admin.isEditShow = true;
    this.admin.isAddShow = false;
    this.cart.isSideNavOpen = true;
  }
}
 