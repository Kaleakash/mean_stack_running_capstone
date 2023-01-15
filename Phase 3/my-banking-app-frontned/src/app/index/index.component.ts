import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    AOS.refresh();
  }

  homePage(){
    this.router.navigate(["home"]).then(()=> {
      window.location.reload();
      window.scrollTo(0,0);
    })
  }
}
