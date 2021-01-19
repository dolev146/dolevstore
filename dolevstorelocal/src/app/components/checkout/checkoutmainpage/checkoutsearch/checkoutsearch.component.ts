import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../../../services/checkout.service'
import { CartService } from '../../../../services/cart.service'
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-checkoutsearch',
  templateUrl: './checkoutsearch.component.html',
  styleUrls: ['./checkoutsearch.component.css']
})
export class CheckoutsearchComponent implements OnInit {

  searchItemForm: FormGroup

  constructor(
    public checkout: CheckoutService,
    public sanitizer: DomSanitizer,
    public cart: CartService
  ) { }

  mymodel


  onSearchChange(searchValue: string): void {
    // console.log(searchValue)
    // let Array = [...this.checkout?.checkoutTableArray]
    // this.checkout?.checkoutTableArray.forEach((element, i) => {
    //   let indexOfSearch = element?.product_name.search(`${searchValue}`)
    //   if (indexOfSearch != -1) {
    //     this.checkout.highlightStart = indexOfSearch
    //     this.checkout.highlightLength = searchValue.length 
    //     this.checkout.searchValueService = searchValue;
    //     this.checkout?.stylePositions[i][ indexOfSearch, searchValue.length]


    //     this.checkout.showSearchBackgroundContainer = true;
    //   } else if (searchValue === "") {
    //     console.log("dolev")
    //     this.checkout.showSearchBackgroundContainer = false;
    //   }
    // })


    // let Array = [...this.checkout?.checkoutTableArray]
    // if (searchValue === "") {
    //   Array.forEach(element => {
    //     let indexOfSearch = element?.product_name.search(`<mark>`)
    //     let startString = element.product_name.slice(0, indexOfSearch)
    //     let middleString = element.product_name.slice(indexOfSearch, indexOfSearch + 6)
    //     let endString = element.product_name.slice(indexOfSearch + 6, element.product_name.length )
    //     console.log(startString)
    //     console.log(middleString)
    //     console.log(endString)

    //     let indexOfSearch2 = element?.product_name.search(`</mark>`)
    //     let startString2 = element.product_name.slice(0, indexOfSearch2)
    //     let middleString2 = element.product_name.slice(indexOfSearch2, indexOfSearch2 + 6)
    //     let endString2 = element.product_name.slice(indexOfSearch2 + 6, element.product_name.length - 1)
    //     console.log(startString2)
    //     console.log(middleString2)
    //     console.log(endString2)
    //   })
    // } else {
    //   Array.forEach(element => {
    //     let indexOfSearch = element?.product_name.search(`${searchValue}`)
    //     if (indexOfSearch != -1) {
    //       let startString = element?.product_name.slice(0, indexOfSearch)
    //       let middleString = element?.product_name.slice(indexOfSearch, indexOfSearch + searchValue.length)
    //       let endString = element?.product_name.slice(indexOfSearch + searchValue.length, element.product_name.length)
    //       let result = `${startString}<mark>${middleString}</mark>${endString}`
    //       console.log(element?.product_name)
    //       console.log(indexOfSearch)
    //       console.log(startString)
    //       console.log(middleString)
    //       console.log(endString)
    //       console.log(result)
    //       element.product_name = result
    //     }
    //   });
    //   this.checkout.checkoutTableArray = [...Array]
    // }



  }

  valuechange(searchValue) {
    this.mymodel = searchValue;
    console.log(searchValue)
    if (searchValue === "" || searchValue === undefined) {
      this.checkout.checkoutTableArray = [...this.cart.CartitmeTableArray]
    } else {
      let Array = [...this.cart.CartitmeTableArray]
      Array.forEach((element, i) => {
        console.log(element?.product_name)
        let tempElem = element?.product_name['changingThisBreaksApplicationSecurity'];
        let indexOfSearch
        if (tempElem) {
          indexOfSearch = tempElem?.search(`${searchValue}`)
          if (indexOfSearch != -1) {
            let startString = tempElem.slice(0, indexOfSearch)
            let middleString = tempElem.slice(indexOfSearch, indexOfSearch + searchValue.length)
            let endString = tempElem.slice(indexOfSearch + searchValue.length, element.product_name.length)
            let result = `${startString}<mark>${middleString}</mark>${endString}`
            console.log(element?.product_name)
            console.log(indexOfSearch)
            console.log(startString)
            console.log(middleString)
            console.log(endString)
            console.log(result)
            element.product_name = this.sanitizer.bypassSecurityTrustHtml(result)
          }
        } else {
          indexOfSearch = element?.product_name?.search(`${searchValue}`)
          if (indexOfSearch != -1) {
            let startString = element?.product_name.slice(0, indexOfSearch)
            let middleString = element?.product_name.slice(indexOfSearch, indexOfSearch + searchValue.length)
            let endString = element?.product_name.slice(indexOfSearch + searchValue.length, element.product_name.length)
            let result = `${startString}<mark>${middleString}</mark>${endString}`
            console.log(element?.product_name)
            console.log(indexOfSearch)
            console.log(startString)
            console.log(middleString)
            console.log(endString)
            console.log(result)
            element.product_name = this.sanitizer.bypassSecurityTrustHtml(result)
          }
        }
      })
      this.checkout.checkoutTableArray = [...Array]
    }
  }



  ngOnInit(): void {
    this.searchItemForm = new FormGroup({
      product_name: new FormControl('', Validators.required),
    })
  }

}
