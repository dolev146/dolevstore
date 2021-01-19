import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { DialogaddComponent } from '../dialogadd/dialogadd.component';

@Component({
  selector: 'app-dairyproducts',
  templateUrl: './dairyproducts.component.html',
  styleUrls: ['./dairyproducts.component.css']
})
export class DairyproductsComponent implements OnInit {

  constructor(    public product: ProductsService,
    public dialog: MatDialog,
    public login: LoginService,
    public cart: CartService,
    public admin: AdminService) { }

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
