import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service'
import { CartService } from '../../../../services/cart.service'
import { CheckoutService } from '../../../../services/checkout.service'
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-checkoutsuccess',
  templateUrl: './checkoutsuccess.component.html',
  styleUrls: ['./checkoutsuccess.component.css']
})
export class CheckoutsuccessComponent implements OnInit {

  constructor(public router: Router,
    public login: LoginService,
    public checkout: CheckoutService,
    public cart: CartService
  ) { }

  ngOnInit(): void {
  }


  async startShopping() {
    this.login.loggedUser.customerCartStatus = 'new_cart'
    let req_body = { customerCartStatus: 'new_cart', customer_id: this.login.loggedUser.customer_id }
    await this.login.StartResumeShopping(req_body).subscribe(
      (res: any) => {
        console.log(res)
        this.login.loggedUser.cart_id = res.cart_id
        this.cart.GetCartItems({ "cart_id": res.cart_id }).subscribe(
          (res: any) => {
            this.cart.CartitmeTableArray = res
            this.cart.totalPrice = this.getSum()
          },
          err => console.log(err)
        )
        this.router.navigateByUrl('/buyingmainpage')
      },
      err => console.log(err)
    )
  }



  getSum() {
    return this.cart.CartitmeTableArray.reduce((currentTotal, item) => {
      return item.General_price + currentTotal
    }, 0)
  }







  order_id;
  total_price;
  city;
  street;
  date_for_delivery;
  date_of_purchase;
  four_digits;
  fname;
  lname;
  products;
  htmlProducts

  getData() {
    const dataOBj = {
      cart_id: this.login.loggedUser.cart_id,
      customer_id: this.login.loggedUser.customer_id,
    }
    this.checkout.getRecieptInformation(dataOBj).subscribe(
      (res: any) => {
        console.log(res)
        this.order_id = res.order_details[0].order_id
        this.total_price = res.order_details[0].total_price
        this.city = res.order_details[0].city
        this.street = res.order_details[0].street
        this.date_for_delivery = res.order_details[0].date_for_delivery
        this.date_of_purchase = res.order_details[0].date_of_purchase
        this.four_digits = res.order_details[0].four_digits
        this.fname = res.customer_details[0].fname
        this.lname = res.customer_details[0].lname
        this.products = res.cart_items

        this.htmlProducts = this.products.map(item => {
          return (
            `<tr>
                <td>
                    ${item.product_name}
                </td>
                <td>
                ${item.quantity}
                </td>
                <td>
                ${item.General_price}
                </td>
             </tr> 
            `
          )
        })
        this.downloadPDF()
      },
      err => console.log(err)
    )
  }



  downloadPDF() {
    let doc = new jsPDF();
    let htmlElement2 = `<body>
                <h6>Order_number:${this.order_id}</h6>
                <table>
                <tr>
                    <td>
                      <h6>Name:${this.fname + "_" + this.lname}</h6>
                    </td>
                    <td>
                      <h6>OrderD:${this.date_of_purchase}</h6>
                    </td>
                </tr>
                <tr>
                <td>
                    <h6>Delivery:${this.date_for_delivery}</h6>
                    </td>
                </tr>                
                <tr>
                 <td>
                    <h6>Adress:${this.city + " " + this.street}</h6>
                    </td>
                </tr>
                <tr>
                <td>
                <h6>Digits${this.four_digits}</h6>
               </td>
                </tr>
                </table>
                <br/>
                <br/>
        <table>
            <tr>
                <td>item_Name</td>
                <td>Qnt</td>
                <td>Price</td>
                ${this.htmlProducts}
            </tr>
          
        </table>
<br/>
        <h6>Total_Price:${this.total_price}</h6>
</body>
`

    doc.html(htmlElement2, {
      callback: function (doc) {
        doc.save(`order.pdf`);
      },
      x: 10,
      y: 10,
    })


  }

}
