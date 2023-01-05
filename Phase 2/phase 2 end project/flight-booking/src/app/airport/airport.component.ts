import { Component, OnInit } from '@angular/core';
import { Airport } from '../airport';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  airportData:Array<Airport>=[
    new Airport("MAD","Madrid"),
    new Airport("BCN","Barcelona"),
    new Airport("LHR","London"),
    new Airport("CDG","Paris"),
    new Airport("FRA","Frakfurt"),
    new Airport("IST","Istanbul"),
    new Airport("AMS","Amsterdam"),
    new Airport("FCO","Rome"),
    new Airport("CPH","Copenhagen")
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
