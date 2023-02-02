import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Airport } from '../airport';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  flightRef = new FormGroup({
    flighttype:new FormControl(),
    fromCity:new FormControl(),
    toCity:new FormControl(),
    departingDate:new FormControl(),
    adults:new FormControl(),
    children:new FormControl(),
    travelClass:new FormControl()
  })
  msg:string="";
  flightData:Array<Flight>=[];
  constructor(public router:Router,public fs:FlightService) { }
  info:string="";
  ngOnInit(): void {
    let i=0;
    // this.fs.loadFlightDetails().pipe(map((e:any)=>{
    //     // code to set random date for flights 
    //      e.flights.map((ee:any)=>{
    //       const minValue = new Date(2023,0,1).getTime();
    //       const maxValue = new Date(2023,0,31).getTime();
    //       const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    //       ee.flightDate=new Date(timestamp).toISOString().slice(0, 10)
    //     })
    //     return e;
    //   }
    //   )).subscribe({
    //   next:(data:any)=> {
    //       this.flightData = data.flights;
    //       console.log(this.flightData)
    //   },
    //   error:(error:any)=> {
    //     console.log(error);
    //   },
    //   complete:()=> console.log("Done!")
    // })

    this.fs.loadFlightDetails().subscribe({
    next:(data:any)=> {
        this.flightData = data.flights;
        console.log(this.flightData)
    },
    error:(error:any)=> {
      console.log(error);
    },
    complete:()=> console.log("Done!")
  })
    let j=0;
    //this.info = "Airline :"+this.flightData[j].airline+" "+"From :"+this.flightData[j].origin+" "+" To :"+this.flightData[j].destination+" Date :"+this.flightData[j].flightDate;
    setInterval(()=> {
        this.info = "Airline :"+this.flightData[j].airline+" "+"From :"+this.flightData[j].origin+" "+" To :"+this.flightData[j].destination+" Date :"+this.flightData[j].flightDate;
        j++;
        if(j==89){
          j=0;
        }
    },3000);
  }

  searchFlight(){

    let flight = this.flightRef.value;
    console.log(flight);
    let currentDate = new Date().toISOString().slice(0, 10);
    let yourSelectedDate = flight.departingDate;
    // if(currentDate>yourSelectedDate){
    //   this.msg="Plz select current or future date!"
    // }else {
    //     let searchedFlights = this.flightData.filter(ff=>ff.origin==flight.fromCity && ff.destination==ff.destination && ff.flightDate==flight.departingDate)
    //     console.log(searchedFlights)
    //     sessionStorage.setItem("flight-data",JSON.stringify(searchedFlights));
    //     sessionStorage.setItem("customer-info",JSON.stringify(flight));
    //     this.router.navigate(["flight-searched-result"]);
    //     this.flightRef.reset();
    // }
    
    let searchedFlights = this.flightData.filter(ff=>ff.origin==flight.fromCity && ff.destination==ff.destination && ff.flightDate==flight.departingDate)
        console.log(searchedFlights)
        sessionStorage.setItem("flight-data",JSON.stringify(searchedFlights));
        sessionStorage.setItem("customer-info",JSON.stringify(flight));
        this.router.navigate(["flight-searched-result"]);
        this.flightRef.reset();
  }
}
