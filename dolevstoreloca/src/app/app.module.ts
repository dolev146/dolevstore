import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { Eror404Component } from './components/eror404/eror404.component';
import { LoginComponent } from './components/login/login.component';
import { WhyComponent } from './components/why/why.component';
import { CoutingproductsComponent } from './components/coutingproducts/coutingproducts.component';
import { RegisterComponent } from './components/register/register.component';
import { BuyinglistComponent } from './components/buyinglist/buyinglist.component';
import { BuyingcartlistComponent } from './components/buyingcartlist/buyingcartlist.component';
import { BuyingsearchComponent } from './components/buyingsearch/buyingsearch.component';
import { BuyingmainpageComponent } from './components/buyingmainpage/buyingmainpage.component';
import { CardlistComponent } from './components/cardlist/cardlist.component';
import { AllproductsComponent } from './components/products/allproducts/allproducts.component';
import { DairyproductsComponent } from './components/products/dairyproducts/dairyproducts.component';
import { FruitsproductsComponent } from './components/products/fruitsproducts/fruitsproducts.component';
import { MeatproductsComponent } from './components/products/meatproducts/meatproducts.component';
import { WineproductsComponent } from './components/products/wineproducts/wineproducts.component';
import { SearchproductsComponent } from './components/products/searchproducts/searchproducts.component';
import { DialogaddComponent } from './components/products/dialogadd/dialogadd.component';
import { BuyingcarttableComponent } from './components/buyingcarttable/buyingcarttable.component';
import { CheckoutmainpageComponent } from './components/checkout/checkoutmainpage/checkoutmainpage.component';
import { BuyingsidenavadminComponent } from './components/buyingsidenavadmin/buyingsidenavadmin.component';
import { MainComponent } from './components/admin/main/main.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { AddComponent } from './components/admin/add/add.component';
import { CheckouttableComponent } from './components/checkout/checkoutmainpage/checkouttable/checkouttable.component';
import { CheckoutorderComponent } from './components/checkout/checkoutmainpage/checkoutorder/checkoutorder.component';
import { CheckoutsearchComponent } from './components/checkout/checkoutmainpage/checkoutsearch/checkoutsearch.component';
import { CheckoutsuccessComponent } from './components/checkout/checkoutmainpage/checkoutsuccess/checkoutsuccess.component';
import { SafepipePipe } from './pipes/safepipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    Eror404Component,
    LoginComponent,
    WhyComponent,
    CoutingproductsComponent,
    RegisterComponent,
    BuyinglistComponent,
    BuyingcartlistComponent,
    BuyingsearchComponent,
    BuyingmainpageComponent,
    CardlistComponent,
    AllproductsComponent,
    DairyproductsComponent,
    FruitsproductsComponent,
    MeatproductsComponent,
    WineproductsComponent,
    SearchproductsComponent,
    DialogaddComponent,
    BuyingcarttableComponent,
    CheckoutmainpageComponent,
    BuyingsidenavadminComponent,
    MainComponent,
    EditComponent,
    AddComponent,
    CheckouttableComponent,
    CheckoutorderComponent,
    CheckoutsearchComponent,
    CheckoutsuccessComponent,
    SafepipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
