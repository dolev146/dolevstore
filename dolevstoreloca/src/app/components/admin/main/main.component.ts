import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../services/admin.service"
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public admin: AdminService) { }

  ngOnInit(): void {
  }

}
