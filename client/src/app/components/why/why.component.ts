import { Component, OnInit } from '@angular/core';
import { DevenvService } from 'src/app/services/devenv.service';

@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.css']
})
export class WhyComponent implements OnInit { 

  constructor(public env: DevenvService) { }

  ngOnInit(): void {
  }

}
