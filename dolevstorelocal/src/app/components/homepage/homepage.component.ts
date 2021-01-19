import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public login: LoginService) { }

  ngOnInit(): void {
  }
 
}
