import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkoutmainpage',
  templateUrl: './checkoutmainpage.component.html',
  styleUrls: ['./checkoutmainpage.component.css']
})
export class CheckoutmainpageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }    

  goBack() {
    this.router.navigateByUrl("/buyingmainpage")
  }

} 
 