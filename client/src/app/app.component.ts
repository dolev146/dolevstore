import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode'
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'dolevstore';

  constructor(  public login: LoginService){ }
  
  ngOnInit(): void {
    window.addEventListener('load', () => {
      try {
       const token = localStorage.access_token ;
        let decoded:any = jwt_decode(token);
        console.log(decoded.exp * 1000 - Date.now());      
        if (Date.now() <= parseInt(decoded.exp) * 1000){
        this.login.loggedUser.fname = decoded.fname
        this.login.loggedUser.role = decoded.role
        this.login.loggedUser.customer_id = decoded.customer_id
        this.login.loggedUser.islogged = true
}
      } catch (error) {
        console.log('loged out user')
      }
    })
   }

}
 