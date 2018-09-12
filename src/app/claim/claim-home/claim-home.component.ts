import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-claim-home',
  templateUrl: './claim-home.component.html',
  styleUrls: ['./claim-home.component.css']
})
export class ClaimHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.menu .item').tab();
  }

}
