import { Component, OnInit } from '@angular/core';
import { Airline } from '../airline';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
airlinetData:Array<Airline>=[
new Airline("IB","Iberia",10),
new Airline("BA","British Airways",15),
new Airline("LH","Lufthansa",7),
new Airline("FR","Ryanair",20),
new Airline("VY","Vueling",10),
new Airline("TK","Turkish Airlines",5),
new Airline("U2","Easyjet",19.90),
]
  constructor() { }

  ngOnInit(): void {
  }

}
