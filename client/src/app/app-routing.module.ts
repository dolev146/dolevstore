import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Eror404Component } from './components/eror404/eror404.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { BuyingmainpageComponent } from './components/buyingmainpage/buyingmainpage.component'
import { AuthGuard } from './guards/auth.guard';
import { CheckoutmainpageComponent } from './components/checkout/checkoutmainpage/checkoutmainpage.component';
import { CheckoutsuccessComponent } from './components/checkout/checkoutmainpage/checkoutsuccess/checkoutsuccess.component';

const routes: Routes = [
  { path: "home", component: HomepageComponent },
  { path: "register", component: RegisterComponent },
  { path: "buyingmainpage", component: BuyingmainpageComponent , canActivate : [AuthGuard] },
  { path: "checkoutmainpage", component: CheckoutmainpageComponent , canActivate : [AuthGuard] },
  { path: "checkoutsuccess", component: CheckoutsuccessComponent , canActivate : [AuthGuard] },
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "**", component: Eror404Component },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
