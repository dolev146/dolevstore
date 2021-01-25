import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart.service'
import { CheckoutService } from '../../../../services/checkout.service'
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-checkouttable',
  templateUrl: './checkouttable.component.html',
  styleUrls: ['./checkouttable.component.css']
})   
export class CheckouttableComponent implements OnInit , AfterViewInit {

  constructor( 
    public cart: CartService,
    public checkout: CheckoutService 
  ) { }  
 
  ngOnInit(): void {
    this.checkout.checkoutTableArray = this.cart.CartitmeTableArray
    console.log(this.checkout.checkoutTableArray)   
  } 
  
   ngAfterViewInit() {
     this.getCanvasElement("canvasElement");
  }

  getCanvasElement = (id) => {
    setTimeout(() => {
    const element = document.getElementById(`${id}`)
    console.log(element)
    html2canvas(element).then( (canvas) => {
      this.checkout.canvasHeight = canvas.height * 208 / canvas.width;
      this.checkout.canvasElement = canvas
      console.log(canvas)
      // console.log(canvas.toDataURL('image/png'))
    })  
    }, 0.01);
  }

  displayedColumns: string[] = ['Name', 'Quantity', 'Price'];
 
}
  