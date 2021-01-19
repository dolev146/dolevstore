import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { SearchService } from 'src/app/services/search.service';
import { DialogaddComponent } from '../dialogadd/dialogadd.component';

 
@Component({
  selector: 'app-searchproducts',
  templateUrl: './searchproducts.component.html',
  styleUrls: ['./searchproducts.component.css']
})
export class SearchproductsComponent implements OnInit {

  constructor( public search: SearchService,
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
