import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service'
import { ProductsService } from '../../services/products.service'
@Component({
  selector: 'app-buyingsearch',
  templateUrl: './buyingsearch.component.html',
  styleUrls: ['./buyingsearch.component.css']
})
export class BuyingsearchComponent implements OnInit {
  searchItemForm: FormGroup

  constructor(public search: SearchService,
    public products: ProductsService) { }

  ngOnInit(): void {
    this.searchItemForm = new FormGroup({
      product_name: new FormControl('', Validators.required),
    })
  }

  onsearchItem() {
    this.search.Search(this.searchItemForm.value).subscribe(
      (res: any) => {
        console.log(res)
        this.search.searchResultArray = res;
        this.search.matTabDisabled = false;
        this.products.selectedTab = 5 
      },
      err => console.log(err)
    )
  }

}
